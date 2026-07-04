@echo off
echo 🔧 Fixing Kotlin compilation issues...
echo.

echo 📱 Step 1: Stopping Gradle daemon...
cd android
call gradlew.bat --stop
if %errorlevel% neq 0 (
    echo ⚠️  Gradle daemon stop failed, continuing...
)

echo 🧹 Step 2: Deep cleaning build directories...
call gradlew.bat clean
if %errorlevel% neq 0 (
    echo ❌ Gradle clean failed
    pause
    exit /b 1
)

echo 🗑️  Step 3: Removing Kotlin cache directories...
if exist "build" rmdir /s /q "build"
if exist ".gradle" rmdir /s /q ".gradle"

echo 🔄 Step 4: Clearing global Gradle cache...
if exist "%USERPROFILE%\.gradle\caches" rmdir /s /q "%USERPROFILE%\.gradle\caches"
if exist "%USERPROFILE%\.gradle\daemon" rmdir /s /q "%USERPROFILE%\.gradle\daemon"

echo 📦 Step 5: Clearing node_modules build cache...
cd ..
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo 🔄 Step 6: Clearing React Native cache...
if exist "%LOCALAPPDATA%\Temp\react-native-*" (
    for /d %%i in ("%LOCALAPPDATA%\Temp\react-native-*") do rmdir /s /q "%%i"
)

echo 🏗️  Step 7: Starting fresh build...
cd android
call gradlew.bat assembleDebug --no-daemon --no-build-cache
if %errorlevel% neq 0 (
    echo ❌ Build failed
    echo.
    echo 🔧 Try these additional steps:
    echo 1. Restart your computer
    echo 2. Update Android Studio and Gradle
    echo 3. Check Java version compatibility
    pause
    exit /b 1
)

echo.
echo ✅ Build successful! 
echo 🧪 Now test Google Sign-In
echo.
pause
