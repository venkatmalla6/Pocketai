import {StyleSheet} from 'react-native';

import {MD3Theme} from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    sidebarContainer: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    divider: {
      marginHorizontal: 16,
      backgroundColor: theme.colors.onSurfaceVariant,
      height: 1,
      opacity: 0.1,
    },
    contentWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    sessionDrawerItem: {
      height: 40,
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
    menuDrawerItem: {
      height: 44,
      marginLeft: 0,
      marginRight: 0,
    },
    versionText: {
      color: theme.colors.onSurfaceVariant,
      opacity: 0.7,
      fontSize: 12,
      fontWeight: '500',
    },
    drawerSection: {
      marginTop: 10,
    },
    dateLabel: {
      paddingLeft: 16,
      paddingVertical: 10,
    },
    scrollViewContent: {
      flexGrow: 1,
      minHeight: '100%',
    },
    bottomSection: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.onSurfaceVariant,
      opacity: 0.9,
      paddingBottom: 8,
    },
    mainContent: {
      flex: 1,
    },
    menu: {
      width: 170,
    },
    sessionItem: {
      position: 'relative',
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
    sessionTouchable: {
      flex: 1,
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
  });
