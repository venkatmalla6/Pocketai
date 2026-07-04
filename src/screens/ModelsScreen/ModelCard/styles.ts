import {StyleSheet} from 'react-native';

import {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      margin: 10,
      backgroundColor: '#2A2A2A',
      borderWidth: 1,
      borderColor: '#FFFFFF',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      overflow: 'visible',
      position: 'relative',
      padding: 0,
    },
    hfBadge: {
      position: 'absolute',
      top: -11,
      right: -5,
      width: 24,
      height: 24,
      zIndex: 1,
      resizeMode: 'contain',
    },
    touchableRipple: {
      zIndex: 1,
    },
    cardInner: {},
    cardContent: {
      padding: 16,
    },
    progressBar: {
      height: 8,
      borderRadius: 5,
      marginTop: 8,
    },
    actions: {
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    actionButton: {
      margin: 0,
    },
    settingsContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    modelInfoContainer: {
      flex: 1,
      marginRight: 8,
    },
    modelName: {
      fontSize: 16,
      fontWeight: 'bold',
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modelDescription: {
      fontSize: 12,
      marginVertical: 4,
      color: theme.colors.onSurfaceVariant,
    },
    hfButton: {
      margin: 0,
      padding: 0,
      zIndex: 2,
    },
    overlayButtons: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 8,
    },
    downloadButton: {
      width: '100%',
      borderRadius: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      marginHorizontal: 0,
    },
    removeButton: {
      width: '100%',
      borderRadius: 8,
      marginHorizontal: 0,
    },
    storageErrorText: {
      fontWeight: 'bold',
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      width: 100,
    },
    divider: {
      marginTop: 8,
    },
    sheetScrollViewContainer: {
      padding: 16,
    },
    visionToggleContainer: {
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
    visionToggle: {
      marginVertical: 4,
    },
    warningContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 0,
      marginTop: 8,
    },
    warningContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    warningIcon: {
      marginLeft: 0,
      marginRight: 2,
    },
    warningText: {
      color: theme.colors.error,
      fontSize: 12,
      flex: 1,
      flexWrap: 'wrap',
    },
    settingsChevron: {
      margin: 0,
      marginLeft: -12,
    },
    downloadSpeed: {
      textAlign: 'right',
      fontSize: 12,
      marginTop: 5,
    },
  });
