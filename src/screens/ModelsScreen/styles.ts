import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.colors.background,
    },
    listContainer: {
      paddingBottom: 40,
    },
    filterContainer: {
      flexDirection: 'row',
      paddingTop: 4,
      gap: 2,
      justifyContent: 'flex-end',
    },
    filterIcon: {
      borderRadius: 8,
      marginHorizontal: 2,
    },
  });
