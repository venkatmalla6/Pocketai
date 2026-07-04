import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  Vibration,
  Platform,
} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../hooks';
import voiceService from '../../services/VoiceService';
import {createStyles} from './styles';

export interface VoiceOutputButtonProps {
  text: string;
  disabled?: boolean;
  language?: string;
  size?: number;
  style?: any;
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
}

export const VoiceOutputButton: React.FC<VoiceOutputButtonProps> = ({
  text,
  disabled = false,
  language = 'en-US',
  size = 20,
  style,
  onSpeakStart,
  onSpeakEnd,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  // Initialize voice service
  useEffect(() => {
    const initializeVoice = async () => {
      try {
        await voiceService.initialize();
        
        // Update language if different from default
        if (language !== 'en-US') {
          await voiceService.updateSettings({ language });
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Voice output initialization failed:', error);
      }
    };

    initializeVoice();
  }, [language]);

  // Set up voice service event listeners
  useEffect(() => {
    if (!isInitialized) return;

    const handleTtsStart = () => {
      setIsSpeaking(true);
      onSpeakStart?.();
    };

    const handleTtsFinish = () => {
      setIsSpeaking(false);
      onSpeakEnd?.();
    };

    const handleTtsCancel = () => {
      setIsSpeaking(false);
      onSpeakEnd?.();
    };

    // Register event listeners
    voiceService.setOnTtsStart(handleTtsStart);
    voiceService.setOnTtsFinish(handleTtsFinish);
    voiceService.setOnTtsCancel(handleTtsCancel);

    return () => {
      // Clear event listeners
      voiceService.setOnTtsStart(() => {});
      voiceService.setOnTtsFinish(() => {});
      voiceService.setOnTtsCancel(() => {});
    };
  }, [isInitialized, onSpeakStart, onSpeakEnd]);

  // Pulse animation when speaking
  useEffect(() => {
    if (isSpeaking) {
      // Start pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
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
      pulseAnim.setValue(1);
    }
  }, [isSpeaking, pulseAnim]);

  // Haptic feedback
  const triggerHapticFeedback = () => {
    if (Platform.OS === 'android') {
      Vibration.vibrate(30);
    }
  };

  const handlePress = async () => {
    if (disabled || !isInitialized || !text.trim()) {
      return;
    }

    triggerHapticFeedback();

    try {
      if (isSpeaking) {
        await voiceService.stopSpeaking();
      } else {
        await voiceService.speak(text);
      }
    } catch (error) {
      console.error('Voice output error:', error);
    }
  };

  const getIconName = () => {
    if (isSpeaking) {
      return 'volume-high';
    }
    return 'volume-medium';
  };

  const getIconColor = () => {
    if (disabled || !isInitialized || !text.trim()) {
      return theme.colors.onSurfaceDisabled;
    }
    if (isSpeaking) {
      return theme.colors.primary;
    }
    return theme.colors.onSurfaceVariant;
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, style];
    
    if (isSpeaking) {
      return [
        ...baseStyle,
        styles.speakingButton,
        {
          transform: [{scale: pulseAnim}],
        },
      ];
    }
    
    return baseStyle;
  };

  // Don't render if no text
  if (!text.trim()) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={getButtonStyle()}>
        <TouchableOpacity
          onPress={handlePress}
          disabled={disabled || !isInitialized || !text.trim()}
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
      
      {isSpeaking && (
        <View style={styles.speakingIndicator}>
          <Text variant="labelSmall" style={styles.speakingText}>
            Speaking...
          </Text>
        </View>
      )}
    </View>
  );
};
