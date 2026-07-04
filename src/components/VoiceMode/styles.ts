import {StyleSheet, Dimensions} from 'react-native';
import {Theme} from '../../utils/types';

const {width, height} = Dimensions.get('window');

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      paddingTop: 40,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      margin: 0,
      marginRight: 8,
    },
    title: {
      color: theme.colors.onSurface,
      fontWeight: '600',
    },
    closeButton: {
      margin: 0,
    },
    selectionRow: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 12,
    },
    selectionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceVariant,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    selectionButtonDisabled: {
      opacity: 0.5,
    },
    selectionButtonText: {
      marginLeft: 8,
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
      flex: 1,
    },
    voiceInterface: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
    },
    waveContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wave: {
      position: 'absolute',
      borderRadius: 100,
      borderWidth: 2,
    },
    wave1: {
      width: 120,
      height: 120,
      borderColor: theme.colors.primary + '40',
    },
    wave2: {
      width: 160,
      height: 160,
      borderColor: theme.colors.primary + '30',
    },
    wave3: {
      width: 200,
      height: 200,
      borderColor: theme.colors.primary + '20',
    },
    voiceButton: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      marginBottom: 15,
    },
    statusText: {
      color: theme.colors.onSurface,
      textAlign: 'center',
      marginBottom: -40,
    },
    transcriptContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 20,
      marginBottom: 20,
    },
    transcriptText: {
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      fontStyle: 'italic',
    },
    historyContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      margin: 20,
      borderRadius: 12,
      padding: 16,
      maxHeight: 150,
    },
    historyTitle: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: 12,
      fontWeight: '600',
    },
    historyList: {
      gap: 8,
    },
    historyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
    currentMessageContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      margin: 20,
      borderRadius: 12,
      padding: 16,
      maxHeight: 200,
    },
    currentMessageTitle: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: 12,
      fontWeight: '600',
    },
    currentMessageScrollView: {
      maxHeight: 150,
    },
    currentMessageContent: {
      flexGrow: 1,
    },
    currentMessageItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
    currentMessageText: {
      flex: 1,
      color: theme.colors.onSurface,
      lineHeight: 20,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: theme.colors.primaryContainer,
    },
    aiMessage: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.secondaryContainer,
    },
    messageIcon: {
      marginRight: 8,
    },
    messageText: {
      flex: 1,
      color: theme.colors.onSurface,
    },
    controls: {
      padding: 20,
      paddingBottom: 40,
    },
    controlButton: {
      marginVertical: 8,
    },
  });
