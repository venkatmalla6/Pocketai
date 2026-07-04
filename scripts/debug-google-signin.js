#!/usr/bin/env node

/**
 * Comprehensive Google Sign-In Debug Script
 * This script checks all common issues that cause DEVELOPER_ERROR
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GOOGLE_SERVICES_PATH = path.join(__dirname, '..', 'android', 'app', 'google-services.json');
const STRINGS_XML_PATH = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml');
const AUTH_CONTEXT_PATH = path.join(__dirname, '..', 'src', 'contexts', 'AuthContext.tsx');
const BUILD_GRADLE_PATH = path.join(__dirname, '..', 'android', 'app', 'build.gradle');

console.log('🔍 Google Sign-In Configuration Debug\n');

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description} exists`);
    return true;
  } else {
    console.log(`❌ ${description} missing`);
    return false;
  }
}

function checkGoogleServices() {
  console.log('📋 1. Checking google-services.json...');
  
  if (!checkFile(GOOGLE_SERVICES_PATH, 'google-services.json')) {
    return false;
  }

  try {
    const googleServices = JSON.parse(fs.readFileSync(GOOGLE_SERVICES_PATH, 'utf8'));
    
    // Check project info
    if (googleServices.project_info) {
      console.log(`   Project ID: ${googleServices.project_info.project_id}`);
      console.log(`   Project Number: ${googleServices.project_info.project_number}`);
    }

    // Check client info
    if (googleServices.client && googleServices.client[0]) {
      const client = googleServices.client[0];
      console.log(`   Package Name: ${client.client_info?.android_client_info?.package_name}`);
      
      // Check OAuth clients
      const oauthClients = client.oauth_client || [];
      console.log(`   OAuth Clients: ${oauthClients.length}`);
      
      oauthClients.forEach((oauth, index) => {
        console.log(`   Client ${index + 1}: Type ${oauth.client_type}, ID: ${oauth.client_id}`);
      });

      const webClient = oauthClients.find(client => client.client_type === 3);
      if (webClient) {
        console.log(`✅ Web client found: ${webClient.client_id}`);
        return webClient.client_id;
      } else {
        console.log('❌ No web client found in google-services.json');
        console.log('   You need to add a Web app in Firebase Console');
        return false;
      }
    }
  } catch (error) {
    console.log(`❌ Error parsing google-services.json: ${error.message}`);
    return false;
  }
}

function checkStringsXml(expectedWebClientId) {
  console.log('\n📋 2. Checking strings.xml...');
  
  if (!checkFile(STRINGS_XML_PATH, 'strings.xml')) {
    return false;
  }

  try {
    const content = fs.readFileSync(STRINGS_XML_PATH, 'utf8');
    
    if (content.includes('default_web_client_id')) {
      console.log('✅ default_web_client_id found in strings.xml');
      
      if (expectedWebClientId && content.includes(expectedWebClientId)) {
        console.log('✅ Web client ID matches google-services.json');
        return true;
      } else if (content.includes('YOUR_ACTUAL_WEB_CLIENT_ID_HERE')) {
        console.log('❌ Placeholder still present in strings.xml');
        return false;
      } else {
        console.log('⚠️  Web client ID in strings.xml doesn\'t match google-services.json');
        return false;
      }
    } else {
      console.log('❌ default_web_client_id not found in strings.xml');
      return false;
    }
  } catch (error) {
    console.log(`❌ Error reading strings.xml: ${error.message}`);
    return false;
  }
}

function checkAuthContext(expectedWebClientId) {
  console.log('\n📋 3. Checking AuthContext.tsx...');
  
  if (!checkFile(AUTH_CONTEXT_PATH, 'AuthContext.tsx')) {
    return false;
  }

  try {
    const content = fs.readFileSync(AUTH_CONTEXT_PATH, 'utf8');
    
    if (content.includes('webClientId:')) {
      console.log('✅ webClientId configuration found');
      
      if (expectedWebClientId && content.includes(expectedWebClientId)) {
        console.log('✅ Web client ID matches google-services.json');
        return true;
      } else if (content.includes('YOUR_ACTUAL_WEB_CLIENT_ID_HERE')) {
        console.log('❌ Placeholder still present in AuthContext.tsx');
        return false;
      } else {
        console.log('⚠️  Web client ID in AuthContext.tsx doesn\'t match google-services.json');
        return false;
      }
    } else {
      console.log('❌ webClientId configuration not found');
      return false;
    }
  } catch (error) {
    console.log(`❌ Error reading AuthContext.tsx: ${error.message}`);
    return false;
  }
}

function checkBuildGradle() {
  console.log('\n📋 4. Checking build.gradle...');
  
  if (!checkFile(BUILD_GRADLE_PATH, 'build.gradle')) {
    return false;
  }

  try {
    const content = fs.readFileSync(BUILD_GRADLE_PATH, 'utf8');
    
    if (content.includes('com.google.gms.google-services')) {
      console.log('✅ Google Services plugin found');
      return true;
    } else {
      console.log('❌ Google Services plugin not found');
      console.log('   Add: apply plugin: "com.google.gms.google-services"');
      return false;
    }
  } catch (error) {
    console.log(`❌ Error reading build.gradle: ${error.message}`);
    return false;
  }
}

function getSHA1Fingerprint() {
  console.log('\n📋 5. Getting SHA-1 fingerprint...');
  
  try {
    const result = execSync('keytool -list -v -keystore %USERPROFILE%\\.android\\debug.keystore -alias androiddebugkey -storepass android -keypass android', { encoding: 'utf8' });
    
    const sha1Match = result.match(/SHA1:\s*([A-F0-9:]+)/i);
    if (sha1Match) {
      console.log(`✅ Debug SHA-1: ${sha1Match[1]}`);
      return sha1Match[1];
    } else {
      console.log('❌ Could not extract SHA-1 fingerprint');
      return null;
    }
  } catch (error) {
    console.log('❌ Error getting SHA-1 fingerprint');
    console.log('   Run manually: keytool -list -v -keystore %USERPROFILE%\\.android\\debug.keystore -alias androiddebugkey -storepass android -keypass android');
    return null;
  }
}

function provideSolutions() {
  console.log('\n🔧 SOLUTIONS FOR DEVELOPER_ERROR:\n');
  
  console.log('1. 📱 FIREBASE CONSOLE CHECKLIST:');
  console.log('   • Go to https://console.firebase.google.com/');
  console.log('   • Select your project');
  console.log('   • Go to Authentication > Sign-in method');
  console.log('   • Enable Google sign-in provider');
  console.log('   • Go to Project Settings > General');
  console.log('   • Ensure you have a Web app configured');
  console.log('   • Add your SHA-1 fingerprint to Android app');
  
  console.log('\n2. 🔄 REBUILD STEPS:');
  console.log('   • cd android');
  console.log('   • .\\gradlew.bat clean');
  console.log('   • cd ..');
  console.log('   • yarn start --reset-cache');
  console.log('   • yarn android');
  
  console.log('\n3. 🐛 COMMON ISSUES:');
  console.log('   • Wrong package name in google-services.json');
  console.log('   • Missing SHA-1 fingerprint in Firebase Console');
  console.log('   • Google Sign-in not enabled in Firebase Auth');
  console.log('   • App not rebuilt after configuration changes');
  console.log('   • Using wrong web client ID (should be type 3)');
}

// Run all checks
const webClientId = checkGoogleServices();
checkStringsXml(webClientId);
checkAuthContext(webClientId);
checkBuildGradle();
getSHA1Fingerprint();
provideSolutions();
