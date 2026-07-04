#!/usr/bin/env node

/**
 * Script to extract Web Client ID from google-services.json
 * Run this script to get your web client ID for Google Sign-In configuration
 */

const fs = require('fs');
const path = require('path');

const GOOGLE_SERVICES_PATH = path.join(__dirname, '..', 'android', 'app', 'google-services.json');

function extractWebClientId() {
  try {
    // Check if google-services.json exists
    if (!fs.existsSync(GOOGLE_SERVICES_PATH)) {
      console.error('❌ google-services.json not found at:', GOOGLE_SERVICES_PATH);
      console.log('\n📋 Manual Steps:');
      console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
      console.log('2. Select your project');
      console.log('3. Go to Project Settings (gear icon)');
      console.log('4. Scroll to "Your apps" section');
      console.log('5. Find your Web app or create one');
      console.log('6. Copy the Web client ID');
      return;
    }

    // Read and parse google-services.json
    const googleServices = JSON.parse(fs.readFileSync(GOOGLE_SERVICES_PATH, 'utf8'));
    
    // Extract web client ID from oauth_client array
    const oauthClients = googleServices.client?.[0]?.oauth_client || [];
    const webClient = oauthClients.find(client => client.client_type === 3);
    
    if (webClient && webClient.client_id) {
      console.log('✅ Web Client ID found:');
      console.log('📋 Copy this ID:', webClient.client_id);
      console.log('\n🔧 Next steps:');
      console.log('1. Replace YOUR_ACTUAL_WEB_CLIENT_ID_HERE in:');
      console.log('   - android/app/src/main/res/values/strings.xml');
      console.log('   - src/contexts/AuthContext.tsx');
      console.log('2. Clean and rebuild your app');
      console.log('3. Test Google Sign-in');
      
      return webClient.client_id;
    } else {
      console.log('❌ Web client ID not found in google-services.json');
      console.log('\n📋 Manual Steps:');
      console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
      console.log('2. Select your project');
      console.log('3. Go to Project Settings (gear icon)');
      console.log('4. Scroll to "Your apps" section');
      console.log('5. Add a Web app if you don\'t have one');
      console.log('6. Copy the Web client ID from the Web app configuration');
    }
  } catch (error) {
    console.error('❌ Error reading google-services.json:', error.message);
    console.log('\n📋 Manual Steps:');
    console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
    console.log('2. Select your project');
    console.log('3. Go to Project Settings (gear icon)');
    console.log('4. Scroll to "Your apps" section');
    console.log('5. Find your Web app or create one');
    console.log('6. Copy the Web client ID');
  }
}

// Run the extraction
console.log('🔍 Extracting Web Client ID from google-services.json...\n');
extractWebClientId();
