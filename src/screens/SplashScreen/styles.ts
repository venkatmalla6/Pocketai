import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    appLogo: {
      width: 200,
      height: 200,
    },
    bottomContainer: {
      alignItems: 'center',
      paddingBottom: 60,
      width: '100%',
    },
    poweredByContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    poweredByText: {
      fontSize: 16,
      color: theme.colors.onSurface,
      marginBottom: 4,
      fontWeight: '400',
    },
    teamName: {
      fontSize: 20,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    gguLogo: {
      width: 120,
      height: 60,
    },
  });
