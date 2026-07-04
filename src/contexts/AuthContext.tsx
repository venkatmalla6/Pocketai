import React, {createContext, useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {firebaseService} from '../services/FirebaseService';
import {userDatabaseService} from '../services/UserDatabaseService';

import {
  User,
  UserProfile,
  AuthContextType,
  FCMTokens,
} from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  // Create a mock user and profile for direct dashboard access without authentication
  const mockUser: User = {
    uid: 'mock-user-id',
    email: 'guest@pocketpal.com',
    emailVerified: true,
    displayName: 'Guest User',
    photoURL: undefined,
    phoneNumber: undefined,
  };
  
  const mockProfile: UserProfile = {
    email: 'guest@pocketpal.com',
    role: 'Platinum', // Give full access with Platinum role
    plan_end_time: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000).toISOString(), // 100 years (lifetime)
    creation_time: new Date().toISOString(),
  };

  const [user, setUser] = useState<User | null>(mockUser);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(mockProfile);
  const [loading, setLoading] = useState(false);

  // Disabled: Authentication bypassed - using mock user
  // useEffect(() => {
  //   const initializeOfflineFirst = async () => {
  //     ...
  //   };
  //   initializeOfflineFirst();
  // }, []);

  // Disabled: Authentication bypassed - using mock user
  // useEffect(() => {
  //   GoogleSignin.configure({...});
  // }, []);

  // Disabled: Authentication bypassed - using mock user
  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
  //     ...
  //   });
  //   return unsubscribe;
  // }, []);

  const loadUserProfile = async (uid: string) => {
    try {
      console.log('Loading user profile for UID (offline-first):', uid);
      
      // Always try SQLite first for instant response
      const sqliteProfile = await userDatabaseService.getUser(uid);
      
      if (sqliteProfile) {
        console.log('User profile loaded from SQLite (instant):', sqliteProfile);
        setUserProfile(sqliteProfile);
        
        // Background Firebase sync (non-blocking)
        userDatabaseService.backgroundSyncFromFirebase(uid).catch(error => {
          console.debug('Background Firebase sync failed (expected if offline):', error);
        });
        return;
      }
      
      // If no SQLite data, try Firebase with timeout (first time login)
      console.log('No SQLite data, checking Firebase for first-time user:', uid);
      
      try {
        // Add timeout to Firebase request to prevent hanging
        const firebaseProfile = await Promise.race([
          userDatabaseService.getFirebaseUserProfile(uid),
          new Promise<null>((_, reject) => 
            setTimeout(() => reject(new Error('Firebase timeout')), 3000)
          )
        ]);
        
        if (firebaseProfile) {
          console.log('User profile synced from Firebase:', firebaseProfile);
          setUserProfile(firebaseProfile);
          
          // Save to SQLite for future offline access
          await userDatabaseService.saveUser({...firebaseProfile, uid});
          return;
        }
      } catch (firebaseError) {
        console.warn('Firebase fetch failed or timed out:', firebaseError);
      }
      
      // Create default profile if everything fails
      console.log('Creating default profile for user:', uid);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const defaultProfile: UserProfile = {
          email: currentUser.email || '',
          role: 'Free',
          plan_end_time: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          creation_time: new Date().toISOString(),
        };
        
        setUserProfile(defaultProfile);
        
        // Save to SQLite
        await userDatabaseService.saveUser({...defaultProfile, uid});
        
        // Try Firebase sync in background (non-blocking)
        userDatabaseService.syncUserProfileToFirebase(uid, defaultProfile).catch(error => {
          console.debug('Background Firebase sync failed (expected if offline):', error);
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      throw error; // Re-throw to trigger timeout handling in auth listener
    }
  };


  const updateFCMToken = async (uid: string) => {
    try {
      const token = await messaging().getToken();
      if (token) {
        // Get current tokens
        const tokensSnapshot = await database().ref('fcmtokens/all_tokens').once('value');
        const tokensString = tokensSnapshot.val() || '{}';
        const tokens: FCMTokens = JSON.parse(tokensString);
        
        // Update user's token
        tokens[uid] = token;
        
        // Save back as JSON string
        await database().ref('fcmtokens/all_tokens').set(JSON.stringify(tokens));
      }
    } catch (error) {
      console.error('Error updating FCM token:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
      throw new Error(getAuthErrorMessage(authError.code));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await auth().createUserWithEmailAndPassword(email, password);
      
      // Send email verification
      await result.user.sendEmailVerification();
      
      Alert.alert(
        'Account Created',
        'Please check your email and verify your account before signing in.',
      );
    } catch (error) {
      const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
      throw new Error(getAuthErrorMessage(authError.code));
    } finally {
      setLoading(false);
    }
  };


  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Check if your device supports Google Play Services
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      
      if (signInResult.type === 'cancelled') {
        console.log('Google Sign-In was cancelled by user');
        return; // User cancelled, don't throw error
      }
      
      const idToken = signInResult.data?.idToken;
      
      // Create a Google credential with the token
      if (!idToken) {
        throw new Error('Failed to get Google ID token. Please try again.');
      }
      
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      
      console.log('Google Sign-In successful');
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      
      // Handle specific Google Sign-In errors
      if (error.code === 'sign_in_cancelled' || error.code === '12501') {
        console.log('Google Sign-In cancelled by user');
        return; // Don't throw error for user cancellation
      }
      
      // Provide user-friendly error messages
      let errorMessage = 'Google Sign-In failed. Please try again.';
      
      switch (error.code) {
        case 'network_error':
        case '7':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'developer_error':
        case '10':
          errorMessage = 'Configuration error. Please contact support.';
          break;
        case 'invalid_account':
        case '5':
          errorMessage = 'Invalid account. Please try with a different Google account.';
          break;
        default:
          if (error.message) {
            errorMessage = error.message;
          }
      }
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const signOut = async () => {
    try {
      setLoading(true);
      
      // Mark user as inactive in SQLite
      if (user) {
        await userDatabaseService.logoutUser(user.uid);
      }
      
      // Sign out from Google if user signed in with Google
      try {
        await GoogleSignin.signOut();
        console.log('Google Sign-Out successful');
      } catch (googleError) {
        console.log('Google Sign-Out error (non-critical):', googleError);
        // Don't throw error for Google sign-out issues - user might not have signed in with Google
      }
      
      // Sign out from Firebase
      await auth().signOut();
      console.log('Firebase Sign-Out successful');
    } catch (error) {
      console.error('Sign Out Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendEmailVerification = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.sendEmailVerification();
        Alert.alert('Verification Email Sent', 'Please check your email.');
      }
    } catch (error) {
      console.error('Error sending email verification:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset', 'Password reset email sent. Please check your email.');
    } catch (error) {
      const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
      throw new Error(getAuthErrorMessage(authError.code));
    }
  };

  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      const currentProfile = userProfile || {
        email: user.email,
        role: 'Free' as const,
        plan_end_time: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000).toISOString(), // 100 years (lifetime)
        creation_time: new Date().toISOString(),
      };
      
      const updatedProfile: UserProfile = {...currentProfile, ...profile};
      
      // Update SQLite first (for offline access)
      await userDatabaseService.syncWithFirebase(updatedProfile, user.uid);
      
      // Then try to update Firebase (for sync)
      try {
        await database()
          .ref(`users/${user.uid}`)
          .set(JSON.stringify(updatedProfile));
        console.log('Profile updated in Firebase');
      } catch (firebaseError) {
        console.log('Firebase update failed, profile saved offline:', firebaseError);
      }
      
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const checkPremiumStatus = (): boolean => {
    if (!userProfile) return false;
    
    const now = new Date();
    const planEndTime = new Date(userProfile.plan_end_time);
    
    return planEndTime > now && userProfile.role !== 'Normal';
  };

  const isPremiumExpired = (): boolean => {
    if (!userProfile) return true;
    
    const now = new Date();
    const planEndTime = new Date(userProfile.plan_end_time);
    
    return planEndTime <= now;
  };

  // Offline-first role upgrade method
  const upgradeUserRole = async (role: 'Free' | 'Normal' | 'Gold' | 'Platinum', planEndTime: string) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      console.log('Upgrading user role (offline-first):', user.uid, role);
      
      // Update SQLite first for instant UI response
      await userDatabaseService.updateUserRoleWithSync(user.uid, role, planEndTime, true);
      
      // Update local state immediately
      const updatedProfile = {
        ...userProfile!,
        role,
        plan_end_time: planEndTime,
      };
      setUserProfile(updatedProfile);
      
      console.log('User role upgraded successfully (offline-first):', role);
      
      // Firebase sync happens in background via updateUserRoleWithSync
      return updatedProfile;
    } catch (error) {
      console.error('Error upgrading user role:', error);
      throw error;
    }
  };

  const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    sendEmailVerification,
    resetPassword,
    updateUserProfile,
    upgradeUserRole,
    checkPremiumStatus,
    isPremiumExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
