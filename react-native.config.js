module.exports = {
  dependencies: {
    'react-native-keychain': {
      platforms: {
        android: null, // ⛔ Disable autolinking for Android
      },
    },
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
};
