import React, {useRef, useContext, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
  Vibration,
  Keyboard,
} from 'react-native';
import {observer} from 'mobx-react';
import {Text, IconButton, Avatar, Chip} from 'react-native-paper';

import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {chatSessionStore, modelStore, palStore, uiStore} from '../../store';
import {L10nContext, UserContext} from '../../utils';
import {MessageType} from '../../utils/types';
import {
  PlusIcon,
  AtomIcon,
  ChevronUpIcon,
} from '../../assets/icons';
import {InteractiveChatModal} from '../InteractiveChatModal';

interface EnhancedChatInputProps {
  isStreaming?: boolean;
  onSendPress: (message: MessageType.PartialText) => void;
  onStopPress?: () => void;
  isStopVisible?: boolean;
  showImageUpload?: boolean;
  isVisionEnabled?: boolean;
  showThinkingToggle?: boolean;
  isThinkingEnabled?: boolean;
  onThinkingToggle?: (enabled: boolean) => void;
}

export const EnhancedChatInput = observer(({
  isStreaming = false,
  onSendPress,
  onStopPress,
  isStopVisible = false,
  showImageUpload = false,
  isVisionEnabled = false,
  showThinkingToggle = false,
  isThinkingEnabled = false,
  onThinkingToggle,
}: EnhancedChatInputProps) => {
  const theme = useTheme();
  const l10n = useContext(L10nContext);
  const user = useContext(UserContext);
  const styles = createStyles({theme});
  
  // Refs
  const inputRef = useRef<TextInput>(null);
  const containerRef = useRef<View>(null);
  
  // Animation values
  const inputScale = useRef(new Animated.Value(1)).current;
  const inputBorderWidth = useRef(new Animated.Value(1)).current;
  const sendButtonScale = useRef(new Animated.Value(0)).current;
  const sendButtonRotation = useRef(new Animated.Value(0)).current;
  const plusButtonRotation = useRef(new Animated.Value(0)).current;
  const typingIndicatorOpacity = useRef(new Animated.Value(0)).current;
  const assistantIndicatorScale = useRef(new Animated.Value(1)).current;
  const containerElevation = useRef(new Animated.Value(2)).current;
  const gradientAnimation = useRef(new Animated.Value(0)).current;
  
  // State
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  
  // Store data
  const activePalId = chatSessionStore.activePalId;
  const activePal = palStore.pals.find(pal => pal.id === activePalId);
  const activeModel = modelStore.activeModel;
  const hasActiveModel = !!modelStore.activeModelId;
  
  // Screen dimensions
  const {width: screenWidth} = Dimensions.get('window');
  
  // Keyboard listeners
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
    
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);
  
  // Gradient animation loop
  useEffect(() => {
    if (isFocused || isStreaming) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(gradientAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(gradientAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      gradientAnimation.setValue(0);
    }
  }, [isFocused, isStreaming]);
  
  // Send button visibility animation
  useEffect(() => {
    const shouldShowSend = text.trim().length > 0 || selectedImages.length > 0;
    
    Animated.parallel([
      Animated.spring(sendButtonScale, {
        toValue: shouldShowSend ? 1 : 0,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.spring(plusButtonRotation, {
        toValue: shouldShowSend ? 1 : 0,
        useNativeDriver: true,
        tension: 200,
        friction: 8,
      }),
    ]).start();
  }, [text, selectedImages]);
  
  // Assistant indicator animation
  useEffect(() => {
    if (activePal) {
      Animated.loop(
        Animated.sequence([
          Animated.spring(assistantIndicatorScale, {
            toValue: 1.1,
            useNativeDriver: true,
            tension: 100,
            friction: 3,
          }),
          Animated.spring(assistantIndicatorScale, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 3,
          }),
        ])
      ).start();
    }
  }, [activePal]);
  
  const handleFocus = () => {
    setIsFocused(true);
    
    Animated.parallel([
      Animated.spring(inputScale, {
        toValue: 1.02,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(inputBorderWidth, {
        toValue: 2,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(containerElevation, {
        toValue: 8,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    
    Animated.parallel([
      Animated.spring(inputScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(inputBorderWidth, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(containerElevation, {
        toValue: 2,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };
  
  const handleChangeText = (newText: string) => {
    setText(newText);
    
    // Typing indicator animation
    if (newText.length > 0 && !isStreaming) {
      Animated.spring(typingIndicatorOpacity, {
        toValue: 1,
        useNativeDriver: true,
        tension: 200,
        friction: 8,
      }).start();
    } else {
      Animated.spring(typingIndicatorOpacity, {
        toValue: 0,
        useNativeDriver: true,
        tension: 200,
        friction: 8,
      }).start();
    }
  };
  
  const handleSend = () => {
    const trimmedText = text.trim();
    if (trimmedText || selectedImages.length > 0) {
      // Haptic feedback
      if (Platform.OS === 'ios') {
        Vibration.vibrate(10);
      } else {
        Vibration.vibrate(50);
      }
      
      // Send button animation
      Animated.sequence([
        Animated.spring(sendButtonRotation, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 4,
        }),
        Animated.spring(sendButtonRotation, {
          toValue: 0,
          useNativeDriver: true,
          tension: 300,
          friction: 4,
        }),
      ]).start();
      
      onSendPress({
        text: trimmedText,
        type: 'text',
        imageUris: selectedImages.length > 0 ? selectedImages : undefined,
      });
      
      setText('');
      setSelectedImages([]);
    }
  };
  
  const handleStop = () => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(15);
    } else {
      Vibration.vibrate(100);
    }
    onStopPress?.();
  };
  
  const handleAssistantPress = () => {
    setIsModalVisible(true);
  };
  
  const handleAssistantSelect = (palId: string | undefined) => {
    chatSessionStore.setActivePalId(palId);
  };
  
  const handleModelSelect = (modelId: string) => {
    modelStore.loadModel(modelId);
  };
  
  const renderSendButton = () => {
    if (isStopVisible && isStreaming) {
      return (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleStop}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[theme.colors.error, `${theme.colors.error}CC`]}
            style={styles.gradientButton}
          >
            <StopIcon size={20} color={theme.colors.onError} />
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    
    return (
      <Animated.View
        style={[
          styles.sendButtonContainer,
          {
            transform: [
              {scale: sendButtonScale},
              {
                rotate: sendButtonRotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSend}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[theme.colors.primary, `${theme.colors.primary}CC`]}
            style={styles.gradientButton}
          >
            <SendIcon size={20} color={theme.colors.onPrimary} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  const renderPlusButton = () => (
    <Animated.View
      style={[
        styles.plusButtonContainer,
        {
          transform: [
            {
              rotate: plusButtonRotation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '45deg'],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {/* Handle plus button press */}}
        activeOpacity={0.7}
      >
        <PlusIcon size={20} color={theme.colors.onSurfaceVariant} />
      </TouchableOpacity>
    </Animated.View>
  );
  
  const renderAssistantIndicator = () => {
    if (!activePal && !activeModel) return null;
    
    return (
      <TouchableOpacity
        style={styles.assistantIndicatorContainer}
        onPress={handleAssistantPress}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.assistantIndicator,
            {
              transform: [{scale: assistantIndicatorScale}],
            },
          ]}
        >
          {activePal ? (
            <Avatar.Text
              size={32}
              label={activePal.name.charAt(0).toUpperCase()}
              style={[styles.assistantAvatar, {backgroundColor: theme.colors.primary}]}
              labelStyle={{color: theme.colors.onPrimary, fontSize: 14}}
            />
          ) : (
            <Avatar.Icon
              size={32}
              icon={AtomIcon}
              style={[styles.assistantAvatar, {backgroundColor: theme.colors.surfaceVariant}]}
            />
          )}
          <View style={styles.assistantInfo}>
            <Text variant="labelSmall" style={styles.assistantName} numberOfLines={1}>
              {activePal?.name || activeModel?.name || 'No Model'}
            </Text>
            <Text variant="bodySmall" style={styles.assistantStatus} numberOfLines={1}>
              {activePal ? 'Assistant' : 'Base Model'}
            </Text>
          </View>
          <ChevronUpIcon size={16} color={theme.colors.onSurfaceVariant} />
        </Animated.View>
      </TouchableOpacity>
    );
  };
  
  const gradientColors = gradientAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      [theme.colors.surface, theme.colors.surface],
      [`${theme.colors.primary}10`, `${theme.colors.secondary}10`],
    ],
  });
  
  return (
    <View style={styles.container}>
      {/* Assistant Indicator */}
      {renderAssistantIndicator()}
      
      {/* Main Input Container */}
      <Animated.View
        ref={containerRef}
        style={[
          styles.inputContainer,
          {
            transform: [{scale: inputScale}],
            elevation: containerElevation,
            shadowOpacity: containerElevation.interpolate({
              inputRange: [2, 8],
              outputRange: [0.1, 0.2],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={gradientColors._value || [theme.colors.surface, theme.colors.surface]}
          style={styles.inputGradient}
        >
          <Animated.View
            style={[
              styles.inputBorder,
              {
                borderWidth: inputBorderWidth,
                borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
              },
            ]}
          >
            <View style={styles.inputContent}>
              {/* Left Actions */}
              <View style={styles.leftActions}>
                {renderPlusButton()}
              </View>
              
              {/* Text Input */}
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={inputRef}
                  style={[styles.textInput, {color: theme.colors.onSurface}]}
                  placeholder={l10n.components.chatInput.inputPlaceholder}
                  placeholderTextColor={theme.colors.onSurfaceVariant}
                  value={text}
                  onChangeText={handleChangeText}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  multiline
                  maxLength={4000}
                  textAlignVertical="center"
                />
                
                {/* Typing Indicator */}
                <Animated.View
                  style={[
                    styles.typingIndicator,
                    {opacity: typingIndicatorOpacity},
                  ]}
                >
                  <View style={styles.typingDots}>
                    <View style={[styles.typingDot, {backgroundColor: theme.colors.primary}]} />
                    <View style={[styles.typingDot, {backgroundColor: theme.colors.primary}]} />
                    <View style={[styles.typingDot, {backgroundColor: theme.colors.primary}]} />
                  </View>
                </Animated.View>
              </View>
              
              {/* Right Actions */}
              <View style={styles.rightActions}>
                {showImageUpload && isVisionEnabled && (
                  <TouchableOpacity style={styles.actionButton}>
                    <ImageIcon size={20} color={theme.colors.onSurfaceVariant} />
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity style={styles.actionButton}>
                  <MicrophoneIcon size={20} color={theme.colors.onSurfaceVariant} />
                </TouchableOpacity>
                
                {renderSendButton()}
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>
      
      {/* Interactive Modal */}
      <InteractiveChatModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAssistantSelect={handleAssistantSelect}
        onModelSelect={handleModelSelect}
      />
    </View>
  );
});
