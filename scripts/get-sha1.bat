@echo off
echo 🔍 Getting SHA-1 fingerprint for Firebase Console...
echo.

echo Method 1: Using gradlew signingReport
cd android
call gradlew.bat signingReport | findstr "SHA1"
cd ..

echo.
echo Method 2: Direct keystore check (if Java is in PATH)
where keytool >nul 2>nul
if %errorlevel% equ 0 (
    keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android | findstr "SHA1"
) else (
    echo keytool not found in PATH
)

echo.
echo 📋 Copy the SHA-1 fingerprint and add it to Firebase Console:
echo 1. Go to https://console.firebase.google.com/
echo 2. Select project: pocketai-ai  
echo 3. Go to Project Settings ^> General
echo 4. Find your Android app
echo 5. Click "Add fingerprint" and paste the SHA-1
echo.
pause
