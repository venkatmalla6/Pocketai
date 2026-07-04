import {StyleSheet} from 'react-native';
import {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    accordion: {
      borderRadius: 8,
      height: 55,
    },
    accordionTitle: {
      fontSize: 14,
    },
    accordionDescription: {
      fontSize: 12,
      paddingBottom: 10,
    },
    accordionRight: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  });
