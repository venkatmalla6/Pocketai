# Firebase Console Checklist for Google Sign-In

## ✅ Steps to Verify (while app is building)

### 1. 🔐 Authentication Settings
- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Select project: **pocketai-ai**
- [ ] Navigate to **Authentication** > **Sign-in method**
- [ ] Verify **Google** provider is **ENABLED**
- [ ] If not enabled, click on Google and enable it

### 2. 📱 Project Configuration
- [ ] Go to **Project Settings** (gear icon)
- [ ] Scroll to **Your apps** section
- [ ] Find your **Android app** (com.pocketai.ai)
- [ ] Verify SHA-1 fingerprint is added: `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25`

### 3. 🌐 Web App Configuration
- [ ] In the same **Your apps** section
- [ ] Verify you have a **Web app** configured
- [ ] Web client ID should be: `837575131315-q4ri7gg7ljp438nivtdbju8ep4r51qk1.apps.googleusercontent.com`

## 🚀 After Build Completes

### Test Google Sign-In:
1. Open your app
2. Navigate to login screen
3. Tap "Continue with Google"
4. Should open Google account picker
5. Select account and sign in

## 🐛 If Still Getting DEVELOPER_ERROR:

### Double-check these common issues:
- [ ] Google Sign-in provider is enabled in Firebase Auth
- [ ] SHA-1 fingerprint matches exactly (no extra spaces)
- [ ] Package name in google-services.json matches your app
- [ ] App was rebuilt after configuration changes
- [ ] Using correct web client ID (type 3 from google-services.json)

### Additional Debug Steps:
```bash
# Check if configuration is correct
node scripts/debug-google-signin.js

# Get SHA-1 again if needed
scripts/get-sha1.bat

# Force complete rebuild
cd android
.\gradlew.bat clean
cd ..
yarn start --reset-cache
yarn android
```

## 📞 Support
If issues persist, the problem might be:
1. Firebase project configuration mismatch
2. Google Cloud Console OAuth consent screen not configured
3. App not properly linked to Firebase project

**Current Configuration Summary:**
- Project ID: pocketai-ai
- Package Name: com.pocketai.ai
- Web Client ID: 837575131315-q4ri7gg7ljp438nivtdbju8ep4r51qk1.apps.googleusercontent.com
- Debug SHA-1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
