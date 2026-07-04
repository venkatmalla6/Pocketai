import {useState, useEffect, useCallback} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import voiceService, {SpeechRecognitionResult} from '../services/VoiceService';
export interface UseVoiceInputOptions {
  language?: string;
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
  autoStop?: boolean;
  timeout?: number;
  continuous?: boolean;
}

export interface UseVoiceInputReturn {
  isListening: boolean;
  isSpeaking: boolean;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => Promise<void>;
  recognizedText: string;
  error: string | null;
  isInitialized: boolean;
}

export const useVoiceInput = (options: UseVoiceInputOptions = {}): UseVoiceInputReturn => {
  const {
    language = 'en-US',
    onResult,
    onError,
    autoStop = true,
    timeout = 10000,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

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
      } catch (err) {
        console.error('Voice initialization failed:', err);
        setError('Failed to initialize voice services');
      }
    };

    initializeVoice();

    return () => {
      // Cleanup on unmount
      voiceService.destroy();
    };
  }, [language]);

  // Set up voice service event listeners
  useEffect(() => {
    if (!isInitialized) return;

    const handleSpeechResults = (results: SpeechRecognitionResult[]) => {
      if (results.length > 0) {
        const bestResult = results[0].text;
        setRecognizedText(bestResult);
        onResult?.(bestResult);
        
        if (autoStop) {
          stopListening();
        }
      }
    };

    const handleSpeechStart = () => {
      setIsListening(true);
      setError(null);
    };

    const handleSpeechEnd = () => {
      setIsListening(false);
    };

    const handleSpeechError = (errorMsg: any) => {
      setIsListening(false);
      const errorText = typeof errorMsg === 'string' ? errorMsg : 'Speech recognition error';
      setError(errorText);
      onError?.(errorText);
    };

    const handleTtsStart = () => {
      setIsSpeaking(true);
    };

    const handleTtsFinish = () => {
      setIsSpeaking(false);
    };

    const handleTtsCancel = () => {
      setIsSpeaking(false);
    };

    // Register event listeners
    voiceService.setOnSpeechResults(handleSpeechResults);
    voiceService.setOnSpeechStart(handleSpeechStart);
    voiceService.setOnSpeechEnd(handleSpeechEnd);
    voiceService.setOnSpeechError(handleSpeechError);
    voiceService.setOnTtsStart(handleTtsStart);
    voiceService.setOnTtsFinish(handleTtsFinish);
    voiceService.setOnTtsCancel(handleTtsCancel);

    return () => {
      // Clear event listeners
      voiceService.setOnSpeechResults(() => {});
      voiceService.setOnSpeechStart(() => {});
      voiceService.setOnSpeechEnd(() => {});
      voiceService.setOnSpeechError(() => {});
      voiceService.setOnTtsStart(() => {});
      voiceService.setOnTtsFinish(() => {});
      voiceService.setOnTtsCancel(() => {});
    };
  }, [isInitialized, onResult, onError, autoStop]);

  // Auto-stop timeout
  useEffect(() => {
    if (!isListening || !timeout) return;

    const timeoutId = setTimeout(() => {
      if (isListening) {
        stopListening();
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [isListening, timeout]);

  const requestMicrophonePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'PocketPal needs access to your microphone for voice input.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Permission request failed:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  const startListening = useCallback(async () => {
    if (!isInitialized) {
      setError('Voice service not initialized');
      return;
    }

    if (isListening) {
      console.log('Already listening');
      return;
    }

    try {
      // Request microphone permission
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        setError('Microphone permission denied');
        Alert.alert(
          'Permission Required',
          'Please grant microphone permission to use voice input.',
        );
        return;
      }

      // Stop any ongoing speech
      if (isSpeaking) {
        await voiceService.stopSpeaking();
      }

      // Clear previous results and errors
      setRecognizedText('');
      setError(null);

      // Start listening
      await voiceService.startListening();
    } catch (err) {
      console.error('Failed to start listening:', err);
      setError('Failed to start voice recognition');
      setIsListening(false);
    }
  }, [isInitialized, isListening, isSpeaking]);

  const stopListening = useCallback(async () => {
    if (!isListening) return;

    try {
      await voiceService.stopListening();
    } catch (err) {
      console.error('Failed to stop listening:', err);
    }
  }, [isListening]);

  const speak = useCallback(async (text: string) => {
    if (!isInitialized) {
      setError('Voice service not initialized');
      return;
    }

    if (!text.trim()) {
      console.log('No text to speak');
      return;
    }

    try {
      // Stop listening if active
      if (isListening) {
        await voiceService.stopListening();
      }

      await voiceService.speak(text);
    } catch (err) {
      console.error('Failed to speak:', err);
      setError('Failed to speak text');
    }
  }, [isInitialized, isListening]);

  const stopSpeaking = useCallback(async () => {
    if (!isSpeaking) return;

    try {
      await voiceService.stopSpeaking();
    } catch (err) {
      console.error('Failed to stop speaking:', err);
    }
  }, [isSpeaking]);

  return {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    recognizedText,
    error,
    isInitialized,
  };
};
