import {firebaseService} from '../config/firebase';

/**
 * Utility functions for Firebase operations
 */
export class FirebaseUtils {
  /**
   * Check if Firebase is initialized and ready to use
   */
  static isReady(): boolean {
    return firebaseService.isInitialized();
  }

  /**
   * Get the Firebase app instance
   */
  static getApp() {
    if (!firebaseService.isInitialized()) {
      throw new Error('Firebase is not initialized. Please wait for initialization to complete.');
    }
    return firebaseService.getApp();
  }

  /**
   * Get Firebase app information for debugging
   */
  static getAppInfo() {
    try {
      const app = firebaseService.getApp();
      return {
        name: app.name,
        options: app.options,
        isInitialized: firebaseService.isInitialized(),
      };
    } catch (error) {
      console.error('Error getting Firebase app info:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        name: 'Unknown',
        options: {},
        isInitialized: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Test Firebase connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      if (!firebaseService.isInitialized()) {
        console.log('Firebase is not initialized yet');
        return false;
      }

      const app = firebaseService.getApp();
      console.log('Firebase app name:', app.name);
      console.log('Firebase app options:', app.options);
      
      return true;
    } catch (error) {
      console.error('Firebase connection test failed:', error);
      return false;
    }
  }
}

export default FirebaseUtils;
