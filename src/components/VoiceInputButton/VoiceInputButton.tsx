import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  Vibration,
  Platform,
} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../hooks';
import {useVoiceInput} from '../../hooks/useVoiceInput';
import {createStyles} from './styles';

export interface VoiceInputButtonProps {
  onTextRecognized: (text: string) => void;
  disabled?: boolean;
  language?: string;
  size?: number;
  style?: any;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTextRecognized,
  disabled = false,
  language = 'en-US',
  size = 24,
  style,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  
  const [pulseAnim] = useState(new Animated.Value(1));
  const [showListening, setShowListening] = useState(false);

  const {
    isListening,
    startListening,
    stopListening,
    recognizedText,
    error,
    isInitialized,
  } = useVoiceInput({
    language,
    onResult: (text) => {
      onTextRecognized(text);
      setShowListening(false);
    },
    onError: (errorMsg) => {
      console.error('Voice input error:', errorMsg);
      setShowListening(false);
    },
    autoStop: true,
    timeout: 10000, // 10 seconds timeout
  });

  // Pulse animation when listening
  useEffect(() => {
    if (isListening) {
      setShowListening(true);
      
      // Start pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      
      pulseAnimation.start();
      
      return () => {
        pulseAnimation.stop();
        pulseAnim.setValue(1);
      };
    } else {
      setShowListening(false);
      pulseAnim.setValue(1);
    }
  }, [isListening, pulseAnim]);

  // Haptic feedback
  const triggerHapticFeedback = () => {
    if (Platform.OS === 'android') {
      Vibration.vibrate(50);
    }
  };

  const handlePress = async () => {
    if (disabled || !isInitialized) {
      return;
    }

    triggerHapticFeedback();

    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  const getIconName = () => {
    if (isListening) {
      return 'microphone';
    }
    return 'microphone-outline';
  };

  const getIconColor = () => {
    if (disabled || !isInitialized) {
      return theme.colors.onSurfaceDisabled;
    }
    if (isListening) {
      return theme.colors.error; // Red when actively listening
    }
    return theme.colors.primary;
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, style];
    
    if (isListening) {
      return [
        ...baseStyle,
        styles.listeningButton,
        {
          transform: [{scale: pulseAnim}],
        },
      ];
    }
    
    return baseStyle;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={getButtonStyle()}>
        <TouchableOpacity
          onPress={handlePress}
          disabled={disabled || !isInitialized}
          style={styles.touchable}
          activeOpacity={0.7}
        >
          <Icon
            name={getIconName()}
            size={size}
            color={getIconColor()}
          />
        </TouchableOpacity>
      </Animated.View>
      
      {showListening && (
        <View style={styles.listeningIndicator}>
          <Text variant="labelSmall" style={styles.listeningText}>
            Listening...
          </Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorIndicator}>
          <Text variant="labelSmall" style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};
