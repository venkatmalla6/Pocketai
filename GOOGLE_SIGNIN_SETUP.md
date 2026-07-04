# Google Sign-In Setup Guide for PocketPal

## Step 1: Get Your Web Client ID from Firebase Console

1. **Open Firebase Console**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your PocketPal project

2. **Navigate to Project Settings**
   - Click on the gear icon (⚙️) in the left sidebar
   - Select "Project settings"

3. **Find Your Web Client ID**
   - Scroll down to the "Your apps" section
   - Look for your Web app (if you don't have one, create it by clicking "Add app" > Web)
   - Copy the "Web client ID" (it looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)

## Step 2: Update Your Android Configuration

1. **Update strings.xml**
   - Open `android/app/src/main/res/values/strings.xml`
   - Replace `YOUR_ACTUAL_WEB_CLIENT_ID_HERE` with your actual web client ID:
   ```xml
   <string name="default_web_client_id">123456789-abcdefghijklmnop.apps.googleusercontent.com</string>
   ```

2. **Update AuthContext.tsx**
   - Open `src/contexts/AuthContext.tsx`
   - Replace `YOUR_ACTUAL_WEB_CLIENT_ID_HERE` with your actual web client ID:
   ```typescript
   webClientId: '123456789-abcdefghijklmnop.apps.googleusercontent.com',
   ```

## Step 3: Verify Google Services Configuration

1. **Check google-services.json**
   - Ensure `android/app/google-services.json` exists and is up to date
   - Download the latest version from Firebase Console if needed

2. **Verify SHA-1 Fingerprints**
   - In Firebase Console > Project Settings > General
   - Make sure your debug and release SHA-1 fingerprints are added
   - To get debug SHA-1: `cd android && ./gradlew signingReport`

## Step 4: Test Google Sign-In

1. **Clean and rebuild**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   yarn android
   ```

2. **Test the sign-in flow**
   - Try signing in with Google
   - Check the logs for any errors

## Common Issues and Solutions

### Issue: "DEVELOPER_ERROR" or "10"
- **Solution**: Wrong web client ID or missing SHA-1 fingerprints

### Issue: "SIGN_IN_CANCELLED" or "12501"
- **Solution**: User cancelled the sign-in process (normal behavior)

### Issue: "NETWORK_ERROR" or "7"
- **Solution**: Check internet connection and Firebase project configuration

### Issue: "INVALID_ACCOUNT" or "5"
- **Solution**: The account is not valid or doesn't exist

## Additional Notes

- The web client ID is different from the Android client ID
- Make sure Google Sign-In is enabled in Firebase Authentication
- For production builds, ensure you have the correct SHA-1 for your release keystore
- Keep your google-services.json file secure and up to date

## Troubleshooting Commands

```bash
# Clean everything
yarn clean

# Check SHA-1 fingerprints
cd android && ./gradlew signingReport

# Rebuild with fresh cache
yarn start --reset-cache
yarn android
```
