#!/usr/bin/env node

/**
 * Script to update Web Client ID in both strings.xml and AuthContext.tsx
 * Usage: node scripts/update-web-client-id.js YOUR_ACTUAL_WEB_CLIENT_ID
 */

const fs = require('fs');
const path = require('path');

const STRINGS_XML_PATH = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml');
const AUTH_CONTEXT_PATH = path.join(__dirname, '..', 'src', 'contexts', 'AuthContext.tsx');

function updateWebClientId(webClientId) {
  if (!webClientId) {
    console.error('❌ Please provide a web client ID as an argument');
    console.log('Usage: node scripts/update-web-client-id.js YOUR_WEB_CLIENT_ID');
    process.exit(1);
  }

  try {
    // Update strings.xml
    if (fs.existsSync(STRINGS_XML_PATH)) {
      let stringsContent = fs.readFileSync(STRINGS_XML_PATH, 'utf8');
      stringsContent = stringsContent.replace(
        'YOUR_ACTUAL_WEB_CLIENT_ID_HERE',
        webClientId
      );
      fs.writeFileSync(STRINGS_XML_PATH, stringsContent);
      console.log('✅ Updated strings.xml');
    } else {
      console.log('❌ strings.xml not found');
    }

    // Update AuthContext.tsx
    if (fs.existsSync(AUTH_CONTEXT_PATH)) {
      let authContent = fs.readFileSync(AUTH_CONTEXT_PATH, 'utf8');
      authContent = authContent.replace(
        'YOUR_ACTUAL_WEB_CLIENT_ID_HERE',
        webClientId
      );
      fs.writeFileSync(AUTH_CONTEXT_PATH, authContent);
      console.log('✅ Updated AuthContext.tsx');
    } else {
      console.log('❌ AuthContext.tsx not found');
    }

    console.log('\n🎉 Web Client ID updated successfully!');
    console.log('🔧 Next steps:');
    console.log('1. Clean your project: yarn clean');
    console.log('2. Rebuild: yarn android');
    console.log('3. Test Google Sign-in');

  } catch (error) {
    console.error('❌ Error updating files:', error.message);
  }
}

// Get web client ID from command line arguments
const webClientId = process.argv[2];
updateWebClientId(webClientId);
