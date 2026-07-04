# Firebase Authentication & Premium System Guide

## Overview
This guide explains how to use the comprehensive Firebase Authentication and Premium Subscription system implemented in PocketPal.

## 🔐 Authentication Features

### Available Authentication Methods
1. **Email/Password** - Traditional email and password authentication
2. **Google Sign-In** - OAuth with Google accounts
3. **Phone Authentication** - SMS-based OTP verification

### User Flow
```
New User: Register → Email Verification → Premium Upgrade → Main App
Existing User: Login → (Check Plan Status) → Main App
Expired Plan: Redirect to Upgrade Screen
```

## 💎 Premium Plans

### Plan Tiers
| Plan | Price | Features |
|------|-------|----------|
| Normal | ₹149 (was ₹499) | 3 basic models, medium speed |
| Gold | ₹199 (was ₹999) | Premium models, fast speed, beta features |
| Platinum | ₹399 (was ₹1999) | All models, fastest speed, unlimited usage |

### Promo Codes
- **GGU**: 50% discount on offer prices

## 🚀 Implementation Examples

### 1. Using Authentication Context
```tsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, userProfile, signOut, isPremium } = useAuth();
  
  if (!user) {
    return <Text>Please sign in</Text>;
  }
  
  return (
    <View>
      <Text>Welcome, {user.email}</Text>
      <Text>Plan: {userProfile?.role}</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
};
```

### 2. Using Premium Features
```tsx
import { usePremium } from '../hooks/usePremium';

const ModelSelector = () => {
  const { canAccessModel, getAccessibleModels } = usePremium();
  
  const handleModelSelect = (modelId: string) => {
    const access = canAccessModel(modelId);
    
    if (access.canAccess) {
      // Use the model
      console.log('Model selected:', modelId);
    } else {
      // Show upgrade prompt
      Alert.alert('Premium Required', access.reason);
    }
  };
  
  const models = getAccessibleModels();
  
  return (
    <View>
      {models.map(model => (
        <Button 
          key={model.id}
          onPress={() => handleModelSelect(model.id)}>
          {model.name}
        </Button>
      ))}
    </View>
  );
};
```

### 3. Showing Plan Status
```tsx
import { PlanStatusCard } from '../components';

const SettingsScreen = () => {
  return (
    <ScrollView>
      <PlanStatusCard showUpgradeButton={true} />
      {/* Other settings */}
    </ScrollView>
  );
};
```

### 4. Premium Upgrade Prompts
```tsx
import { PremiumUpgradePrompt } from '../components';

const FeatureScreen = () => {
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  return (
    <View>
      {showUpgrade ? (
        <PremiumUpgradePrompt
          feature="Advanced Models"
          description="Access GPT-4 and other premium models"
          requiredPlan="Platinum"
          onClose={() => setShowUpgrade(false)}
        />
      ) : (
        <Button onPress={() => setShowUpgrade(true)}>
          Try Premium Feature
        </Button>
      )}
    </View>
  );
};
```

## 🔧 Configuration

### 1. Google Sign-In Setup
Update `src/services/authService.ts`:
```tsx
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_FROM_FIREBASE_CONSOLE',
});
```

### 2. Razorpay Configuration
Update `src/screens/UpgradeToPremiumScreen.tsx`:
```tsx
const options = {
  key: 'rzp_live_YOUR_KEY_ID', // Replace with your key
  // ... other options
};
```

### 3. Firebase Database Rules
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "fcmtokens": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## 📱 Testing

### 1. Test Authentication
- Use the Dev Tools screen to test Firebase connection
- Try all authentication methods (email, Google, phone)
- Verify email verification flow

### 2. Test Premium Features
- Create test users with different plan levels
- Test model access restrictions
- Verify upgrade flow and payment integration

### 3. Test Edge Cases
- Expired plans
- Invalid promo codes
- Network failures
- Authentication errors

## 🛠️ Troubleshooting

### Common Issues

1. **Google Sign-In not working**
   - Ensure SHA-1 fingerprint is added to Firebase
   - Check webClientId configuration
   - Verify Google Services plugin is applied

2. **Build errors**
   - Clean build: `cd android && ./gradlew clean`
   - Reinstall dependencies: `yarn install`
   - Check React Native version compatibility

3. **Firebase connection issues**
   - Verify google-services.json is in android/app/
   - Check Firebase project configuration
   - Use Firebase Test component in Dev Tools

### Debug Commands
```bash
# Clean and rebuild
yarn cache clean
cd android && ./gradlew clean && cd ..
yarn install
yarn android

# Check Firebase connection
# Navigate to Dev Tools → Firebase Test

# View logs
npx react-native log-android
```

## 📊 Database Structure

### User Profile
```json
{
  "users": {
    "user_uid": "{\"email\":\"user@example.com\",\"role\":\"Gold\",\"plan_end_time\":\"2025-11-15T23:59:59\",\"creation_time\":\"2025-09-26T12:00:00\"}"
  }
}
```

### FCM Tokens
```json
{
  "fcmtokens": {
    "all_tokens": "{\"user_uid\":\"fcm_token_string\"}"
  }
}
```

## 🔒 Security Considerations

1. **API Keys**: Never commit production keys to version control
2. **Firebase Rules**: Implement proper security rules
3. **App Check**: Enable for production to prevent abuse
4. **Payment Security**: Use Razorpay's secure payment flow
5. **User Data**: Encrypt sensitive information

## 📈 Analytics & Monitoring

Track key metrics:
- Authentication success/failure rates
- Premium conversion rates
- Model usage by plan type
- Payment completion rates
- User retention by plan level

This authentication system provides a complete foundation for user management and premium features in your React Native app.
