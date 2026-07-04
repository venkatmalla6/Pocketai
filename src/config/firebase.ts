import firebase from '@react-native-firebase/app';
import appCheck from '@react-native-firebase/app-check';

// Firebase configuration - this will be automatically read from google-services.json
// No need to manually specify config as React Native Firebase reads it automatically

class FirebaseService {
  private static instance: FirebaseService;
  private initialized = false;

  private constructor() {}

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      console.log('Firebase already initialized');
      return;
    }

    try {
      // Check if Firebase is already initialized
      if (!firebase.apps.length) {
        console.log('Initializing Firebase...');
        // Firebase will be automatically initialized with the config from google-services.json
      } else {
        console.log('Firebase already initialized');
      }

      // Initialize App Check for security
      await this.initializeAppCheck();

      this.initialized = true;
      console.log('Firebase initialization completed successfully');
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      throw error;
    }
  }

  private async initializeAppCheck(): Promise<void> {
    try {
      // Initialize App Check with Play Integrity provider for production
      // and Debug provider for development
      if (__DEV__) {
        // In development, use debug provider
        const rnfbProvider = appCheck().newReactNativeFirebaseAppCheckProvider();
        rnfbProvider.configure({
          android: {
            provider: 'debug',
            debugToken: 'your-debug-token-here', // Replace with your debug token
          },
        });
        await appCheck().initializeAppCheck({
          provider: rnfbProvider,
          isTokenAutoRefreshEnabled: true,
        });
        console.log('Firebase App Check initialized with debug provider');
      } else {
        // In production, use Play Integrity provider
        const rnfbProvider = appCheck().newReactNativeFirebaseAppCheckProvider();
        rnfbProvider.configure({
          android: {
            provider: 'playIntegrity',
          },
        });
        await appCheck().initializeAppCheck({
          provider: rnfbProvider,
          isTokenAutoRefreshEnabled: true,
        });
        console.log('Firebase App Check initialized with Play Integrity provider');
      }
    } catch (error) {
      console.error('Firebase App Check initialization failed:', error);
      // Don't throw error here as App Check is optional
    }
  }

  public getApp() {
    return firebase.app();
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}

export const firebaseService = FirebaseService.getInstance();
export default firebaseService;
