import React from 'react';
import {View, Alert} from 'react-native';
import {Text, Button, Card, Chip} from 'react-native-paper';

import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../hooks';

interface PremiumGateProps {
  children: React.ReactNode;
  feature: string;
  requiredPlan?: 'Normal' | 'Gold' | 'Platinum';
  showUpgrade?: boolean;
  onUpgrade?: () => void;
}

export const PremiumGate: React.FC<PremiumGateProps> = ({
  children,
  feature,
  requiredPlan = 'Gold',
  showUpgrade = true,
  onUpgrade,
}) => {
  const theme = useTheme();
  const {userProfile, checkPremiumStatus, isPremiumExpired} = useAuth();

  const hasAccess = () => {
    if (!userProfile) return false;
    
    // Check if premium is expired
    if (isPremiumExpired()) return false;
    
    // Check if user has required plan level
    const planLevels = {Normal: 1, Gold: 2, Platinum: 3};
    const userLevel = planLevels[userProfile.role];
    const requiredLevel = planLevels[requiredPlan];
    
    return userLevel >= requiredLevel;
  };

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      Alert.alert(
        'Premium Feature',
        `This feature requires ${requiredPlan} plan or higher. Would you like to upgrade?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Upgrade', onPress: () => {
            // Navigate to premium upgrade screen
          }},
        ],
      );
    }
  };

  if (hasAccess()) {
    return <>{children}</>;
  }

  return (
    <Card style={{margin: 16, opacity: 0.7}}>
      <Card.Content style={{padding: 20, alignItems: 'center'}}>
        <View style={{alignItems: 'center', marginBottom: 16}}>
          <Text style={{fontSize: 40, marginBottom: 8}}>🔒</Text>
          <Chip
            mode="flat"
            style={{backgroundColor: theme.colors.primaryContainer, marginBottom: 12}}>
            <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>
              {requiredPlan.toUpperCase()} REQUIRED
            </Text>
          </Chip>
        </View>

        <Text
          variant="titleMedium"
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 8,
          }}>
          Premium Feature
        </Text>

        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            marginBottom: 16,
            lineHeight: 20,
          }}>
          {feature} is available for {requiredPlan} plan subscribers and above.
        </Text>

        {showUpgrade && (
          <Button
            mode="contained"
            onPress={handleUpgrade}
            style={{minWidth: 120}}>
            Upgrade Now
          </Button>
        )}

        {userProfile && isPremiumExpired() && (
          <Text
            variant="bodySmall"
            style={{
              color: theme.colors.error,
              textAlign: 'center',
              marginTop: 12,
            }}>
            Your premium subscription has expired
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

export default PremiumGate;
