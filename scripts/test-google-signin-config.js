#!/usr/bin/env node

/**
 * Test script to verify Google Sign-In configuration is correct
 * This doesn't test the actual sign-in, but verifies all config files are properly set
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Google Sign-In Configuration...\n');

// Expected values
const EXPECTED_WEB_CLIENT_ID = '837575131315-q4ri7gg7ljp438nivtdbju8ep4r51qk1.apps.googleusercontent.com';
const EXPECTED_SHA1 = '5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25';

let allTestsPassed = true;

function testFile(filePath, description, testFn) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${description}: File not found`);
      allTestsPassed = false;
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const result = testFn(content);
    
    if (result.passed) {
      console.log(`✅ ${description}: ${result.message}`);
    } else {
      console.log(`❌ ${description}: ${result.message}`);
      allTestsPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${description}: Error reading file - ${error.message}`);
    allTestsPassed = false;
  }
}

// Test 1: strings.xml
testFile(
  path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml'),
  'strings.xml configuration',
  (content) => {
    if (content.includes(EXPECTED_WEB_CLIENT_ID)) {
      return { passed: true, message: 'Web client ID correctly configured' };
    } else if (content.includes('YOUR_ACTUAL_WEB_CLIENT_ID_HERE')) {
      return { passed: false, message: 'Still contains placeholder web client ID' };
    } else {
      return { passed: false, message: 'Web client ID not found or incorrect' };
    }
  }
);

// Test 2: AuthContext.tsx
testFile(
  path.join(__dirname, '..', 'src', 'contexts', 'AuthContext.tsx'),
  'AuthContext.tsx configuration',
  (content) => {
    if (content.includes(EXPECTED_WEB_CLIENT_ID)) {
      return { passed: true, message: 'Web client ID correctly configured' };
    } else if (content.includes('YOUR_ACTUAL_WEB_CLIENT_ID_HERE')) {
      return { passed: false, message: 'Still contains placeholder web client ID' };
    } else {
      return { passed: false, message: 'Web client ID not found or incorrect' };
    }
  }
);

// Test 3: google-services.json structure
testFile(
  path.join(__dirname, '..', 'android', 'app', 'google-services.json'),
  'google-services.json structure',
  (content) => {
    try {
      const config = JSON.parse(content);
      if (config.project_info && config.project_info.project_id === 'pocketai-ai') {
        return { passed: true, message: 'Project ID matches (pocketai-ai)' };
      } else {
        return { passed: false, message: 'Project ID mismatch or missing' };
      }
    } catch (error) {
      return { passed: false, message: 'Invalid JSON format' };
    }
  }
);

// Test 4: Package name consistency
testFile(
  path.join(__dirname, '..', 'android', 'app', 'google-services.json'),
  'Package name consistency',
  (content) => {
    try {
      const config = JSON.parse(content);
      const packageName = config.client?.[0]?.client_info?.android_client_info?.package_name;
      if (packageName === 'com.pocketai.ai') {
        return { passed: true, message: 'Package name matches (com.pocketai.ai)' };
      } else {
        return { passed: false, message: `Package name mismatch: ${packageName}` };
      }
    } catch (error) {
      return { passed: false, message: 'Could not verify package name' };
    }
  }
);

console.log('\n📋 Configuration Summary:');
console.log(`   Project ID: pocketai-ai`);
console.log(`   Package Name: com.pocketai.ai`);
console.log(`   Web Client ID: ${EXPECTED_WEB_CLIENT_ID}`);
console.log(`   Debug SHA-1: ${EXPECTED_SHA1}`);

console.log('\n🎯 Next Steps:');
if (allTestsPassed) {
  console.log('✅ All configuration tests passed!');
  console.log('🔄 Wait for build to complete, then test Google Sign-in');
  console.log('📱 The DEVELOPER_ERROR should be resolved');
} else {
  console.log('❌ Some configuration issues found');
  console.log('🔧 Fix the issues above before testing');
}

console.log('\n🧪 To test Google Sign-in after build:');
console.log('1. Open the app');
console.log('2. Navigate to login screen');
console.log('3. Tap "Continue with Google"');
console.log('4. Should open Google account picker (no DEVELOPER_ERROR)');

process.exit(allTestsPassed ? 0 : 1);
