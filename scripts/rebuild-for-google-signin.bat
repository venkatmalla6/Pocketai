@echo off
echo 🔄 Complete rebuild for Google Sign-In fix...
echo.

echo 📱 Step 1: Cleaning Android build...
cd android
call gradlew.bat clean
if %errorlevel% neq 0 (
    echo ❌ Android clean failed
    pause
    exit /b 1
)
cd ..

echo 📦 Step 2: Clearing React Native cache...
call yarn start --reset-cache --port 8081 &
timeout /t 3 /nobreak > nul
taskkill /f /im node.exe 2>nul

echo 🏗️  Step 3: Building Android app...
call yarn android
if %errorlevel% neq 0 (
    echo ❌ Android build failed
    pause
    exit /b 1
)

echo.
echo ✅ Rebuild complete! 
echo 🧪 Test Google Sign-In now
echo.
echo 📋 If still getting DEVELOPER_ERROR:
echo 1. Go to Firebase Console: https://console.firebase.google.com/
echo 2. Select your project: pocketai-ai
echo 3. Go to Project Settings ^> General
echo 4. Find your Android app
echo 5. Add SHA-1 fingerprint if missing
echo 6. Go to Authentication ^> Sign-in method
echo 7. Ensure Google is enabled
echo.
pause
