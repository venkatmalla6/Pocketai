import React, {useState, useCallback, useContext, useEffect, useRef} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {observer} from 'mobx-react';
import {ChatView, EmbeddedVideoView} from '../../components';
import {L10nContext, UserContext} from '../../utils';
import {modelStore, aiStore} from '../../store';
import {voiceService} from '../../services';
import 'react-native-get-random-values';
import {user as defaultUser} from '../../utils/chat';
import {AiType} from '../../components/AisSheets/types';
import {PalType} from '../../components/PalsSheets/types';
import {VideoAi} from '../../store/AiStore';

export const VideoAiScreen = observer(() => {
  const l10n = useContext(L10nContext);

  const contextUser = useContext(UserContext);
  const user = contextUser || defaultUser;

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [responseText, setResponseText] = useState('');
  const responseTextRef = useRef(responseText);
  responseTextRef.current = responseText;
  const [promptText, setPromptText] = useState('What do you see?');
  const [captureInterval, setCaptureInterval] = useState(1000); // Default to 1 second
  const [lastAnalysisTime, setLastAnalysisTime] = useState(0);
  const [isStoppingCamera, setIsStoppingCamera] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true); // TTS enabled by default for vision mode

  // Get the active VideoAi to access its captureInterval setting
  const activeVideoAi = React.useMemo(() => {
    if (aiStore.ais.length > 0) {
      const videoAi = aiStore.ais.find(p => p.aiType === AiType.VIDEO) as
        | VideoAi
        | undefined;

      if (videoAi) {
        return videoAi;
      }
    }
    return undefined;
  }, []);

  // Initialize captureInterval from the active VideoAi
  useEffect(() => {
    if (activeVideoAi?.captureInterval) {
      setCaptureInterval(activeVideoAi.captureInterval);
    }
  }, [activeVideoAi]);

  // Initialize the model with the projection model if needed
  useEffect(() => {
    if (
      activeVideoAi &&
      modelStore.activeModel &&
      !modelStore.context &&
      !modelStore.isContextLoading
    ) {
      // Initialize the model when the screen loads
      modelStore.setActiveModel(modelStore.activeModel.id);
    }
  }, [activeVideoAi]);

  // Initialize TTS and set up event handlers
  useEffect(() => {
    const initializeTts = async () => {
      try {
        // Check if already initialized to avoid delays
        const isInitialized = await voiceService.isTtsInitialized();
        if (!isInitialized) {
          await voiceService.initialize();
        }
        
        // Set up TTS event handlers only once
        voiceService.setOnTtsStart(() => {
          console.log('Vision mode TTS started');
        });
        
        voiceService.setOnTtsFinish(() => {
          console.log('Vision mode TTS finished');
        });
        
        voiceService.setOnTtsCancel(() => {
          console.log('Vision mode TTS cancelled');
        });
      } catch (error) {
        console.error('Failed to initialize TTS for vision mode:', error);
        setIsTtsEnabled(false);
      }
    };

    initializeTts();
  }, []);

  // Initialize the model with the projection model if needed
  useEffect(() => {
    if (
      activeVideoAi &&
      !modelStore.activeModel &&
      activeVideoAi.defaultModel
    ) {
      const aiDefaultModel = modelStore.availableModels.find(
        m => m.id === activeVideoAi.defaultModel?.id,
      );

      if (aiDefaultModel) {
        console.log('Initializing Video Ai model with projection model');

        // Check if this model supports multimodal and has a default projection model
        if (
          aiDefaultModel.supportsMultimodal &&
          aiDefaultModel.defaultProjectionModel
        ) {
          // Find the default projection model
          const projectionModel = modelStore.availableModels.find(
            m => m.id === aiDefaultModel.defaultProjectionModel,
          );

          if (projectionModel) {
            console.log(
              'Found default projection model:',
              projectionModel.name,
            );
            // Get the projection model path
            modelStore
              .getModelFullPath(projectionModel)
              .then(projectionModelPath => {
                console.log(
                  'Initializing with projection model path:',
                  projectionModelPath,
                );
                // Initialize with both the main model and projection model
                modelStore.initContext(aiDefaultModel, projectionModelPath);
              })
              .catch(error => {
                console.error('Failed to get projection model path:', error);
                // Fall back to initializing without projection model
                modelStore.initContext(aiDefaultModel);
              });
          } else {
            console.warn(
              'Default projection model not found, initializing without it',
            );
            modelStore.initContext(aiDefaultModel);
          }
        } else {
          console.log(
            'Model does not support multimodal or has no default projection model',
          );
          modelStore.initContext(aiDefaultModel);

        }
      }
    }
  }, [activeVideoAi]);

  // Handle starting the camera
  const handleStartCamera = useCallback(async () => {
    if (!modelStore.context) {
      Alert.alert(l10n.chat.modelNotLoaded, l10n.chat.pleaseLoadModel, [
        {
          text: l10n.common.ok,
        },
      ]);
      return;
    }

    // Check if multimodal is enabled
    try {
      const isEnabled = await modelStore.isMultimodalEnabled();
      if (!isEnabled) {
        Alert.alert(
          'Multimodal Not Enabled',
          'This model does not support image analysis. Please load a multimodal model.',
          [
            {
              text: l10n.common.ok,
            },
          ],
        );
        return;
      }

      setIsCameraActive(true);
    } catch (error) {
      console.error('Error checking multimodal capability:', error);
      Alert.alert('Error', 'Failed to check if model supports images.', [
        {
          text: l10n.common.ok,
        },
      ]);
    }
  }, [l10n]);

  // Handle stopping the camera
  const handleStopCamera = useCallback(async () => {
    // Stop any ongoing completion first
    if (modelStore.inferencing || modelStore.isStreaming) {
      try {
        await modelStore.context?.stopCompletion();
      } catch (error) {
        console.error('Error stopping completion:', error);
      }
    }

    // Stop any ongoing TTS
    if (isTtsEnabled) {
      try {
        await voiceService.stopSpeaking();
      } catch (error) {
        console.error('Error stopping TTS:', error);
      }
    }

    // Clear response text and stop camera
    setResponseText('');
    setIsCameraActive(false);
    setIsStoppingCamera(false);
  }, [isTtsEnabled]);

  // Handle capture interval change
  const handleCaptureIntervalChange = useCallback(
    (interval: number) => {
      setCaptureInterval(interval);

      // Update the VideoAi's captureInterval setting
      if (activeVideoAi) {
        aiStore.updateAi(activeVideoAi.id, {
          captureInterval: interval,
        });
      }
    },
    [activeVideoAi],
  );

  // Handle image capture from the video stream
  const handleImageCapture = useCallback(
    async (imageBase64: string) => {
      // Don't process if we're stopping the camera
      if (isStoppingCamera) {
        return;
      }

      // Throttle analysis to avoid overwhelming the model
      const now = Date.now();
      if (now - lastAnalysisTime < captureInterval) {
        return;
      }

      setLastAnalysisTime(now);

      // Clear the previous response text before starting a new analysis
      setResponseText('');

      // Get the system prompt from the active VideoAi
      const systemPrompt = activeVideoAi?.systemPrompt || '';

      try {
        // Start the completion with the base64 image using the user-editable prompt
        await modelStore.startImageCompletion({
          prompt: promptText,
          image_path: imageBase64, // Now passing base64 data URL instead of file path
          systemMessage: systemPrompt,
          onToken: token => {
            // Only update response text if we're not stopping the camera
            if (!isStoppingCamera) {
              setResponseText(prev => prev + token);
            }
          },
          onComplete: async () => {
            // This is called when the entire completion is done
            // Speak the complete response using TTS if enabled
            if (isTtsEnabled && responseTextRef.current.trim()) {
              try {
                // Stop any current TTS before speaking new response
                await voiceService.stopSpeaking();
                // Add a small delay to prevent overlap
                setTimeout(async () => {
                  try {
                    await voiceService.speak(responseTextRef.current.trim());
                  } catch (error) {
                    console.error('TTS failed for vision response:', error);
                  }
                }, 100);
              } catch (error) {
                console.error('TTS failed for vision response:', error);
              }
            }
          },
          onError: error => {
            console.error('Error processing image:', error);
          },
        });
      } catch (error) {
        console.error('Error processing image:', error);
      }
    },
    [
      promptText,
      captureInterval,
      lastAnalysisTime,
      activeVideoAi,
      isStoppingCamera,
      isTtsEnabled,
    ],
  );

  // Render the chat view with embedded camera when active
  return (
    <UserContext.Provider value={user}>
      <View style={styles.container}>
        {isCameraActive ? (
          // Full-screen camera view with response overlay
          <View style={styles.fullScreenContainer}>
            <EmbeddedVideoView
              onCapture={handleImageCapture}
              onClose={handleStopCamera}
              captureInterval={captureInterval}
              onCaptureIntervalChange={handleCaptureIntervalChange}
              responseText={responseText}
            />
          </View>
        ) : (
          // Regular chat view when camera is not active
          <ChatView
            messages={[]}
            onSendPress={() => {}}
            onStopPress={() => modelStore.context?.stopCompletion()}
            user={user}
            isStopVisible={modelStore.inferencing}
            isThinking={modelStore.inferencing && !modelStore.isStreaming}
            isStreaming={modelStore.isStreaming}
            sendButtonVisibilityMode="editing"
            textInputProps={{
              editable: !modelStore.isStreaming && !isCameraActive,
              value: promptText,
              onChangeText: setPromptText,
            }}
            inputProps={{
              palType: PalType.VIDEO,
              isCameraActive: isCameraActive,
              onStartCamera: handleStartCamera,
              promptText: promptText,
              onPromptTextChange: setPromptText,
            }}
          />
        )}
      </View>
    </UserContext.Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});
