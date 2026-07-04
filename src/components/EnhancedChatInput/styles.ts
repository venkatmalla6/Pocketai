import {StyleSheet, Dimensions} from 'react-native';
import {Theme} from '../../utils/types';

interface StylesProps {
  theme: Theme;
}

const {width: screenWidth} = Dimensions.get('window');

export const createStyles = ({theme}: StylesProps) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.background,
    },
    
    // Assistant Indicator Styles
    assistantIndicatorContainer: {
      marginBottom: 8,
    },
    assistantIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    assistantAvatar: {
      marginRight: 8,
    },
    assistantInfo: {
      flex: 1,
      marginRight: 8,
    },
    assistantName: {
      color: theme.colors.onSurface,
      fontWeight: '600',
      marginBottom: 2,
    },
    assistantStatus: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 11,
    },
    
    // Input Container Styles
    inputContainer: {
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 8,
      borderRadius: 24,
      overflow: 'hidden',
    },
    inputGradient: {
      borderRadius: 24,
    },
    inputBorder: {
      borderRadius: 24,
      overflow: 'hidden',
    },
    inputContent: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: 4,
      paddingVertical: 4,
      minHeight: 48,
      backgroundColor: theme.colors.surface,
    },
    
    // Left Actions
    leftActions: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 4,
    },
    plusButtonContainer: {
      marginRight: 8,
    },
    plusButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // Text Input
    textInputContainer: {
      flex: 1,
      position: 'relative',
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    textInput: {
      fontSize: 16,
      lineHeight: 20,
      maxHeight: 120,
      minHeight: 32,
      textAlignVertical: 'center',
      paddingVertical: 0,
    },
    
    // Typing Indicator
    typingIndicator: {
      position: 'absolute',
      right: 16,
      bottom: 12,
    },
    typingDots: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    typingDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginHorizontal: 1,
      opacity: 0.6,
    },
    
    // Right Actions
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 4,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 4,
    },
    
    // Send Button
    sendButtonContainer: {
      marginLeft: 4,
    },
    gradientButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    
    // Selected Images (if needed)
    selectedImagesContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    selectedImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: theme.colors.surfaceVariant,
    },
    removeImageButton: {
      position: 'absolute',
      top: -4,
      right: -4,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.error,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // Thinking Toggle (if needed)
    thinkingToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    thinkingToggleText: {
      marginLeft: 8,
      color: theme.colors.onSurfaceVariant,
    },
  });
