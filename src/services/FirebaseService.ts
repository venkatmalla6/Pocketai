import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {UserProfile, FCMTokens} from '../types/auth';

export class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {}

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  // User Profile Operations
  async createUserProfile(uid: string, profile: UserProfile): Promise<void> {
    try {
      const profileString = JSON.stringify(profile);
      await database().ref(`users/${uid}`).set(profileString);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const snapshot = await database().ref(`users/${uid}`).once('value');
      const profileData = snapshot.val();
      
      if (profileData) {
        return typeof profileData === 'string' 
          ? JSON.parse(profileData) 
          : profileData;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const currentProfile = await this.getUserProfile(uid);
      if (!currentProfile) {
        throw new Error('User profile not found');
      }

      const updatedProfile = {...currentProfile, ...updates};
      const profileString = JSON.stringify(updatedProfile);
      await database().ref(`users/${uid}`).set(profileString);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  async deleteUserProfile(uid: string): Promise<void> {
    try {
      await database().ref(`users/${uid}`).remove();
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw error;
    }
  }

  // FCM Token Operations
  async updateFCMToken(uid: string, token: string): Promise<void> {
    try {
      // Get current tokens
      const snapshot = await database().ref('fcmtokens/all_tokens').once('value');
      const tokensString = snapshot.val() || '{}';
      const tokens: FCMTokens = JSON.parse(tokensString);
      
      // Update user's token
      tokens[uid] = token;
      
      // Save back as JSON string
      await database().ref('fcmtokens/all_tokens').set(JSON.stringify(tokens));
    } catch (error) {
      console.error('Error updating FCM token:', error);
      throw error;
    }
  }

  async getFCMToken(uid: string): Promise<string | null> {
    try {
      const snapshot = await database().ref('fcmtokens/all_tokens').once('value');
      const tokensString = snapshot.val() || '{}';
      const tokens: FCMTokens = JSON.parse(tokensString);
      
      return tokens[uid] || null;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      throw error;
    }
  }

  async getAllFCMTokens(): Promise<FCMTokens> {
    try {
      const snapshot = await database().ref('fcmtokens/all_tokens').once('value');
      const tokensString = snapshot.val() || '{}';
      return JSON.parse(tokensString);
    } catch (error) {
      console.error('Error getting all FCM tokens:', error);
      throw error;
    }
  }

  async removeFCMToken(uid: string): Promise<void> {
    try {
      const snapshot = await database().ref('fcmtokens/all_tokens').once('value');
      const tokensString = snapshot.val() || '{}';
      const tokens: FCMTokens = JSON.parse(tokensString);
      
      // Remove user's token
      delete tokens[uid];
      
      // Save back as JSON string
      await database().ref('fcmtokens/all_tokens').set(JSON.stringify(tokens));
    } catch (error) {
      console.error('Error removing FCM token:', error);
      throw error;
    }
  }

  // FCM Token Management
  async requestFCMPermission(): Promise<boolean> {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      return enabled;
    } catch (error) {
      console.error('Error requesting FCM permission:', error);
      return false;
    }
  }

  async getCurrentFCMToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.error('Error getting current FCM token:', error);
      return null;
    }
  }

  // Database Listeners
  onUserProfileChange(uid: string, callback: (profile: UserProfile | null) => void): () => void {
    const ref = database().ref(`users/${uid}`);
    
    const listener = ref.on('value', (snapshot) => {
      const profileData = snapshot.val();
      if (profileData) {
        const profile = typeof profileData === 'string' 
          ? JSON.parse(profileData) 
          : profileData;
        callback(profile);
      } else {
        callback(null);
      }
    });

    // Return unsubscribe function
    return () => ref.off('value', listener);
  }

  // Utility Methods
  async getAllUsers(): Promise<{[uid: string]: UserProfile}> {
    try {
      const snapshot = await database().ref('users').once('value');
      const usersData = snapshot.val() || {};
      
      const users: {[uid: string]: UserProfile} = {};
      Object.keys(usersData).forEach(uid => {
        const userData = usersData[uid];
        users[uid] = typeof userData === 'string' 
          ? JSON.parse(userData) 
          : userData;
      });
      
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }

  async getUsersByRole(role: 'Normal' | 'Gold' | 'Platinum'): Promise<{[uid: string]: UserProfile}> {
    try {
      const allUsers = await this.getAllUsers();
      const filteredUsers: {[uid: string]: UserProfile} = {};
      
      Object.keys(allUsers).forEach(uid => {
        if (allUsers[uid].role === role) {
          filteredUsers[uid] = allUsers[uid];
        }
      });
      
      return filteredUsers;
    } catch (error) {
      console.error('Error getting users by role:', error);
      throw error;
    }
  }

  async getActiveSubscriptions(): Promise<{[uid: string]: UserProfile}> {
    try {
      const allUsers = await this.getAllUsers();
      const activeUsers: {[uid: string]: UserProfile} = {};
      const now = new Date();
      
      Object.keys(allUsers).forEach(uid => {
        const user = allUsers[uid];
        const planEndTime = new Date(user.plan_end_time);
        if (planEndTime > now && user.role !== 'Normal') {
          activeUsers[uid] = user;
        }
      });
      
      return activeUsers;
    } catch (error) {
      console.error('Error getting active subscriptions:', error);
      throw error;
    }
  }
}

export const firebaseService = FirebaseService.getInstance();
