import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  TextInput,
  Chip,
  Divider,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../hooks';
import {PremiumPlan, PromoCode} from '../types/auth';
import {razorpayService} from '../services/RazorpayService';

const {width} = Dimensions.get('window');

const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'Normal',
    name: 'Normal',
    normalPrice: 499,
    offerPrice: 149,
    features: [
     'Download 3 models',
      'Medium speed',
      'Lifetime access',
    ],
    modelLimit: 3,
    responseSpeed: 'Medium',
    support: false,
  },
  {
    id: 'Gold',
    name: 'Gold',
    normalPrice: 999,
    offerPrice: 199,
    features: [
      'Download 5 models',
      'Fast responses',
      'Beta features',
      'Lifetime access',
    ],
    responseSpeed: 'Fast',
    support: false,
    testFeatures: true,
  },
  {
    id: 'Platinum',
    name: 'Platinum',
    normalPrice: 1999,
    offerPrice: 399,
    features: [
      'Unlimited models',
      'Fastest response',
      'Premium support',
      'Lifetime access',
    ],
    responseSpeed: 'Fastest',
    support: true,
    testFeatures: true,
  },
];

const RAZORPAY_CONFIG = {
  key_id: 'rzp_live_HJl9NwyBSY9rwV',
  key_secret: '1FlerafMmqHMw466ccsDxrhp',
};

export const PremiumUpgradeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {user, userProfile, updateUserProfile} = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const validatePromoCode = (code: string): PromoCode => {
    const upperCode = code.toUpperCase();
    
    if (upperCode === 'GGU') {
      return {
        code: upperCode,
        discount: 50,
        isValid: true,
      };
    }
    
    if (upperCode === 'SPKS') {
      return {
        code: upperCode,
        discount: 95,
        isValid: true,
      };
    }
    
    return {
      code: upperCode,
      discount: 0,
      isValid: false,
    };
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      Alert.alert('Error', 'Please enter a promo code');
      return;
    }

    const promo = validatePromoCode(promoCode);
    if (promo.isValid) {
      setAppliedPromo(promo);
      Alert.alert('Success', `Promo code applied! ${promo.discount}% discount`);
    } else {
      Alert.alert('Invalid Code', 'The promo code you entered is not valid');
      setAppliedPromo(null);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const calculateFinalPrice = (plan: PremiumPlan): number => {
    return razorpayService.calculateFinalPrice(plan.offerPrice, appliedPromo || undefined);
  };

  const handlePayment = async (plan: PremiumPlan) => {
    if (!user) {
      Alert.alert('Error', 'Please login to continue');
      return;
    }

    try {
      setIsProcessing(true);
      const finalPrice = calculateFinalPrice(plan);
      
      // Create Razorpay order
      const orderId = await razorpayService.createOrder(
        finalPrice,
        user!.uid,
        plan.name,
        appliedPromo?.code,
      );

      // Create checkout options
      const options = razorpayService.createCheckoutOptions(
        orderId,
        finalPrice,
        plan,
        user!.email,
        user!.displayName || undefined,
        user!.phoneNumber || undefined,
        theme.colors.primary,
      );

      // Open Razorpay checkout
      const paymentData = await razorpayService.openCheckout(options);
      
      // Handle payment success
      await razorpayService.handlePaymentSuccess(paymentData, plan, updateUserProfile);
      
      // Navigate back after successful payment
      navigation.goBack();
      
    } catch (error: any) {
      if (error.code === 'payment_cancelled') {
        Alert.alert('Payment Cancelled', 'You cancelled the payment');
      } else {
        Alert.alert('Payment Failed', error.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPlanCard = (plan: PremiumPlan) => {
    const isSelected = selectedPlan?.id === plan.id;
    const finalPrice = calculateFinalPrice(plan);
    const discount = Math.round(((plan.normalPrice - plan.offerPrice) / plan.normalPrice) * 100);
    const isCurrentPlan = userProfile?.role === plan.id;
    return (
      <Card
        key={plan.id}
        style={{
          marginBottom: 16,
          borderWidth: isSelected ? 2 : 0,
          borderColor: isSelected ? theme.colors.primary : 'transparent',
          opacity: isCurrentPlan ? 0.7 : 1,
        }}
        onPress={() => !isCurrentPlan && setSelectedPlan(plan)}>
        <Card.Content style={{padding: 16}}>
          {/* Plan Header */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
            <Text variant="titleLarge" style={{fontWeight: 'bold', color: theme.colors.primary}}>
              {plan.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {plan.id === 'Platinum' && (
                <Chip mode="flat" style={{backgroundColor: theme.colors.primaryContainer, marginRight: 8}}>
                  <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>POPULAR</Text>
                </Chip>
              )}
              {isCurrentPlan && (
                <Chip mode="flat" style={{backgroundColor: theme.colors.secondaryContainer}}>
                  <Text style={{color: theme.colors.secondary, fontWeight: 'bold'}}>CURRENT</Text>
                </Chip>
              )}
            </View>
          </View>

          {/* Pricing */}
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
            <Text
              variant="bodyLarge"
              style={{
                textDecorationLine: 'line-through',
                color: theme.colors.onSurfaceVariant,
                marginRight: 8,
              }}>
              ₹{plan.normalPrice}
            </Text>
            <Text
              variant="titleLarge"
              style={{fontWeight: 'bold', color: theme.colors.primary, marginRight: 8}}>
              ₹{appliedPromo && isSelected ? finalPrice : plan.offerPrice}
            </Text>
            <Chip mode="flat" style={{backgroundColor: theme.colors.errorContainer}}>
              <Text style={{color: theme.colors.error, fontWeight: 'bold'}}>{discount}% OFF</Text>
            </Chip>
          </View>

          {/* Features */}
          <View>
            {plan.features.map((feature, index) => (
              <View key={index} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                <Text style={{color: theme.colors.primary, marginRight: 6, fontSize: 12}}>✓</Text>
                <Text variant="bodySmall" style={{flex: 1}}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <ScrollView contentContainerStyle={{padding: 25}}>
        {/* Header */}
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text
            variant="headlineMedium"
            style={{
              color: theme.colors.primary,
              fontWeight: 'bold',
              marginBottom: 4,
              textAlign: 'center',
            }}>
            Upgrade to Premium
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
            }}>
            Lifetime access to premium features
          </Text>
        </View>

        {/* Current Plan Status */}
        {userProfile && (
          <Card style={{marginBottom: 16, backgroundColor: theme.colors.surfaceVariant}}>
            <Card.Content style={{padding: 12}}>
              <Text variant="titleSmall" style={{fontWeight: 'bold', marginBottom: 4}}>
                Current Plan: {userProfile.role}
              </Text>
              <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
                {userProfile.role === 'Free' ? 'Free forever' : 'Lifetime access'}
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Plans */}
        {PREMIUM_PLANS.map(renderPlanCard)}

        {/* Promo Code Section */}
        <Card style={{marginBottom: 16}}>
          <Card.Content style={{padding: 16}}>
            <Text variant="titleSmall" style={{marginBottom: 12, fontWeight: 'bold'}}>
              Have a Promo Code?
            </Text>
            
            {appliedPromo ? (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flex: 1}}>
                  <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
                    Code: {appliedPromo.code}
                  </Text>
                  <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
                    {appliedPromo.discount}% discount applied
                  </Text>
                </View>
                <Button mode="text" onPress={removePromoCode}>
                  Remove
                </Button>
              </View>
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  value={promoCode}
                  onChangeText={setPromoCode}
                  placeholder="Enter promo code"
                  mode="outlined"
                  style={{flex: 1, marginRight: 12, height: 40}}
                  autoCapitalize="characters"
                  dense
                />
                <Button mode="contained" onPress={applyPromoCode}>
                  Apply
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <Button
          mode="contained"
          onPress={() => selectedPlan && handlePayment(selectedPlan)}
          disabled={!selectedPlan || isProcessing || userProfile?.role === selectedPlan?.id}
          loading={isProcessing}
          style={{marginBottom: 12}}>
          {selectedPlan
            ? userProfile?.role === selectedPlan.id
              ? 'Current Plan'
              : `Subscribe to ${selectedPlan.name} - ₹${calculateFinalPrice(selectedPlan)}`
            : 'Select a Plan'}
        </Button>

        {/* Terms */}
        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            marginTop: 16,
            lineHeight: 16,
          }}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          All subscriptions include lifetime access.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
