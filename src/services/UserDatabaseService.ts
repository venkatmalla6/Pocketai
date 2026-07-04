import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Model, Q} from '@nozbe/watermelondb';
import {field, date, readonly} from '@nozbe/watermelondb/decorators';
import {appSchema, tableSchema} from '@nozbe/watermelondb/Schema';
import {UserProfile} from '../types/auth';
import firebaseDatabase from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User Model
export class UserModel extends Model {
  static table = 'users';

  @field('uid') uid!: string;
  @field('email') email!: string;
  @field('role') role!: 'Free' | 'Normal' | 'Gold' | 'Platinum';
  @field('plan_end_time') planEndTime!: string;
  @field('creation_time') creationTime!: string;
  @field('fcm_token') fcmToken?: string;
  @field('is_active') isActive!: boolean;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}

// Downloaded Models Model
export class DownloadedModelModel extends Model {
  static table = 'downloaded_models';

  @field('model_id') modelId!: string;
  @field('model_name') modelName!: string;
  @field('model_size') modelSize!: number;
  @field('download_date') downloadDate!: string;
  @field('user_uid') userUid!: string;
  @readonly @date('created_at') createdAt!: Date;
}

// Database Schema
const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        {name: 'uid', type: 'string', isIndexed: true},
        {name: 'email', type: 'string'},
        {name: 'role', type: 'string'},
        {name: 'plan_end_time', type: 'string'},
        {name: 'creation_time', type: 'string'},
        {name: 'fcm_token', type: 'string', isOptional: true},
        {name: 'is_active', type: 'boolean'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'downloaded_models',
      columns: [
        {name: 'model_id', type: 'string', isIndexed: true},
        {name: 'model_name', type: 'string'},
        {name: 'model_size', type: 'number'},
        {name: 'download_date', type: 'string'},
        {name: 'user_uid', type: 'string', isIndexed: true},
        {name: 'created_at', type: 'number'},
      ],
    }),
  ],
});

// Database Adapter
const adapter = new SQLiteAdapter({
  schema,
  dbName: 'PocketPalUserDB',
});

// Database Instance
const database = new Database({
  adapter,
  modelClasses: [UserModel, DownloadedModelModel],
});

export interface ModelDownloadLimits {
  maxModels: number;
  currentCount: number;
  canDownload: boolean;
  remainingSlots: number;
}

export class UserDatabaseService {
  private static instance: UserDatabaseService;
  private database: Database;

  private constructor() {
    this.database = database;
  }

  public static getInstance(): UserDatabaseService {
    if (!UserDatabaseService.instance) {
      UserDatabaseService.instance = new UserDatabaseService();
    }
    return UserDatabaseService.instance;
  }

  // User Management
  async saveUser(userProfile: UserProfile & {uid: string}): Promise<void> {
    try {
      await this.database.write(async () => {
        // Check if user already exists
        const existingUser = await this.database
          .get<UserModel>('users')
          .query(Q.where('uid', userProfile.uid))
          .fetch();

        if (existingUser.length > 0) {
          // Update existing user
          await existingUser[0].update(user => {
            user.email = userProfile.email;
            user.role = userProfile.role;
            user.planEndTime = userProfile.plan_end_time;
            user.creationTime = userProfile.creation_time;
            user.fcmToken = userProfile.fcm_token;
            user.isActive = true;
          });
        } else {
          // Create new user
          await this.database.get<UserModel>('users').create(user => {
            user.uid = userProfile.uid;
            user.email = userProfile.email;
            user.role = userProfile.role;
            user.planEndTime = userProfile.plan_end_time;
            user.creationTime = userProfile.creation_time;
            user.fcmToken = userProfile.fcm_token;
            user.isActive = true;
          });
        }
      });
      console.log('User saved to SQLite:', userProfile.uid);
    } catch (error) {
      console.error('Error saving user to SQLite:', error);
      throw error;
    }
  }

  async getUser(uid: string): Promise<UserProfile | null> {
    try {
      const users = await this.database
        .get<UserModel>('users')
        .query(Q.where('uid', uid), Q.where('is_active', true))
        .fetch();

      if (users.length > 0) {
        const user = users[0];
        return {
          email: user.email,
          role: user.role,
          plan_end_time: user.planEndTime,
          creation_time: user.creationTime,
          fcm_token: user.fcmToken,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting user from SQLite:', error);
      return null;
    }
  }

  async getActiveUser(): Promise<(UserProfile & {uid: string}) | null> {
    try {
      const users = await this.database
        .get<UserModel>('users')
        .query(Q.where('is_active', true))
        .fetch();

      if (users.length > 0) {
        const user = users[0];
        return {
          uid: user.uid,
          email: user.email,
          role: user.role,
          plan_end_time: user.planEndTime,
          creation_time: user.creationTime,
          fcm_token: user.fcmToken,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting active user from SQLite:', error);
      return null;
    }
  }

  async updateUserRole(uid: string, role: 'Free' | 'Normal' | 'Gold' | 'Platinum', planEndTime: string): Promise<void> {
    try {
      await this.database.write(async () => {
        const users = await this.database
          .get<UserModel>('users')
          .query(Q.where('uid', uid))
          .fetch();

        if (users.length > 0) {
          await users[0].update(user => {
            user.role = role;
            user.planEndTime = planEndTime;
          });
        }
      });
      console.log('User role updated in SQLite:', uid, role);
    } catch (error) {
      console.error('Error updating user role in SQLite:', error);
      throw error;
    }
  }

  async logoutUser(uid: string): Promise<void> {
    try {
      await this.database.write(async () => {
        const users = await this.database
          .get<UserModel>('users')
          .query(Q.where('uid', uid))
          .fetch();

        if (users.length > 0) {
          await users[0].update(user => {
            user.isActive = false;
          });
        }
      });
      console.log('User logged out in SQLite:', uid);
    } catch (error) {
      console.error('Error logging out user in SQLite:', error);
    }
  }

  // Model Download Management
  async addDownloadedModel(modelId: string, modelName: string, modelSize: number, userUid: string): Promise<void> {
    try {
      await this.database.write(async () => {
        await this.database.get<DownloadedModelModel>('downloaded_models').create(model => {
          model.modelId = modelId;
          model.modelName = modelName;
          model.modelSize = modelSize;
          model.downloadDate = new Date().toISOString();
          model.userUid = userUid;
        });
      });
      console.log('Model download recorded:', modelId);
    } catch (error) {
      console.error('Error recording model download:', error);
      throw error;
    }
  }

  async removeDownloadedModel(modelId: string, userUid: string): Promise<void> {
    try {
      await this.database.write(async () => {
        const models = await this.database
          .get<DownloadedModelModel>('downloaded_models')
          .query(Q.where('model_id', modelId), Q.where('user_uid', userUid))
          .fetch();

        if (models.length > 0) {
          await models[0].destroyPermanently();
        }
      });
      console.log('Model download record removed:', modelId);
    } catch (error) {
      console.error('Error removing model download record:', error);
      throw error;
    }
  }

  async getDownloadedModels(userUid: string): Promise<DownloadedModelModel[]> {
    try {
      return await this.database
        .get<DownloadedModelModel>('downloaded_models')
        .query(Q.where('user_uid', userUid))
        .fetch();
    } catch (error) {
      console.error('Error getting downloaded models:', error);
      return [];
    }
  }

  async getModelDownloadLimits(userUid: string): Promise<ModelDownloadLimits> {
    try {
      // Get user role
      const user = await this.getUser(userUid);
      if (!user) {
        return {
          maxModels: 1, // Free user default
          currentCount: 0,
          canDownload: true, // Allow free users to download their first model
          remainingSlots: 1,
        };
      }

      // Define limits based on role
      const limits = {
        Free: 1,
        Normal: 3,
        Gold: 5,
        Platinum: -1, // Unlimited
      };

      const maxModels = limits[user.role] || 1; // Default to 1 for unknown roles
      
      // Get current download count
      const downloadedModels = await this.getDownloadedModels(userUid);
      const currentCount = downloadedModels.length;

      // Check if plan is expired
      const planEndTime = new Date(user.plan_end_time);
      const now = new Date();
      const isPlanExpired = planEndTime < now;

      // If plan is expired, treat as free user (1 model limit)
      const effectiveMaxModels = isPlanExpired ? 1 : maxModels;
      const canDownload = effectiveMaxModels === -1 || currentCount < effectiveMaxModels;
      const remainingSlots = effectiveMaxModels === -1 ? -1 : Math.max(0, effectiveMaxModels - currentCount);

      return {
        maxModels: effectiveMaxModels,
        currentCount,
        canDownload,
        remainingSlots,
      };
    } catch (error) {
      console.error('Error getting model download limits:', error);
      return {
        maxModels: 1,
        currentCount: 0,
        canDownload: true, // Allow download on error (fallback to free tier)
        remainingSlots: 1,
      };
    }
  }

  async canDownloadModel(userUid: string): Promise<{canDownload: boolean; reason?: string}> {
    try {
      const limits = await this.getModelDownloadLimits(userUid);
      
      if (!limits.canDownload) {
        const user = await this.getUser(userUid);
        const planEndTime = new Date(user?.plan_end_time || '');
        const now = new Date();
        const isPlanExpired = planEndTime < now;

        if (isPlanExpired) {
          return {
            canDownload: false,
            reason: 'Your premium plan has expired. You can only keep 1 model. Please upgrade to download more models.',
          };
        } else {
          return {
            canDownload: false,
            reason: `You have reached your download limit of ${limits.maxModels} models. Please upgrade to download more models.`,
          };
        }
      }

      return {canDownload: true};
    } catch (error) {
      console.error('Error checking download permission:', error);
      return {
        canDownload: false,
        reason: 'Unable to verify download permissions. Please try again.',
      };
    }
  }

  // Enhanced Sync Methods for Offline-First Architecture
  async updateUserRoleWithSync(uid: string, role: 'Free' | 'Normal' | 'Gold' | 'Platinum', planEndTime: string, syncToFirebase: boolean = true): Promise<void> {
    try {
      // Always update SQLite first (offline-first)
      await this.updateUserRole(uid, role, planEndTime);
      
      // Attempt Firebase sync in background if requested and online
      if (syncToFirebase) {
        this.backgroundSyncRoleToFirebase(uid, role, planEndTime);
      }
      
      console.log('User role updated with offline-first approach:', uid, role);
    } catch (error) {
      console.error('Error updating user role with sync:', error);
      throw error;
    }
  }

  private async backgroundSyncRoleToFirebase(uid: string, role: string, planEndTime: string): Promise<void> {
    // Attempt to sync to Firebase in background
    setTimeout(async () => {
      try {
        console.log('Background sync to Firebase:', uid, role);
        
        // Get current user profile from SQLite
        const currentProfile = await this.getUser(uid);
        if (!currentProfile) {
          console.warn('No user profile found for Firebase sync');
          return;
        }

        // Create updated profile for Firebase
        const updatedProfile = {
          ...currentProfile,
          role,
          plan_end_time: planEndTime,
        };

        // Sync to Firebase
        await firebaseDatabase()
          .ref(`users/${uid}`)
          .set(JSON.stringify(updatedProfile));
        
        console.log('Successfully synced role to Firebase:', uid, role);
      } catch (error) {
        console.warn('Background Firebase sync failed (will retry later):', error);
        // Store for retry later
        await this.markForFirebaseSync(uid, role, planEndTime);
      }
    }, 100); // Non-blocking background sync
  }

  private async markForFirebaseSync(uid: string, role: string, planEndTime: string): Promise<void> {
    // Store pending sync operations for later retry
    try {
      const pendingSyncs = await this.getPendingSyncs();
      pendingSyncs.push({
        uid,
        role,
        planEndTime,
        timestamp: Date.now(),
        type: 'role_update'
      });
      await this.storePendingSyncs(pendingSyncs);
    } catch (error) {
      console.error('Error marking for Firebase sync:', error);
    }
  }

  private async getPendingSyncs(): Promise<any[]> {
    try {
      const stored = await AsyncStorage.getItem('pending_firebase_syncs');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting pending syncs:', error);
      return [];
    }
  }

  private async storePendingSyncs(syncs: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem('pending_firebase_syncs', JSON.stringify(syncs));
      console.log('Stored pending syncs:', syncs.length);
    } catch (error) {
      console.error('Error storing pending syncs:', error);
    }
  }

  // Process pending syncs when connection is restored
  async processPendingSyncs(): Promise<void> {
    try {
      const pendingSyncs = await this.getPendingSyncs();
      if (pendingSyncs.length === 0) {
        return;
      }

      console.log('Processing pending syncs:', pendingSyncs.length);
      const successfulSyncs: any[] = [];

      for (const sync of pendingSyncs) {
        try {
          if (sync.type === 'role_update') {
            await this.backgroundSyncRoleToFirebase(sync.uid, sync.role, sync.planEndTime);
            successfulSyncs.push(sync);
          }
        } catch (error) {
          console.warn('Failed to process pending sync:', sync, error);
        }
      }

      // Remove successful syncs
      const remainingSyncs = pendingSyncs.filter(sync => !successfulSyncs.includes(sync));
      await this.storePendingSyncs(remainingSyncs);
      
      console.log('Processed syncs - successful:', successfulSyncs.length, 'remaining:', remainingSyncs.length);
    } catch (error) {
      console.error('Error processing pending syncs:', error);
    }
  }

  // Fast offline-first user data retrieval
  async getUserWithFastFallback(uid: string, checkFirebase: boolean = true): Promise<UserProfile | null> {
    try {
      // Always check SQLite first (instant response)
      const sqliteUser = await this.getUser(uid);
      
      if (sqliteUser && !checkFirebase) {
        return sqliteUser;
      }
      
      // If we have SQLite data, return it immediately and sync in background
      if (sqliteUser && checkFirebase) {
        // Background Firebase check (non-blocking)
        this.backgroundSyncFromFirebase(uid);
        return sqliteUser; // Return SQLite data immediately
      }
      
      // If no SQLite data, we must check Firebase
      if (checkFirebase) {
        try {
          console.log('No SQLite data, checking Firebase for:', uid);
          const firebaseUser = await this.getFirebaseUserProfile(uid);
          if (firebaseUser) {
            await this.saveUser({...firebaseUser, uid});
            return firebaseUser;
          }
        } catch (error) {
          console.warn('Firebase check failed, using SQLite fallback:', error);
        }
      }
      
      return sqliteUser; // Return whatever we have from SQLite
    } catch (error) {
      console.error('Error in getUserWithFastFallback:', error);
      return null;
    }
  }

  // Actual Firebase user profile fetching
  async getFirebaseUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const snapshot = await firebaseDatabase().ref(`users/${uid}`).once('value');
      const profileData = snapshot.val();
      
      if (profileData) {
        // Parse JSON string if stored as string
        const firebaseProfile = typeof profileData === 'string' 
          ? JSON.parse(profileData) 
          : profileData;
        
        console.log('Firebase user profile fetched:', firebaseProfile);
        return firebaseProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching Firebase user profile:', error);
      throw error;
    }
  }

  async backgroundSyncFromFirebase(uid: string): Promise<void> {
    // Non-blocking Firebase sync
    setTimeout(async () => {
      try {
        console.log('Background sync from Firebase for:', uid);
        const firebaseUser = await this.getFirebaseUserProfile(uid);
        if (firebaseUser) {
          await this.saveUser({...firebaseUser, uid});
          console.log('Background sync completed for:', uid);
        }
      } catch (error) {
        console.debug('Background Firebase sync failed (expected if offline):', error);
      }
    }, 50); // Very fast background sync
  }

  // Fast model limits check (offline-first)
  async getModelDownloadLimitsFast(userUid: string): Promise<ModelDownloadLimits> {
    try {
      // Use cached SQLite data for instant response
      const limits = await this.getModelDownloadLimits(userUid);
      
      // Background sync to ensure data is fresh (non-blocking)
      this.backgroundSyncFromFirebase(userUid);
      
      return limits;
    } catch (error) {
      console.error('Error getting fast model limits:', error);
      // Return safe defaults on error
      return {
        maxModels: 1,
        currentCount: 0,
        canDownload: true,
        remainingSlots: 1,
      };
    }
  }

  async syncDownloadedModelsWithActual(userUid: string, actualDownloadedModelIds: string[], modelStore?: any): Promise<void> {
    try {
      console.log('Syncing downloaded models with actual models for user:', userUid);
      console.log('Actual downloaded models:', actualDownloadedModelIds);
      
      // Get current records from database
      const dbModels = await this.getDownloadedModels(userUid);
      const dbModelIds = dbModels.map(m => m.modelId);
      
      console.log('Database recorded models:', dbModelIds);
      
      // Remove models from database that are no longer downloaded
      const modelsToRemove = dbModelIds.filter(id => !actualDownloadedModelIds.includes(id));
      console.log('Models to remove from database:', modelsToRemove);
      
      for (const modelId of modelsToRemove) {
        await this.removeDownloadedModel(modelId, userUid);
        console.log('Removed model from database:', modelId);
      }
      
      // Add models to database that are downloaded but not recorded
      const modelsToAdd = actualDownloadedModelIds.filter(id => !dbModelIds.includes(id));
      console.log('Models to add to database:', modelsToAdd);
      
      for (const modelId of modelsToAdd) {
        try {
          // Try to get model info from modelStore if available
          let modelName = modelId;
          let modelSize = 0;
          
          if (modelStore && modelStore.displayModels) {
            const model = modelStore.displayModels.find((m: any) => m.id === modelId);
            if (model) {
              modelName = model.name || modelId;
              modelSize = model.size || 0;
            }
          }
          
          await this.addDownloadedModel(modelId, modelName, modelSize, userUid);
          console.log('Added model to database:', modelId, 'with name:', modelName);
        } catch (error) {
          console.error('Error adding model to database:', modelId, error);
        }
      }
      
      console.log('Sync completed - added:', modelsToAdd.length, 'removed:', modelsToRemove.length);
    } catch (error) {
      console.error('Error syncing downloaded models:', error);
    }
  }

  // Utility Methods
  async clearAllData(): Promise<void> {
    try {
      await this.database.write(async () => {
        await this.database.unsafeResetDatabase();
      });
      console.log('All user data cleared from SQLite');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }

  async syncWithFirebase(firebaseProfile: UserProfile, uid: string): Promise<void> {
    try {
      await this.saveUser({...firebaseProfile, uid});
      console.log('User data synced with SQLite');
    } catch (error) {
      console.error('Error syncing with Firebase:', error);
    }
  }

  // Sync user profile to Firebase
  async syncUserProfileToFirebase(uid: string, profile: UserProfile): Promise<void> {
    try {
      await firebaseDatabase().ref(`users/${uid}`).set(JSON.stringify(profile));
      console.log('User profile synced to Firebase:', uid);
    } catch (error) {
      console.error('Failed to sync user profile to Firebase:', error);
      throw error;
    }
  }
}

export const userDatabaseService = UserDatabaseService.getInstance();
