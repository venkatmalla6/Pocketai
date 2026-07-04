import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import {Platform} from 'react-native';

export interface VoiceSettings {
  language: string;
  rate: number;
  pitch: number;
  volume: number;
}

export interface SpeechRecognitionResult {
  text: string;
  confidence?: number;
}

class VoiceService {
  private isInitialized = false;
  private isListening = false;
  private isSpeaking = false;
  
  // Default settings
  private settings: VoiceSettings = {
    language: 'en-US',
    rate: 0.5,
    pitch: 1.0,
    volume: 1.0,
  };

  // Event callbacks
  private onSpeechResults?: (results: SpeechRecognitionResult[]) => void;
  private onSpeechStart?: () => void;
  private onSpeechEnd?: () => void;
  private onSpeechError?: (error: any) => void;
  private onTtsStart?: () => void;
  private onTtsFinish?: () => void;
  private onTtsCancel?: () => void;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('Initializing VoiceService...');
      
      // Check if voice services are available
      const isAvailable = await this.checkVoiceAvailability();
      if (!isAvailable) {
        throw new Error('Voice services not available on this device');
      }
      
      // Initialize TTS
      await this.initializeTts();
      
      // Initialize Speech Recognition
      await this.initializeSpeechRecognition();
      
      this.isInitialized = true;
      console.log('VoiceService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize VoiceService:', error);
      throw error;
    }
  }

  private async checkVoiceAvailability(): Promise<boolean> {
    try {
      // Check if TTS is available
      const voices = await Tts.voices();
      console.log('Available TTS voices:', voices.length);
      
      // Check if Speech Recognition is available
      const isRecognitionAvailable = await Voice.isAvailable();
      console.log('Speech Recognition available:', isRecognitionAvailable);
      
      return voices.length > 0 && Boolean(isRecognitionAvailable);
    } catch (error) {
      console.error('Voice availability check failed:', error);
      return false;
    }
  }

  private async initializeTts(): Promise<void> {
    try {
      // Set default language
      await Tts.setDefaultLanguage(this.settings.language);
      
      // Set default speech rate, pitch, and volume
      await Tts.setDefaultRate(this.settings.rate);
      await Tts.setDefaultPitch(this.settings.pitch);
      
      // Set up TTS event listeners
      Tts.addEventListener('tts-start', this.handleTtsStart);
      Tts.addEventListener('tts-finish', this.handleTtsFinish);
      Tts.addEventListener('tts-cancel', this.handleTtsCancel);
      
      console.log('TTS initialized with settings:', this.settings);
    } catch (error) {
      console.error('TTS initialization failed:', error);
      throw error;
    }
  }

  private async initializeSpeechRecognition(): Promise<void> {
    try {
      // Set up Voice event listeners
      Voice.onSpeechStart = this.handleSpeechStart;
      Voice.onSpeechEnd = this.handleSpeechEnd;
      Voice.onSpeechResults = this.handleSpeechResults;
      Voice.onSpeechError = this.handleSpeechError;
      
      console.log('Speech Recognition initialized');
    } catch (error) {
      console.error('Speech Recognition initialization failed:', error);
      throw error;
    }
  }

  // TTS Methods
  async speak(text: string): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Stop any current speech
      if (this.isSpeaking) {
        await this.stopSpeaking();
      }

      console.log('Speaking text:', text.substring(0, 50) + '...');
      await Tts.speak(text);
    } catch (error) {
      console.error('TTS speak failed:', error);
      throw error;
    }
  }

  async stopSpeaking(): Promise<void> {
    try {
      await Tts.stop();
      this.isSpeaking = false;
    } catch (error) {
      console.error('TTS stop failed:', error);
    }
  }

  async pauseSpeaking(): Promise<void> {
    try {
      if (Platform.OS === 'android') {
        // Android doesn't have pause, so we stop instead
        await this.stopSpeaking();
      }
    } catch (error) {
      console.error('TTS pause failed:', error);
    }
  }

  // Speech Recognition Methods
  async startListening(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (this.isListening) {
      console.log('Already listening, stopping first...');
      await this.stopListening();
      // Wait a bit before starting again
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    try {
      // Check if speech recognition is available before starting
      const isAvailable = await Voice.isAvailable();
      if (!isAvailable) {
        throw new Error('Speech recognition not available on this device');
      }

      console.log('Starting speech recognition with language:', this.settings.language);
      
      // Try to start with the specified language, fallback to default if needed
      try {
        await Voice.start(this.settings.language);
      } catch (langError) {
        console.warn('Failed to start with language', this.settings.language, 'trying en-US');
        await Voice.start('en-US');
      }
      
      this.isListening = true;
    } catch (error) {
      console.error('Speech recognition start failed:', error);
      this.isListening = false;
      throw error;
    }
  }

  async stopListening(): Promise<void> {
    try {
      await Voice.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Speech recognition stop failed:', error);
    }
  }

  async cancelListening(): Promise<void> {
    try {
      await Voice.cancel();
      this.isListening = false;
    } catch (error) {
      console.error('Speech recognition cancel failed:', error);
    }
  }

  // Settings Methods
  async updateSettings(newSettings: Partial<VoiceSettings>): Promise<void> {
    this.settings = { ...this.settings, ...newSettings };
    
    try {
      if (newSettings.language) {
        await Tts.setDefaultLanguage(newSettings.language);
      }
      if (newSettings.rate !== undefined) {
        await Tts.setDefaultRate(newSettings.rate);
      }
      if (newSettings.pitch !== undefined) {
        await Tts.setDefaultPitch(newSettings.pitch);
      }
      
      console.log('Voice settings updated:', this.settings);
    } catch (error) {
      console.error('Failed to update voice settings:', error);
    }
  }

  getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  // Status Methods
  getIsListening(): boolean {
    return this.isListening;
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  // Event Handlers
  private handleTtsStart = () => {
    this.isSpeaking = true;
    console.log('TTS started');
    this.onTtsStart?.();
  };

  private handleTtsFinish = () => {
    this.isSpeaking = false;
    console.log('TTS finished');
    this.onTtsFinish?.();
  };

  private handleTtsCancel = () => {
    this.isSpeaking = false;
    console.log('TTS cancelled');
    this.onTtsCancel?.();
  };

  private handleSpeechStart = () => {
    console.log('Speech recognition started');
    this.onSpeechStart?.();
  };

  private handleSpeechEnd = () => {
    this.isListening = false;
    console.log('Speech recognition ended');
    this.onSpeechEnd?.();
  };

  private handleSpeechResults = (event: any) => {
    const results: SpeechRecognitionResult[] = event.value?.map((text: string, index: number) => ({
      text,
      confidence: event.confidence?.[index],
    })) || [];
    
    console.log('Speech recognition results:', results);
    this.onSpeechResults?.(results);
  };

  private handleSpeechError = (event: any) => {
    this.isListening = false;
    console.error('Speech recognition error:', event.error);
    this.onSpeechError?.(event.error);
  };

  // Event Listener Registration
  setOnSpeechResults(callback: (results: SpeechRecognitionResult[]) => void): void {
    this.onSpeechResults = callback;
  }

  setOnSpeechStart(callback: () => void): void {
    this.onSpeechStart = callback;
  }

  setOnSpeechEnd(callback: () => void): void {
    this.onSpeechEnd = callback;
  }

  setOnSpeechError(callback: (error: any) => void): void {
    this.onSpeechError = callback;
  }

  setOnTtsStart(callback: () => void): void {
    this.onTtsStart = callback;
  }

  setOnTtsFinish(callback: () => void): void {
    this.onTtsFinish = callback;
  }

  setOnTtsCancel(callback: () => void): void {
    this.onTtsCancel = callback;
  }

  // Cleanup
  async destroy(): Promise<void> {
    try {
      // Stop any ongoing operations
      if (this.isListening) {
        await this.stopListening();
      }
      if (this.isSpeaking) {
        await this.stopSpeaking();
      }

      // Remove TTS listeners
      Tts.removeEventListener('tts-start', this.handleTtsStart);
      Tts.removeEventListener('tts-finish', this.handleTtsFinish);
      Tts.removeEventListener('tts-cancel', this.handleTtsCancel);

      // Clean up Voice listeners
      Voice.destroy();

      this.isInitialized = false;
      console.log('VoiceService destroyed');
    } catch (error) {
      console.error('VoiceService destroy failed:', error);
    }
  }

  // Utility Methods
  async getAvailableLanguages(): Promise<string[]> {
    try {
      const voices = await Tts.voices();
      return voices.map(voice => voice.language);
    } catch (error) {
      console.error('Failed to get available languages:', error);
      return ['en-US']; // Fallback
    }
  }

  async checkPermissions(): Promise<boolean> {
    try {
      // For Android, permissions are handled automatically
      // For iOS, you might need additional permission checks
      return true;
    } catch (error) {
      console.error('Permission check failed:', error);
      return false;
    }
  }

  // Check if TTS is initialized
  isTtsInitialized(): boolean {
    return this.isInitialized;
  }
}

// Export singleton instance
export const voiceService = new VoiceService();
export default voiceService;
