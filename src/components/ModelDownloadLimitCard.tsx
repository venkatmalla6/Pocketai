import React from 'react';
import {View, Alert} from 'react-native';
import {Text, Card, ProgressBar, Button, Chip} from 'react-native-paper';
import {usePremium} from '../hooks/usePremium';
import {useTheme} from '../hooks';

interface ModelDownloadLimitCardProps {
  onUpgrade?: () => void;
}

export const ModelDownloadLimitCard: React.FC<ModelDownloadLimitCardProps> = ({
  onUpgrade,
}) => {
  const theme = useTheme();
  const {modelLimits, userRole, isPremium, isExpired} = usePremium();

  const getRoleColor = () => {
    switch (userRole) {
      case 'Platinum':
        return '#FFD700'; // Gold
      case 'Gold':
        return '#C0C0C0'; // Silver
      case 'Normal':
        return theme.colors.primary;
      default:
        return theme.colors.outline;
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'Platinum':
        return '👑';
      case 'Gold':
        return '⭐';
      case 'Normal':
        return '💎';
      case 'Free':
        return '🆓';
      default:
        return '🆓';
    }
  };

  const getProgressColor = () => {
    const percentage = modelLimits.maxModels === -1 ? 0 : 
      modelLimits.currentCount / modelLimits.maxModels;
    
    if (percentage >= 0.9) return theme.colors.error;
    if (percentage >= 0.7) return '#FF9800'; // Orange
    return theme.colors.primary;
  };

  const handleUpgradePress = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      Alert.alert(
        'Upgrade Required',
        'Upgrade your plan to download more models.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Upgrade', onPress: () => {
            // Navigate to upgrade screen
          }},
        ],
      );
    }
  };

  return (
    <Card style={{margin: 16}}>
      <Card.Content style={{padding: 20}}>
        {/* Header */}
        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 24, marginRight: 8}}>
              {getRoleIcon()}
            </Text>
            <View>
              <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
                Model Downloads
              </Text>
              <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
                {userRole} Plan
              </Text>
            </View>
          </View>
          
          <Chip
            mode="flat"
            style={{
              backgroundColor: isPremium && !isExpired 
                ? theme.colors.primaryContainer 
                : theme.colors.surfaceVariant,
            }}>
            <Text
              style={{
                color: isPremium && !isExpired 
                  ? theme.colors.primary 
                  : theme.colors.onSurfaceVariant,
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              {isPremium && !isExpired ? 'PREMIUM' : 'FREE'}
            </Text>
          </Chip>
        </View>

        {/* Download Progress */}
        <View style={{marginBottom: 16}}>
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            marginBottom: 8
          }}>
            <Text variant="bodyMedium">
              Downloaded Models
            </Text>
            <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>
              {modelLimits.currentCount}
              {modelLimits.maxModels === -1 ? '' : ` / ${modelLimits.maxModels}`}
            </Text>
          </View>
          
          {modelLimits.maxModels !== -1 && (
            <ProgressBar
              progress={modelLimits.currentCount / modelLimits.maxModels}
              color={getProgressColor()}
              style={{height: 8, borderRadius: 4}}
            />
          )}
          
          {modelLimits.maxModels === -1 && (
            <View style={{
              backgroundColor: theme.colors.primaryContainer,
              padding: 8,
              borderRadius: 8,
              alignItems: 'center',
            }}>
              <Text style={{
                color: theme.colors.primary,
                fontWeight: 'bold',
              }}>
                ∞ Unlimited Downloads
              </Text>
            </View>
          )}
        </View>

        {/* Status Message */}
        <View style={{marginBottom: 16}}>
          {modelLimits.canDownload ? (
            <View style={{
              backgroundColor: theme.colors.secondaryContainer,
              padding: 12,
              borderRadius: 8,
            }}>
              <Text style={{
                color: theme.colors.secondary,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
                ✅ You can download {
                  modelLimits.remainingSlots === -1 
                    ? 'unlimited' 
                    : modelLimits.remainingSlots
                } more model{modelLimits.remainingSlots !== 1 ? 's' : ''}
              </Text>
            </View>
          ) : (
            <View style={{
              backgroundColor: theme.colors.errorContainer,
              padding: 12,
              borderRadius: 8,
            }}>
              <Text style={{
                color: theme.colors.error,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
                ⚠️ Download limit reached
              </Text>
              <Text style={{
                color: theme.colors.error,
                textAlign: 'center',
                fontSize: 12,
                marginTop: 4,
              }}>
                {isExpired 
                  ? 'Your premium plan has expired' 
                  : 'Upgrade to download more models'}
              </Text>
            </View>
          )}
        </View>

        {/* Plan Limits Info */}
        <View style={{
          backgroundColor: theme.colors.surfaceVariant,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}>
          <Text variant="bodySmall" style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
            Plan Limits
          </Text>
          <Text variant="bodySmall" style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
          }}>
            Free: 1 model • Normal: 3 models • Gold: 10 models • Platinum: Unlimited
          </Text>
        </View>

        {/* Upgrade Button */}
        {(!isPremium || isExpired || userRole !== 'Platinum') && (
          <Button
            mode="contained"
            onPress={handleUpgradePress}
            style={{marginTop: 8}}>
            {isExpired 
              ? 'Renew Subscription' 
              : userRole === 'Normal' 
                ? 'Upgrade to Gold/Platinum' 
                : userRole === 'Gold'
                  ? 'Upgrade to Platinum'
                  : 'Get Premium'}
          </Button>
        )}

        {/* Expiry Warning */}
        {isPremium && isExpired && (
          <View style={{
            backgroundColor: theme.colors.errorContainer,
            padding: 12,
            borderRadius: 8,
            marginTop: 12,
          }}>
            <Text style={{
              color: theme.colors.error,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
              ⚠️ Your premium subscription has expired. You're now limited to 1 model.
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default ModelDownloadLimitCard;
