import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, Alert, Animated, Image, Share, Platform} from 'react-native';
import {observer} from 'mobx-react';
import {Divider, Drawer, Text} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {chatSessionStore, SessionMetaData} from '../../store';
import {Menu, RenameModal} from '..';
import {
  ShareIcon,
  ChatIcon,
  EditIcon,
  ModelIcon,
  PalIcon,
  SettingsIcon,
  TrashIcon,
  AppInfoIcon,
} from '../../assets/icons';
import {L10nContext} from '../../utils';
import {ROUTES} from '../../utils/navigationConstants';

// Check if app is in debug mode
const isDebugMode = __DEV__;

export const SidebarContent: React.FC<DrawerContentComponentProps> = observer(
  props => {
    const [menuVisible, setMenuVisible] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [sessionToRename, setSessionToRename] =
      useState<SessionMetaData | null>(null);

    // Animation values for enhanced interactions
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(-50))[0];

    const theme = useTheme();
    const styles = createStyles(theme);
    const l10n = useContext(L10nContext);

    

    const handleShareApp = async () => {
  try {
    const message =
      "I wanted to personally recommend Pocket AI, a powerful offline AI assistant that works even without internet.\n" +
      "It's perfect for students, tech learners, and creators who want fast, private, on-device AI.\n\n" +
      'Pocket AI Highlights:\n' +
      '• Offline AI Chat (no network needed)\n' +
      '• Download HuggingFace AI models\n' +
      '• Voice Mode (talk with AI)\n' +
      '• Local chat storage (fully private)\n' +
      '• Create your own custom AI\n' +
      '• Image & video analysis\n' +
      '• Super fast and secure\n\n' +
      'Try Pocket AI here:\n' +
      'https://play.google.com/store/apps/details?id=com.pocketly.ai\n\n' +
      'Thank you for downloading Pocket AI! Your support motivates us to keep improving.';

    const imageUrl = "https://i.ibb.co/x8mSTmBN/POCKET-AI.png";

    console.log("=== SHARE DEBUG START ===");
    console.log("Message length:", message.length);
    console.log("Image URL:", imageUrl);
    console.log("Platform:", typeof Platform !== 'undefined' ? Platform.OS : 'unknown');
    
    // Test if URL is accessible
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      console.log("Image URL accessible:", response.ok, "Status:", response.status);
    } catch (fetchError) {
      console.log("Image URL NOT accessible:", fetchError);
    }

    console.log("Share options:", {
      message: message.substring(0, 100) + "...",
      url: imageUrl,
    });

    await Share.share({
      message,
      url: imageUrl, // attaches image from URL
    });

    console.log("Share completed successfully");
    console.log("=== SHARE DEBUG END ===");

  } catch (error) {
    console.error("=== SHARE ERROR ===");
    console.error("Error sharing:", error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error code:", (error as any)?.code || 'unknown');
    console.error("=== SHARE ERROR END ===");
    Alert.alert("Error", "Unable to share the app right now.");
  }
};

    useEffect(() => {
      chatSessionStore.loadSessionList();

      // Set localized date group names whenever the component mounts
      chatSessionStore.setDateGroupNames(
        l10n.components.sidebarContent.dateGroups,
      );

      // Animate drawer content when it opens
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, [l10n.components.sidebarContent.dateGroups, fadeAnim, slideAnim]);

    const openMenu = (sessionId: string, event: any) => {
      const {nativeEvent} = event;
      setMenuPosition({x: nativeEvent.pageX, y: nativeEvent.pageY});
      setMenuVisible(sessionId);
    };

    const closeMenu = () => setMenuVisible(null);

    const onPressDelete = (sessionId: string) => {
      if (sessionId) {
        Alert.alert(
          l10n.components.sidebarContent.deleteChatTitle,
          l10n.components.sidebarContent.deleteChatMessage,
          [
            {
              text: l10n.common.cancel,
              style: 'cancel',
            },
            {
              text: l10n.common.delete,
              style: 'destructive',
              onPress: async () => {
                chatSessionStore.resetActiveSession();
                await chatSessionStore.deleteSession(sessionId);
                closeMenu();
              },
            },
          ],
        );
      }
      closeMenu();
    };

    return (
      <GestureHandlerRootView style={styles.sidebarContainer}>
        <Animated.View 
          style={[
            styles.contentWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            }
          ]}>
          <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollViewContent}>
            {/* Header Section */}
            <Animated.View 
              style={[
                {
                  paddingHorizontal: 16,
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.outline,
                  marginBottom: 8,
                },
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
              ]}>
              <Text 
                variant="headlineSmall" 
                style={[
                  {
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                    marginBottom: 4,
                  }
                ]}>
                Pocket Ai
              </Text>
              <Text 
                variant="bodyMedium" 
                style={[
                  {
                    color: theme.colors.onSurfaceVariant,
                    fontStyle: 'italic',
                  }
                ]}>
                an offline ai chat app
              </Text>
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim }}>
              <Drawer.Section showDivider={false}>
                <Drawer.Item
                  label={l10n.components.sidebarContent.menuItems.chat}
                  icon={() => <ChatIcon stroke={theme.colors.primary} />}
                  onPress={() => props.navigation.navigate(ROUTES.CHAT)}
                  style={[styles.menuDrawerItem, { marginHorizontal: 0, paddingHorizontal: 16 }]}
                />
                <Drawer.Item
                  label={l10n.components.sidebarContent.menuItems.models}
                  icon={() => <ModelIcon stroke={theme.colors.primary} />}
                  onPress={() => props.navigation.navigate(ROUTES.MODELS)}
                  style={[styles.menuDrawerItem, { marginHorizontal: 0, paddingHorizontal: 16 }]}
                />
                <Drawer.Item
                  label={l10n.components.sidebarContent.menuItems.pals}
                  icon={() => <PalIcon stroke={theme.colors.primary} />}
                  onPress={() => props.navigation.navigate(ROUTES.PALS)}
                  style={[styles.menuDrawerItem, { marginHorizontal: 0, paddingHorizontal: 16 }]}
                />
              </Drawer.Section>
            </Animated.View>
            <Divider style={styles.divider} />
            {/* Loop over the session groups and render them */}
            {Object.entries(chatSessionStore.groupedSessions).map(
              ([dateLabel, sessions]) => (
                <View key={dateLabel} style={styles.drawerSection}>
                  <Text variant="bodySmall" style={styles.dateLabel}>
                    {dateLabel}
                  </Text>
                  {sessions.map((session, sessionIndex) => {
                    const isActive =
                      chatSessionStore.activeSessionId === session.id;
                    return (
                      <Animated.View 
                        key={session.id} 
                        style={[
                          styles.sessionItem,
                          {
                            opacity: fadeAnim,
                          }
                        ]}>
                        <TouchableOpacity
                          onPress={() => {
                            chatSessionStore.setActiveSession(session.id);
                            props.navigation.navigate(ROUTES.CHAT);
                          }}
                          onLongPress={event => openMenu(session.id, event)}
                          style={styles.sessionTouchable}>
                          <Drawer.Item
                            active={isActive}
                            label={session.title}
                            style={[styles.sessionDrawerItem, { 
                              marginHorizontal: 0, 
                              paddingHorizontal: 16,
                              marginLeft: 0,
                              marginRight: 0
                            }]}
                          />
                        </TouchableOpacity>

                        {/* Menu for the session item */}
                        <Menu
                          visible={menuVisible === session.id}
                          onDismiss={closeMenu}
                          anchor={menuPosition}
                          style={styles.menu}
                          contentStyle={{}}
                          anchorPosition="bottom">
                          <Menu.Item
                            onPress={() => {
                              setSessionToRename(session);
                              closeMenu();
                            }}
                            label={l10n.common.rename}
                            leadingIcon={() => (
                              <EditIcon stroke={theme.colors.primary} />
                            )}
                          />
                          <Menu.Item
                            onPress={() => onPressDelete(session.id)}
                            label={l10n.common.delete}
                            labelStyle={{color: theme.colors.error}}
                            leadingIcon={() => (
                              <TrashIcon stroke={theme.colors.error} />
                            )}
                          />
                        </Menu>
                      </Animated.View>
                    );
                  })}
                </View>
              ),
            )}
          </DrawerContentScrollView>
          <Animated.View
            style={[
              {
                borderTopWidth: 0.1,
                borderTopColor: theme.colors.onSurfaceVariant,
                opacity: 0.4,
                paddingBottom: 8,
              },
              { opacity: fadeAnim }
            ]}>
            <Drawer.Section showDivider={false}>
              <Drawer.Item
                label={l10n.components.sidebarContent.menuItems.shareApp}
                icon={() => (
                  <ShareIcon
                    width={24}
                    height={24}
                    stroke={theme.colors.primary}
                  />
                )}
                onPress={handleShareApp}
                style={[styles.menuDrawerItem, { marginHorizontal: 0, paddingHorizontal: 16 }]}
              />
              <Drawer.Item
                label={l10n.components.sidebarContent.menuItems.appInfo}
                icon={() => (
                  <AppInfoIcon
                    width={24}
                    height={24}
                    stroke={theme.colors.primary}
                  />
                )}
                onPress={() => props.navigation.navigate(ROUTES.APP_INFO)}
                style={[styles.menuDrawerItem, { marginHorizontal: 0, paddingHorizontal: 16 }]}
              />
              <Drawer.Item
                label={l10n.components.sidebarContent.menuItems.settings}
                icon={() => (
                  <SettingsIcon
                    width={24}
                    height={24}
                    stroke={theme.colors.primary}
                  />
                )}
                onPress={() => props.navigation.navigate(ROUTES.SETTINGS)}
                style={[styles.menuDrawerItem, { marginHorizontal: 0, paddingHorizontal: 16 }]}
              />
            </Drawer.Section>
          </Animated.View>
        </Animated.View>
        <RenameModal
          visible={sessionToRename !== null}
          onClose={() => setSessionToRename(null)}
          session={sessionToRename}
        />
      </GestureHandlerRootView>
    );
  },
);
