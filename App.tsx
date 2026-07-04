import * as React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import {uiStore} from './src/store';
import {useTheme} from './src/hooks';
import {Theme} from './src/utils/types';
import {initializeDefaultAssistants} from './src/store/PalStore';
import {AuthProvider} from './src/contexts/AuthContext';
import {AuthWrapper} from './src/components';

import {l10n} from './src/utils/l10n';
import {initLocale} from './src/utils';
import {L10nContext} from './src/utils';
import {ROUTES} from './src/utils/navigationConstants';

import {
  SidebarContent,
  ModelsHeaderRight,
  PalHeaderRight,
  HeaderLeft,
  AppWithMigration,
} from './src/components';
import {
  ChatScreen,
  SplashScreen,
  ModelsScreen,
  SettingsScreen,
  BenchmarkScreen,
  AboutScreen,
  AisScreen,

  // Dev tools screen. Only available in debug mode.
  DevToolsScreen,
} from './src/screens';

// Check if app is in debug mode
const isDebugMode = __DEV__;

const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get('window').width;

const App = observer(() => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const currentL10n = l10n[uiStore.language];
  const [showSplash, setShowSplash] = React.useState(true);

  // Initialize locale with the current language and create default pals
  // Firebase initialization disabled - authentication bypassed
  React.useEffect(() => {
    // Initialize app components without Firebase
    initLocale(uiStore.language);
    initializeDefaultAssistants();
    console.log('App initialized without Firebase authentication');
    
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
          <PaperProvider theme={theme}>
            <L10nContext.Provider value={currentL10n}>
              <AuthProvider>
                <AuthWrapper>
                  {showSplash ? (
                    <SplashScreen />
                  ) : (
                    <NavigationContainer>
                      <BottomSheetModalProvider>
                        <Drawer.Navigator
                          useLegacyImplementation={false}
                          screenOptions={{
                            headerLeft: () => <HeaderLeft />,
                            drawerStyle: {
                              width: screenWidth > 400 ? 320 : screenWidth * 0.8,
                              backgroundColor: theme.colors.surface,
                            },
                            headerStyle: {
                              backgroundColor: theme.colors.background,
                            },
                            headerTintColor: theme.colors.onBackground,
                            headerTitleStyle: styles.headerTitle,
                            drawerType: 'slide',
                            drawerHideStatusBarOnOpen: false,
                            overlayColor: 'rgba(0, 0, 0, 0.6)',
                            drawerStatusBarAnimation: 'slide',
                            drawerActiveTintColor: theme.colors.primary,
                            drawerInactiveTintColor: theme.colors.onSurface,
                            drawerLabelStyle: {
                              fontSize: 16,
                              fontWeight: '500',
                            },
                            drawerItemStyle: {
                              borderRadius: 12,
                              marginHorizontal: 8,
                              marginVertical: 2,
                            },
                            drawerActiveBackgroundColor: theme.colors.primaryContainer,
                            sceneContainerStyle: {
                              backgroundColor: theme.colors.background,
                            },
                            swipeEnabled: true,
                            swipeEdgeWidth: 50,
                          }}
                          drawerContent={props => <SidebarContent {...props} />}>
                    <Drawer.Screen
                      name={ROUTES.CHAT}
                      component={ChatScreen}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Drawer.Screen
                      name={ROUTES.MODELS}
                      component={ModelsScreen}
                      options={{
                        headerRight: () => <ModelsHeaderRight />,
                        headerStyle: styles.headerWithoutDivider,
                        title: currentL10n.screenTitles.models,
                      }}
                    />
                    <Drawer.Screen
                      name={ROUTES.PALS}
                      component={AisScreen}
                      options={{
                        headerRight: () => <PalHeaderRight />,
                        headerStyle: styles.headerWithoutDivider,
                        title: currentL10n.screenTitles.pals,
                      }}
                    />
                    <Drawer.Screen
                      name={ROUTES.BENCHMARK}
                      component={BenchmarkScreen}
                      options={{
                        headerStyle: styles.headerWithoutDivider,
                        title: currentL10n.screenTitles.benchmark,
                      }}
                    />
                    <Drawer.Screen
                      name={ROUTES.SETTINGS}
                      component={SettingsScreen}
                      options={{
                        headerStyle: styles.headerWithoutDivider,
                        title: currentL10n.screenTitles.settings,
                      }}
                    />
                    <Drawer.Screen
                      name={ROUTES.APP_INFO}
                      component={AboutScreen}
                      options={{
                        headerStyle: styles.headerWithoutDivider,
                        title: currentL10n.screenTitles.appInfo,
                      }}
                    />

                    {/* Only show Dev Tools screen in debug mode */}
                    {isDebugMode && (
                      <Drawer.Screen
                        name={ROUTES.DEV_TOOLS}
                        component={DevToolsScreen}
                        options={{
                          headerStyle: styles.headerWithoutDivider,
                          title: 'Dev Tools',
                        }}
                      />
                    )}
                      </Drawer.Navigator>
                    </BottomSheetModalProvider>
                  </NavigationContainer>
                  )}
                </AuthWrapper>
              </AuthProvider>
            </L10nContext.Provider>
          </PaperProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    headerWithoutDivider: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor: theme.colors.background,
    },
    headerWithDivider: {
      backgroundColor: theme.colors.background,
    },
    headerTitle: {
      ...theme.fonts.titleSmall,
    },
  });

// Wrap the App component with AppWithMigration to show migration UI when needed
const AppWithMigrationWrapper = () => {
  return (
    <AppWithMigration>
      <App />
    </AppWithMigration>
  );
};

export default AppWithMigrationWrapper;
