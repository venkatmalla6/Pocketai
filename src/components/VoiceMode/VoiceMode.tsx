import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Animated,
  Platform,
  Vibration,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Text,
  IconButton,
  Portal,
  Modal,
  Button,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../hooks';
import {useVoiceInput} from '../../hooks/useVoiceInput';
import voiceService from '../../services/VoiceService';
import {modelStore, chatSessionStore, palStore} from '../../store';
import {MessageType} from '../../utils/types';
import {user, assistant} from '../../utils/chat';
import {convertToChatMessages} from '../../utils/chat';
import {toApiCompletionParams} from '../../utils/completionTypes';
import {toJS} from 'mobx';
import {Sheet} from '../Sheet';
import {ChatPalModelPickerSheet} from '../ChatPalModelPickerSheet';
import {createStyles} from './styles';

export interface VoiceModeProps {
  visible: boolean;
  onDismiss: () => void;
  language?: string;
}

export const VoiceMode: React.FC<VoiceModeProps> = ({
  visible,
  onDismiss,
  language = 'en-US',
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim1 = useRef(new Animated.Value(0.3)).current;
  const waveAnim2 = useRef(new Animated.Value(0.5)).current;
  const waveAnim3 = useRef(new Animated.Value(0.7)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // State
  const [isListeningMode, setIsListeningMode] = useState(false);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isAIResponding, setIsAIResponding] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: 'user' | 'ai';
    text: string;
  }>>([]);
  const [showModelSheet, setShowModelSheet] = useState(false);
  const [showPalSheet, setShowPalSheet] = useState(false);

  // Get active PAL and model info
  const activePalId = chatSessionStore.activePalId;
  const activePal = palStore.pals.find(pal => pal.id === activePalId);
  const hasActiveModel = !!modelStore.activeModelId;
  const activeModel = modelStore.activeModel;

  // Handle voice result
  const handleVoiceResult = (text: string) => {
    console.log('Voice result received:', text);
    setCurrentTranscript(text);
    
    if (text.trim()) {
      // Send to AI for processing
      handleUserMessage(text);
    }
  };

  // Voice input hook
  const {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    recognizedText,
    error,
    isInitialized,
  } = useVoiceInput({
    language: language || 'en-US',
    onResult: handleVoiceResult,
    onError: (errorMsg) => {
      console.error('Voice input error:', errorMsg);
      
      // Show user-friendly error messages
      if (errorMsg.includes('not available')) {
        setCurrentTranscript('Voice recognition not available on this device. Please check your device settings.');
        return;
      }
      
      if (errorMsg.includes('permission')) {
        setCurrentTranscript('Microphone permission required. Please grant permission in settings.');
        return;
      }
      
      // Auto-restart listening after error with delay (only for recoverable errors)
      if (isListeningMode && !errorMsg.includes('not available') && !errorMsg.includes('permission')) {
        setTimeout(() => {
          console.log('Restarting speech recognition after error...');
          startListening().catch(err => {
            console.error('Failed to restart listening:', err);
            setCurrentTranscript('Voice recognition failed. Please try again or restart the app.');
          });
        }, 2000); // Wait 2 seconds before restarting
      }
    },
    continuous: false, // Use single recognition sessions to avoid errors
    autoStop: true, // Auto-stop after recognition
  });

  // Update speaking state from voice service
  useEffect(() => {
    setIsVoiceSpeaking(isSpeaking);
  }, [isSpeaking]);

  // Handle back button
  useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleExit();
      return true;
    });

    return () => backHandler.remove();
  }, [visible]);

  // Entrance animation
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  // Listening animation
  useEffect(() => {
    if (isListening) {
      startListeningAnimation();
    } else {
      stopListeningAnimation();
    }
  }, [isListening]);

  // Speaking animation
  useEffect(() => {
    if (isSpeaking) {
      startSpeakingAnimation();
    } else {
      stopSpeakingAnimation();
    }
  }, [isSpeaking]);

  // Auto-load model when voice mode opens
  useEffect(() => {
    if (visible && !modelStore.activeModelId) {
      autoLoadModel();
    }
  }, [visible]);

  // Monitor model loading state
  useEffect(() => {
    setIsModelLoading(modelStore.isContextLoading);
  }, [modelStore.isContextLoading]);

  // Monitor AI streaming state
  useEffect(() => {
    setIsAIResponding(modelStore.isStreaming);
  }, [modelStore.isStreaming]);

  // Set up TTS event listeners
  useEffect(() => {
    if (!visible) return;

    const handleTtsStart = () => {
      setIsVoiceSpeaking(true);
    };

    const handleTtsFinish = () => {
      setIsVoiceSpeaking(false);
      // Resume listening after AI finishes speaking
      if (isListeningMode) {
        setTimeout(() => {
          startListening();
        }, 500);
      }
    };

    voiceService.setOnTtsStart(handleTtsStart);
    voiceService.setOnTtsFinish(handleTtsFinish);

    return () => {
      voiceService.setOnTtsStart(() => {});
      voiceService.setOnTtsFinish(() => {});
    };
  }, [visible, isListeningMode]);

  const startListeningAnimation = () => {
    const createWaveAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 1000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
    };

    Animated.parallel([
      createWaveAnimation(waveAnim1, 0),
      createWaveAnimation(waveAnim2, 200),
      createWaveAnimation(waveAnim3, 400),
      Animated.loop(
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
      ),
    ]).start();
  };

  const stopListeningAnimation = () => {
    waveAnim1.setValue(0.3);
    waveAnim2.setValue(0.5);
    waveAnim3.setValue(0.7);
    pulseAnim.setValue(1);
  };

  const startSpeakingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopSpeakingAnimation = () => {
    pulseAnim.setValue(1);
  };

  const autoLoadModel = async () => {
    try {
      setIsModelLoading(true);
      
      // Get the first available downloaded model
      const downloadedModels = modelStore.displayModels.filter(model => model.isDownloaded);
      
      if (downloadedModels.length > 0) {
        const firstModel = downloadedModels[0];
        console.log('Auto-loading model for voice mode:', firstModel.name);
        await modelStore.setActiveModel(firstModel.id);
      } else {
        console.log('No downloaded models available for voice mode');
        // Could show a message to user about downloading a model first
      }
    } catch (error) {
      console.error('Failed to auto-load model:', error);
    } finally {
      setIsModelLoading(false);
    }
  };

  const handleUserMessage = async (text: string) => {
    setCurrentTranscript('');
    
    // Add to conversation history
    const newMessage = {
      type: 'user' as const,
      text,
      timestamp: new Date(),
    };
    setConversationHistory(prev => [...prev, newMessage]);

    // Stop listening temporarily while AI responds
    if (isListening) {
      stopListening();
    }

    // Send message to AI and get response
    try {
      setIsAIResponding(true);
      
      // Create a message object for the AI
      const messageObj = {
        text: text.trim(),
        type: 'text' as const,
      };

      // Send to chat session store to get AI response
      const response = await sendMessageToAI(messageObj);
      
      if (response) {
        await handleAIResponse(response);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsAIResponding(false);
      
      // Resume listening even if AI fails
      if (isListeningMode) {
        setTimeout(() => {
          startListening();
        }, 500);
      }
    }
  };

  const sendMessageToAI = async (message: any): Promise<string | null> => {
    try {
      // Check if model is loaded
      if (!modelStore.activeModelId || !modelStore.context) {
        console.log('No model loaded, cannot send message to AI');
        return "I need a model to be loaded first. Please load a model and try again.";
      }

      console.log('Processing user message with real AI:', message.text);
      
      return new Promise(async (resolve, reject) => {
        let aiResponseText = '';
        let isStreamEnded = false;
        
        // Set up response timeout
        const timeout = setTimeout(() => {
          if (!isStreamEnded) {
            console.log('AI response timeout');
            resolve("I'm having trouble responding right now. Please try again.");
          }
        }, 30000); // 30 second timeout
        
        // Create a message object for the chat session
        const textMessage: MessageType.Text = {
          author: user,
          createdAt: Date.now(),
          id: Date.now().toString(),
          text: message.text,
          type: 'text',
          metadata: {
            contextId: modelStore.context?.id,
            conversationId: chatSessionStore.activeSessionId || 'voice-mode',
            copyable: true,
          },
        };

        try {
          // Add user message to chat session
          await chatSessionStore.addMessageToCurrentSession(textMessage);
          console.log('User message added to chat session');
          
          // Set up AI response message
          const aiMessage: MessageType.Text = {
            author: assistant,
            createdAt: Date.now() + 1,
            id: (Date.now() + 1).toString(),
            text: '',
            type: 'text',
            metadata: {
              contextId: modelStore.context?.id,
              conversationId: chatSessionStore.activeSessionId || 'voice-mode',
              copyable: true,
            },
          };
          
          // Add empty AI message that will be updated with streaming text
          await chatSessionStore.addMessageToCurrentSession(aiMessage);
          console.log('AI message placeholder added');
          
          // Set model to inferencing state
          modelStore.setInferencing(true);
          modelStore.setIsStreaming(false);
          
          // Prepare completion parameters using the same method as regular chat
          const context = modelStore.context;
          if (!context) {
            throw new Error('No context available');
          }
          
          // Get current session and system prompt
          const activeSession = chatSessionStore.sessions.find(
            s => s.id === chatSessionStore.activeSessionId,
          );
          
          let systemPrompt = '';
          if (activeSession?.activePalId) {
            const pal = palStore.pals.find(p => p.id === activeSession.activePalId);
            if (pal?.systemPrompt) {
              systemPrompt = pal.systemPrompt;
            }
          }
          
          const getSystemMessage = () => {
            if (
              !systemPrompt &&
              !modelStore.activeModel?.chatTemplate?.systemPrompt?.trim()
            ) {
              return [];
            }
            
            // Prefer custom system prompt, fall back to template's system prompt
            const baseSystemPrompt =
              systemPrompt ||
              modelStore.activeModel?.chatTemplate?.systemPrompt ||
              '';

            const finalSystemPrompt = baseSystemPrompt.trim();
              
            if (finalSystemPrompt?.trim() === '') {
              return [];
            }
            return [
              {
                role: 'system' as 'system',
                content: finalSystemPrompt,
              },
            ];
          };
          
          // Get session completion settings and stop words
          const sessionCompletionSettings = toJS(activeSession?.completionSettings);
          const stopWords = toJS(modelStore.activeModel?.stopWords);
          
          // Get current messages for context
          const currentMessages = toJS(chatSessionStore.currentSessionMessages);
          
          // Convert chat messages to proper format
          const chatMessages = convertToChatMessages(
            currentMessages.filter(msg => msg.type !== 'image'),
            false // isMultimodalEnabled
          );
          
          // Create user message content
          const userMessageContent = [
            {
              type: 'text',
              text: message.text,
            },
          ];
          
          // Create the messages array
          const messages = [
            ...getSystemMessage(),
            ...chatMessages,
            {
              role: 'user',
              content: userMessageContent,
            },
          ];
          
          // Create completion params with app-specific properties
          const completionParamsWithAppProps = {
            ...sessionCompletionSettings,
            messages,
            stop: stopWords,
          };
          
          // Strip app-specific properties before passing to llama.rn
          const cleanCompletionParams = toApiCompletionParams(completionParamsWithAppProps);
          
          console.log('Voice mode completion params:', cleanCompletionParams);
          
          // Start AI completion
          context.completion(cleanCompletionParams, (data: any) => {
            if (data.token) {
              // Capture time to first token
              if (!modelStore.isStreaming) {
                modelStore.setIsStreaming(true);
              }
              
              // Accumulate response text
              aiResponseText += data.token;
              
              // Update the AI message in real-time
              chatSessionStore.updateMessage(aiMessage.id, chatSessionStore.activeSessionId || 'voice-mode', {
                text: aiResponseText,
              });
            }
          }).then((result: any) => {
            clearTimeout(timeout);
            isStreamEnded = true;
            
            console.log('AI completion finished:', aiResponseText);
            
            // Reset model state
            modelStore.setInferencing(false);
            modelStore.setIsStreaming(false);
            
            // Return the complete response
            resolve(aiResponseText.trim() || "I'm not sure how to respond to that.");
            
          }).catch((error: any) => {
            clearTimeout(timeout);
            console.error('AI completion error:', error);
            
            // Reset model state
            modelStore.setInferencing(false);
            modelStore.setIsStreaming(false);
            
            resolve("I'm having trouble processing your message. Please try again.");
          });
          
        } catch (error) {
          clearTimeout(timeout);
          console.error('Error setting up AI completion:', error);
          
          // Reset model state
          modelStore.setInferencing(false);
          modelStore.setIsStreaming(false);
          
          resolve("I'm having trouble processing your message. Please try again.");
        }
      });
    } catch (error) {
      console.error('Error in sendMessageToAI:', error);
      return "I'm experiencing technical difficulties. Please try again.";
    }
  };

  const handleAIResponse = async (response: string) => {
    // Add AI response to conversation history
    const aiMessage = {
      type: 'ai' as const,
      text: response,
      timestamp: new Date(),
    };
    setConversationHistory(prev => [...prev, aiMessage]);

    // Speak the AI response
    try {
      await voiceService.speak(response);
    } catch (error) {
      console.error('TTS error:', error);
      // Resume listening even if TTS fails
      if (isListeningMode) {
        setTimeout(() => {
          startListening();
        }, 500);
      }
    }
  };

  const toggleListeningMode = async () => {
    if (Platform.OS === 'android') {
      Vibration.vibrate(50);
    }

    if (isListeningMode) {
      // Stop listening mode
      setIsListeningMode(false);
      if (isListening) {
        await stopListening();
      }
      if (isSpeaking) {
        await voiceService.stopSpeaking();
      }
    } else {
      // Check if model is loaded first
      if (!modelStore.activeModelId) {
        console.log('No model loaded for voice mode');
        return;
      }
      
      // Start listening mode
      setIsListeningMode(true);
      try {
        await startListening();
      } catch (error) {
        console.error('Failed to start listening:', error);
        setIsListeningMode(false);
        
        // Try again after a short delay
        setTimeout(async () => {
          if (isListeningMode) {
            try {
              console.log('Retrying voice recognition...');
              await startListening();
            } catch (retryError) {
              console.error('Retry failed:', retryError);
            }
          }
        }, 1000);
      }
    }
  };

  const handleStopAIResponse = async () => {
    try {
      console.log('Stopping AI response...');
      
      // Stop model inference if running
      if (modelStore.isStreaming || modelStore.inferencing) {
        // Stop the model completion
        if (modelStore.context && modelStore.context.stopCompletion) {
          await modelStore.context.stopCompletion();
        }
        
        // Reset model states
        modelStore.setInferencing(false);
        modelStore.setIsStreaming(false);
        chatSessionStore.setIsGenerating(false);
      }
      
      // Stop TTS if speaking
      if (isVoiceSpeaking) {
        await voiceService.stopSpeaking();
        setIsVoiceSpeaking(false);
      }
      
      // Reset AI responding state
      setIsAIResponding(false);
      
      // Resume listening if we were in listening mode
      if (isListeningMode && !isListening) {
        setTimeout(async () => {
          try {
            await startListening();
          } catch (error) {
            console.error('Failed to resume listening after stopping AI:', error);
          }
        }, 500);
      }
      
      console.log('AI response stopped successfully');
    } catch (error) {
      console.error('Error stopping AI response:', error);
      // Reset states even if stopping fails
      setIsAIResponding(false);
      setIsVoiceSpeaking(false);
      modelStore.setInferencing(false);
      modelStore.setIsStreaming(false);
    }
  };

  const handleExit = async () => {
    // Stop all voice operations
    if (isListening) {
      await stopListening();
    }
    if (isVoiceSpeaking) {
      await voiceService.stopSpeaking();
    }
    
    // Stop AI response if running
    if (isAIResponding || modelStore.isStreaming) {
      await handleStopAIResponse();
    }
    
    setIsListeningMode(false);
    setCurrentTranscript('');
    setConversationHistory([]);
    onDismiss();
  };

  const getStatusText = () => {
    if (isModelLoading) {
      return 'Loading AI model...';
    }
    if (!modelStore.activeModelId) {
      return 'No model loaded';
    }
    if (isVoiceSpeaking) {
      return 'AI is speaking... (tap stop to interrupt)';
    }
    if (isAIResponding || modelStore.isStreaming) {
      return 'AI is thinking... (tap stop to cancel)';
    }
    if (isListening) {
      return 'Listening...';
    }
    if (isListeningMode) {
      return 'Tap to speak';
    }
    return 'Voice mode ready';
  };

  const getStatusIcon = () => {
    if (isVoiceSpeaking) {
      return 'volume-high';
    }
    if (isAIResponding) {
      return 'brain';
    }
    if (isListening) {
      return 'microphone';
    }
    return 'microphone-outline';
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleExit}
        contentContainerStyle={styles.container}
        dismissable={false}
      >
        <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <IconButton
                icon="arrow-left"
                size={24}
                onPress={handleExit}
                style={styles.backButton}
              />
              <Text variant="headlineSmall" style={styles.title}>
                Voice Mode
              </Text>
            </View>
            <IconButton
              icon="close"
              size={24}
              onPress={handleExit}
              style={styles.closeButton}
            />
          </View>

          {/* Model and Assistant Selection Row */}
          <View style={styles.selectionRow}>
            {/* Model Selection */}
            <TouchableOpacity
              style={[
                styles.selectionButton,
                !hasActiveModel && styles.selectionButtonDisabled
              ]}
              onPress={() => setShowModelSheet(true)}
              disabled={!hasActiveModel}
            >
              <Icon
                name="brain"
                size={18}
                color={hasActiveModel ? theme.colors.primary : theme.colors.onSurfaceDisabled}
              />
              <Text
                variant="bodyMedium"
                style={[
                  styles.selectionButtonText,
                  !hasActiveModel && {color: theme.colors.onSurfaceDisabled}
                ]}
                numberOfLines={1}
              >
                {activeModel?.name || 'No Model'}
              </Text>
            </TouchableOpacity>

            {/* PAL Selection */}
            <TouchableOpacity
              style={[
                styles.selectionButton,
                activePal?.color && {
                  backgroundColor: activePal.color[0] + '20',
                  borderColor: activePal.color[0],
                }
              ]}
              onPress={() => setShowPalSheet(true)}
            >
              <Icon
                name="account"
                size={18}
                color={activePal?.color?.[0] || theme.colors.primary}
              />
              <Text
                variant="bodyMedium"
                style={[
                  styles.selectionButtonText,
                  activePal?.color && {color: activePal.color[0]}
                ]}
                numberOfLines={1}
              >
                {activePal?.name || 'Assistant'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Main Voice Interface */}
          <View style={styles.voiceInterface}>
            {/* Animated Voice Waves */}
            <View style={styles.waveContainer}>
              <Animated.View
                style={[
                  styles.wave,
                  styles.wave1,
                  {
                    opacity: waveAnim1,
                    transform: [{scale: waveAnim1}],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.wave,
                  styles.wave2,
                  {
                    opacity: waveAnim2,
                    transform: [{scale: waveAnim2}],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.wave,
                  styles.wave3,
                  {
                    opacity: waveAnim3,
                    transform: [{scale: waveAnim3}],
                  },
                ]}
              />
            </View>

            {/* Voice Button */}
            <TouchableOpacity
              style={[
                styles.voiceButton,
                {
                  backgroundColor: isListening
                    ? (activePal?.color?.[0] || theme.colors.primary)
                    : theme.colors.surface,
                },
                activePal?.color && !isListening && {
                  borderColor: activePal.color[0],
                  borderWidth: 2,
                }
              ]}
              onPress={toggleListeningMode}
              disabled={!isInitialized || isModelLoading}
            >
              <Icon
                name={getStatusIcon()}
                size={40}
                color={
                  isListening
                    ? theme.colors.onPrimary
                    : (activePal?.color?.[0] || theme.colors.onSurface)
                }
              />
            </TouchableOpacity>

            {/* Status Text */}
            <Text variant="bodyLarge" style={styles.statusText}>
              {getStatusText()}
            </Text>

            {/* Current Transcript */}
            {currentTranscript && (
              <View style={styles.transcriptContainer}>
                <Text variant="bodyLarge" style={styles.transcriptText}>
                  "{currentTranscript}"
                </Text>
              </View>
            )}
          </View>

          {/* Current Message Display */}
          {conversationHistory.length > 0 && (
            <View style={styles.currentMessageContainer}>
              <Text variant="titleSmall" style={styles.currentMessageTitle}>
                Current Message
              </Text>
              <ScrollView 
                style={styles.currentMessageScrollView}
                contentContainerStyle={styles.currentMessageContent}
                showsVerticalScrollIndicator={true}
              >
                {(() => {
                  const latestMessage = conversationHistory[conversationHistory.length - 1];
                  return (
                    <View
                      style={[
                        styles.currentMessageItem,
                        latestMessage.type === 'user'
                          ? styles.userMessage
                          : styles.aiMessage,
                      ]}
                    >
                      <Icon
                        name={latestMessage.type === 'user' ? 'account' : 'robot'}
                        size={18}
                        color={
                          latestMessage.type === 'user'
                            ? theme.colors.primary
                            : theme.colors.secondary
                        }
                        style={styles.messageIcon}
                      />
                      <Text
                        variant="bodyMedium"
                        style={styles.currentMessageText}
                      >
                        {latestMessage.text}
                      </Text>
                    </View>
                  );
                })()}
              </ScrollView>
            </View>
          )}

          {/* Controls */}
          <View style={styles.controls}>
            <Button
              mode={isListeningMode ? 'contained' : 'outlined'}
              onPress={toggleListeningMode}
              disabled={isVoiceSpeaking || isAIResponding}
              style={styles.controlButton}
            >
              {isListeningMode ? 'Stop Voice Mode' : 'Start Voice Mode'}
            </Button>
            
            {/* Stop AI Response Button */}
            {(isAIResponding || modelStore.isStreaming) && (
              <Button
                mode="contained"
                onPress={handleStopAIResponse}
                buttonColor={theme.colors.error}
                textColor={theme.colors.onError}
                style={styles.controlButton}
                icon="stop"
              >
                Stop AI Response
              </Button>
            )}
          </View>
        </Animated.View>

        {/* Model and PAL Selection Bottom Sheet */}
        <ChatPalModelPickerSheet
          isVisible={showModelSheet || showPalSheet}
          chatInputHeight={0}
          keyboardHeight={0}
          onClose={() => {
            setShowModelSheet(false);
            setShowPalSheet(false);
          }}
          onModelSelect={(modelId) => {
            setShowModelSheet(false);
          }}
          onPalSelect={(palId) => {
            setShowPalSheet(false);
          }}
        />
      </Modal>
    </Portal>
  );
};
