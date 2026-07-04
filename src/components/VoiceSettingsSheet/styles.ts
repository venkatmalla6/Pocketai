import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      margin: 20,
      borderRadius: 16,
      maxHeight: '90%',
    },
    scrollView: {
      maxHeight: '100%',
    },
    title: {
      textAlign: 'center',
      marginVertical: 16,
      color: theme.colors.onSurface,
    },
    section: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    sectionTitle: {
      marginBottom: 8,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    divider: {
      marginVertical: 8,
    },
    sliderContainer: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    slider: {
      marginTop: 8,
      height: 40,
    },
    testButton: {
      marginVertical: 8,
    },
    buttonContainer: {
      padding: 16,
      paddingTop: 8,
    },
    languageModal: {
      backgroundColor: theme.colors.surface,
      margin: 40,
      borderRadius: 16,
      maxHeight: '70%',
    },
    modalTitle: {
      textAlign: 'center',
      marginVertical: 16,
      color: theme.colors.onSurface,
    },
    languageList: {
      maxHeight: '80%',
    },
  });
