import React, { useContext, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  Animated,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Clipboard from '@react-native-clipboard/clipboard';
import { Text } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { CopyIcon, GithubIcon, GlobeIcon, SendIcon } from '../../assets/icons';
import { useTheme } from '../../hooks';
import { createStyles } from './styles';
import { L10nContext } from '../../utils';

const GithubButtonIcon = ({ color }: { color: string }) => (
  <GithubIcon stroke={color} />
);

export const AboutScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const l10n = useContext(L10nContext);
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [appInfo, setAppInfo] = React.useState({
    version: '',
    build: '',
  });

  React.useEffect(() => {
    const version = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();
    setAppInfo({
      version,
      build: buildNumber,
    });
  }, []);

  // Auto-scroll carousel animation
  useEffect(() => {
    let currentIndex = 0;
    const cardWidth = 300; // card width + margin
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        currentIndex = (currentIndex + 1) % 3; // Cycle through 3 cards infinitely
        const nextOffset = currentIndex * cardWidth;
        
        scrollRef.current.scrollTo({ 
          x: nextOffset, 
          animated: true,
          duration: 800 // Smooth 800ms transition
        });
      }
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const copyVersionToClipboard = () => {
    const versionString = `Version ${appInfo.version} (${appInfo.build})`;
    Clipboard.setString(versionString);
    Alert.alert(
      l10n.about?.versionCopiedTitle || 'Copied',
      l10n.about?.versionCopiedDescription || 'Version info copied to clipboard',
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text variant="titleLarge" style={styles.title}>
                MIND SPRINT - 2K25
              </Text>
              <Text variant="bodyMedium" style={styles.description}>
                Built for the national-level hackathon conducted by Brain-O-Vision
              </Text>

             
            </View>
          </View>

          {/* Team Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Team</Text>
            
            {/* Team Members Carousel */}
            <Animated.ScrollView 
              ref={scrollRef}
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.teamMembersCarousel}
              contentContainerStyle={styles.carouselContent}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            >
              {/* Member 2 */}
              <View style={styles.teamMemberCard}>
                <Image
                  source={{ uri: 'https://i.ibb.co/LDwkgTTb/Whats-App-Image-2025-12-11-at-2-28-12-PM.jpg' }}
                  style={styles.teamMemberCardImage}
                />
                <View style={styles.teamMemberCardInfo}>
                  <Text variant="titleMedium" style={styles.teamMemberCardName}>
                    Saikiran Chapa
                  </Text>
                  <Text variant="bodySmall" style={styles.teamMemberCardRole}>
                    Team Member
                  </Text>
                  <View style={styles.contactIcons}>
                    <TouchableOpacity onPress={() => Linking.openURL('tel:+918106574159')}>
                      <SendIcon width={20} height={20} stroke={theme.colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:gietsaikiran@gmail.com')}>
                      <GlobeIcon width={20} height={20} stroke={theme.colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Member 3 */}
              <View style={styles.teamMemberCard}>
                <Image
                  source={{ uri: 'https://i.ibb.co/9mYmRrR2/Whats-App-Image-2025-12-11-at-2-28-10-PM.jpg' }}
                  style={styles.teamMemberCardImage}
                />
                <View style={styles.teamMemberCardInfo}>
                  <Text variant="titleMedium" style={styles.teamMemberCardName}>
                    Venkat Malla
                  </Text>
                  <Text variant="bodySmall" style={styles.teamMemberCardRole}>
                    Team Member
                  </Text>
                  <View style={styles.contactIcons}>
                    <TouchableOpacity onPress={() => Linking.openURL('tel:+916303148893')}>
                      <SendIcon width={20} height={20} stroke={theme.colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:venkatmallacs@gmail.com')}>
                      <GlobeIcon width={20} height={20} stroke={theme.colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Member 4 - Additional card for carousel */}
              <View style={styles.teamMemberCard}>
                <Image
                  source={{ uri: 'https://i.ibb.co/TD5pqNGq/Whats-App-Image-2025-12-11-at-2-29-59-PM-1.jpg' }}
                  style={styles.teamMemberCardImage}
                />
                <View style={styles.teamMemberCardInfo}>
                  <Text variant="titleMedium" style={styles.teamMemberCardName}>
                    Pavankumarswamy
                  </Text>
                  <Text variant="bodySmall" style={styles.teamMemberCardRole}>
                    Team Lead
                  </Text>
                  <View style={styles.contactIcons}>
                    <TouchableOpacity onPress={() => Linking.openURL('tel:+918639122823')}>
                      <SendIcon width={20} height={20} stroke={theme.colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:shesettipavankumarswamy@gmail.com')}>
                      <GlobeIcon width={20} height={20} stroke={theme.colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animated.ScrollView>
          </View>

          {/* Partners / Organizers */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Organized By</Text>
            <View style={styles.logosContainer}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://brainovision.in')}
              >
                <Image
                  source={{ uri: 'https://brainovision.in/logos/bovyellow.png' }}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* College Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conducted By College</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://pscmr.ac.in')
              }
            >
              <Image
                source={{ uri: 'https://i.ibb.co/fVP7WQsg/footer-logo2.png' }}
                style={styles.collegeLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Additional College Logo (GIITS) */}
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};