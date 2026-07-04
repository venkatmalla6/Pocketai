import {useAuth} from '../contexts/AuthContext';
import {userDatabaseService} from '../services/UserDatabaseService';
import {useEffect, useState} from 'react';

export interface PremiumFeatures {
  maxModels: number;
  maxSimultaneousDownloads: number;
  responseSpeed: 'Medium' | 'Fast' | 'Fastest';
  hasSupport: boolean;
  canTestFeatures: boolean;
  canDownloadModels: boolean;
  canUseAdvancedFeatures: boolean;
}

export const usePremium = () => {
  const {user, userProfile, checkPremiumStatus, isPremiumExpired} = useAuth();
  const [modelLimits, setModelLimits] = useState({
    maxModels: 1,
    currentCount: 0,
    canDownload: true, // Default to allowing downloads for free tier
    remainingSlots: 1,
  });

  useEffect(() => {
    const loadModelLimits = async () => {
      if (user) {
        console.log('usePremium: Loading model limits for user (offline-first):', user.uid);
        // Use fast offline-first method for instant response
        const limits = await userDatabaseService.getModelDownloadLimitsFast(user.uid);
        console.log('usePremium: Loaded model limits (fast):', limits);
        setModelLimits(limits);
      } else {
        console.log('usePremium: No user, setting default limits');
        setModelLimits({
          maxModels: 1,
          currentCount: 0,
          canDownload: true,
          remainingSlots: 1,
        });
      }
    };

    loadModelLimits();
  }, [user, userProfile]);

  const getPremiumFeatures = (): PremiumFeatures => {
    if (!userProfile || isPremiumExpired()) {
      return {
        maxModels: 1, // Free users get 1 model
        maxSimultaneousDownloads: 1, // Free users can download 1 at a time
        responseSpeed: 'Medium',
        hasSupport: false,
        canTestFeatures: false,
        canDownloadModels: true,
        canUseAdvancedFeatures: false,
      };
    }

    switch (userProfile.role) {
      case 'Free':
        return {
          maxModels: 1,
          maxSimultaneousDownloads: 1,
          responseSpeed: 'Medium',
          hasSupport: false,
          canTestFeatures: false,
          canDownloadModels: true,
          canUseAdvancedFeatures: false,
        };
      case 'Normal':
        return {
          maxModels: 3,
          maxSimultaneousDownloads: 2,
          responseSpeed: 'Medium',
          hasSupport: false,
          canTestFeatures: false,
          canDownloadModels: true,
          canUseAdvancedFeatures: false,
        };
      case 'Gold':
        return {
          maxModels: 5,
          maxSimultaneousDownloads: 3,
          responseSpeed: 'Fast',
          hasSupport: false,
          canTestFeatures: true,
          canDownloadModels: true,
          canUseAdvancedFeatures: true,
        };
      case 'Platinum':
        return {
          maxModels: -1, // Unlimited
          maxSimultaneousDownloads: 5, // Premium users can download up to 5 simultaneously
          responseSpeed: 'Fastest',
          hasSupport: true,
          canTestFeatures: true,
          canDownloadModels: true,
          canUseAdvancedFeatures: true,
        };
      default:
        return {
          maxModels: 1,
          maxSimultaneousDownloads: 1,
          responseSpeed: 'Medium',
          hasSupport: false,
          canTestFeatures: false,
          canDownloadModels: true,
          canUseAdvancedFeatures: false,
        };
    }
  };

  const canAccessFeature = (feature: keyof PremiumFeatures): boolean => {
    const features = getPremiumFeatures();
    return Boolean(features[feature]);
  };

  const canDownloadModel = async (): Promise<{canDownload: boolean; reason?: string}> => {
    if (!user) {
      return {canDownload: false, reason: 'Please login to download models'};
    }
    const result = await userDatabaseService.canDownloadModel(user.uid);
    return result;
  };

  const canStartSimultaneousDownload = (currentDownloadsCount: number): {canDownload: boolean; reason?: string} => {
    const features = getPremiumFeatures();
    if (currentDownloadsCount >= features.maxSimultaneousDownloads) {
      return {
        canDownload: false,
        reason: `You can only download ${features.maxSimultaneousDownloads} model${features.maxSimultaneousDownloads > 1 ? 's' : ''} at a time with your ${userProfile?.role || 'Free'} plan. Please wait for current downloads to complete or upgrade your plan.`,
      };
    }
    return {canDownload: true};
  };

  const addDownloadedModel = async (modelId: string, modelName: string, modelSize: number) => {
    if (user) {
      await userDatabaseService.addDownloadedModel(modelId, modelName, modelSize, user.uid);
      // Refresh limits
      const limits = await userDatabaseService.getModelDownloadLimits(user.uid);
      setModelLimits(limits);
    }
  };

  const removeDownloadedModel = async (modelId: string) => {
    if (user) {
      await userDatabaseService.removeDownloadedModel(modelId, user.uid);
      // Refresh limits
      const limits = await userDatabaseService.getModelDownloadLimits(user.uid);
      setModelLimits(limits);
    }
  };

  const syncDownloadedModels = async (actualDownloadedModelIds: string[], modelStore?: any) => {
    if (user) {
      console.log('usePremium: Syncing downloaded models with actual models');
      await userDatabaseService.syncDownloadedModelsWithActual(user.uid, actualDownloadedModelIds, modelStore);
      // Refresh limits after sync
      const limits = await userDatabaseService.getModelDownloadLimits(user.uid);
      setModelLimits(limits);
      console.log('usePremium: Sync completed, updated limits:', limits);
    }
  };

  const isPremium = checkPremiumStatus();
  const isExpired = isPremiumExpired();
  const features = getPremiumFeatures();

  return {
    isPremium,
    isExpired,
    features,
    userRole: userProfile?.role || 'Normal',
    modelLimits,
    canAccessFeature,
    canDownloadModel,
    canStartSimultaneousDownload,
    addDownloadedModel,
    removeDownloadedModel,
    syncDownloadedModels,
  };
};

export default usePremium;
