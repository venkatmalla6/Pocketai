import React from 'react';
import {View} from 'react-native';
import {Text, Card, Chip, Button, ProgressBar} from 'react-native-paper';
import {format, differenceInDays} from 'date-fns';

import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../hooks';

interface PlanStatusCardProps {
  onUpgrade?: () => void;
  showUpgradeButton?: boolean;
}

export const PlanStatusCard: React.FC<PlanStatusCardProps> = ({
  onUpgrade,
  showUpgradeButton = true,
}) => {
  const theme = useTheme();
  const {userProfile, checkPremiumStatus, isPremiumExpired} = useAuth();

  if (!userProfile) return null;

  const isPremium = checkPremiumStatus();
  const isExpired = isPremiumExpired();
  const planEndDate = new Date(userProfile.plan_end_time);
  const daysLeft = differenceInDays(planEndDate, new Date());
  const totalDays = 30; // Assuming 30-day subscription
  const progress = Math.max(0, Math.min(1, daysLeft / totalDays));

  const getPlanColor = () => {
    switch (userProfile.role) {
      case 'Platinum':
        return '#FFD700'; // Gold color
      case 'Gold':
        return '#C0C0C0'; // Silver color
      default:
        return theme.colors.primary;
    }
  };

  const getPlanIcon = () => {
    switch (userProfile.role) {
      case 'Platinum':
        return '👑';
      case 'Gold':
        return '⭐';
      default:
        return '🆓';
    }
  };

  return (
    <Card style={{margin: 16}}>
      <Card.Content style={{padding: 20}}>
        {/* Plan Header */}
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 24, marginRight: 8}}>
              {getPlanIcon()}
            </Text>
            <View>
              <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
                {userProfile.role} Plan
              </Text>
              <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
                {isPremium ? 'Active' : isExpired ? 'Expired' : 'Free'}
              </Text>
            </View>
          </View>
          
          <Chip
            mode="flat"
            style={{
              backgroundColor: isPremium ? theme.colors.primaryContainer : theme.colors.errorContainer,
            }}>
            <Text
              style={{
                color: isPremium ? theme.colors.primary : theme.colors.error,
                fontWeight: 'bold',
              }}>
              {isPremium ? 'PREMIUM' : isExpired ? 'EXPIRED' : 'FREE'}
            </Text>
          </Chip>
        </View>

        {/* Plan Details */}
        {isPremium && !isExpired && (
          <>
            <View style={{marginBottom: 12}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4}}>
                <Text variant="bodyMedium">Days remaining</Text>
                <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>
                  {daysLeft} days
                </Text>
              </View>
              <ProgressBar
                progress={progress}
                color={getPlanColor()}
                style={{height: 6, borderRadius: 3}}
              />
            </View>

            <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant, marginBottom: 16}}>
              Expires on {format(planEndDate, 'MMM dd, yyyy')}
            </Text>
          </>
        )}

        {/* Plan Features */}
        <View style={{marginBottom: 16}}>
          <Text variant="titleMedium" style={{fontWeight: 'bold', marginBottom: 8}}>
            Your Benefits
          </Text>
          
          {userProfile.role === 'Normal' && (
            <View>
              <Text variant="bodyMedium" style={{marginBottom: 4}}>• Limited to 3 models</Text>
              <Text variant="bodyMedium" style={{marginBottom: 4}}>• Medium response speed</Text>
              <Text variant="bodyMedium">• No support ticket</Text>
            </View>
          )}
          
          {userProfile.role === 'Gold' && (
            <View>
              <Text variant="bodyMedium" style={{marginBottom: 4}}>• Moderate number of models</Text>
              <Text variant="bodyMedium" style={{marginBottom: 4}}>• Fast responses</Text>
              <Text variant="bodyMedium">• Ability to test new features</Text>
            </View>
          )}
          
          {userProfile.role === 'Platinum' && (
            <View>
              <Text variant="bodyMedium" style={{marginBottom: 4}}>• All features included</Text>
              <Text variant="bodyMedium" style={{marginBottom: 4}}>• Fastest response</Text>
              <Text variant="bodyMedium">• Premium support</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        {showUpgradeButton && (
          <>
            {(!isPremium || isExpired) && (
              <Button
                mode="contained"
                onPress={onUpgrade}
                style={{marginBottom: 8}}>
                {isExpired ? 'Renew Subscription' : 'Upgrade to Premium'}
              </Button>
            )}
            
            {isPremium && userProfile.role !== 'Platinum' && (
              <Button
                mode="outlined"
                onPress={onUpgrade}>
                Upgrade to Higher Plan
              </Button>
            )}
          </>
        )}

        {/* Expiry Warning */}
        {isPremium && daysLeft <= 7 && daysLeft > 0 && (
          <View
            style={{
              backgroundColor: theme.colors.errorContainer,
              padding: 12,
              borderRadius: 8,
              marginTop: 12,
            }}>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.error,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              ⚠️ Your subscription expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default PlanStatusCard;
