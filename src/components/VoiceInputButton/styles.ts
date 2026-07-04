import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderRadius: 20,
      backgroundColor: 'transparent',
    },
    listeningButton: {
      backgroundColor: theme.colors.errorContainer,
      borderWidth: 2,
      borderColor: theme.colors.error,
    },
    touchable: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    listeningIndicator: {
      position: 'absolute',
      top: -25,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      elevation: 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    listeningText: {
      color: theme.colors.error,
      fontWeight: '600',
      fontSize: 10,
    },
    errorIndicator: {
      position: 'absolute',
      top: -25,
      backgroundColor: theme.colors.errorContainer,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.error,
      elevation: 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    errorText: {
      color: theme.colors.error,
      fontWeight: '600',
      fontSize: 10,
    },
  });
