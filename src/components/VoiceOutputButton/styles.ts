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
      padding: 6,
      borderRadius: 16,
      backgroundColor: 'transparent',
    },
    speakingButton: {
      backgroundColor: theme.colors.primaryContainer,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    touchable: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2,
    },
    speakingIndicator: {
      position: 'absolute',
      top: -22,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
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
    speakingText: {
      color: theme.colors.primary,
      fontWeight: '600',
      fontSize: 9,
    },
  });
