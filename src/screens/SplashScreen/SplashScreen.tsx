import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useTheme} from '../../hooks';
import {createStyles} from './styles';

const {width, height} = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    // Auto-navigate to chat screen after 3 seconds
    const timer = setTimeout(() => {
      // Navigation will be handled by App.tsx
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
        translucent={false}
      />
      
      {/* App Logo - Center */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/app-logo.png')}
          style={styles.appLogo}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        <View style={styles.poweredByContainer}>
          <Text style={styles.poweredByText}>Powered by</Text>
          <Text style={styles.teamName}>Creative Minds</Text>
        </View>
        
        <Image
          source={require('../../assets/ggu-logo.png')}
          style={styles.gguLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
