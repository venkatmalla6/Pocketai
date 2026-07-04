import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Text,
  Switch,
  List,
  Divider,
  Button,
  Portal,
  Modal,
} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {useTheme} from '../../hooks';
import voiceService, {VoiceSettings} from '../../services/VoiceService';
import {createStyles} from './styles';

export interface VoiceSettingsSheetProps {
  visible: boolean;
  onDismiss: () => void;
}

const LANGUAGE_OPTIONS = [
  {label: 'English (US)', value: 'en-US'},
  {label: 'English (UK)', value: 'en-GB'},
  {label: 'Hindi', value: 'hi-IN'},
  {label: 'Spanish', value: 'es-ES'},
  {label: 'French', value: 'fr-FR'},
  {label: 'German', value: 'de-DE'},
  {label: 'Italian', value: 'it-IT'},
  {label: 'Portuguese', value: 'pt-BR'},
  {label: 'Russian', value: 'ru-RU'},
  {label: 'Japanese', value: 'ja-JP'},
  {label: 'Korean', value: 'ko-KR'},
  {label: 'Chinese (Simplified)', value: 'zh-CN'},
];

export const VoiceSettingsSheet: React.FC<VoiceSettingsSheetProps> = ({
  visible,
  onDismiss,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [settings, setSettings] = useState<VoiceSettings>({
    language: 'en-US',
    rate: 0.5,
    pitch: 1.0,
    volume: 1.0,
  });
  
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(true);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [autoSpeakResponses, setAutoSpeakResponses] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Load current settings
  useEffect(() => {
    if (visible) {
      const currentSettings = voiceService.getSettings();
      setSettings(currentSettings);
    }
  }, [visible]);

  const handleSettingsUpdate = async (newSettings: Partial<VoiceSettings>) => {
    const updatedSettings = {...settings, ...newSettings};
    setSettings(updatedSettings);
    
    try {
      await voiceService.updateSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update voice settings:', error);
    }
  };

  const testVoice = async () => {
    try {
      await voiceService.speak('This is a test of the text to speech functionality.');
    } catch (error) {
      console.error('Voice test failed:', error);
    }
  };

  const getLanguageLabel = (value: string) => {
    return LANGUAGE_OPTIONS.find(option => option.value === value)?.label || value;
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <ScrollView style={styles.scrollView}>
          <Text variant="headlineSmall" style={styles.title}>
            Voice Settings
          </Text>

          {/* Voice Input Settings */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Voice Input
            </Text>
            
            <List.Item
              title="Enable Voice Input"
              description="Allow voice-to-text input in chat"
              right={() => (
                <Switch
                  value={voiceInputEnabled}
                  onValueChange={setVoiceInputEnabled}
                />
              )}
            />
          </View>

          <Divider style={styles.divider} />

          {/* Voice Output Settings */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Voice Output
            </Text>
            
            <List.Item
              title="Enable Voice Output"
              description="Allow text-to-speech for AI responses"
              right={() => (
                <Switch
                  value={voiceOutputEnabled}
                  onValueChange={setVoiceOutputEnabled}
                />
              )}
            />
            
            <List.Item
              title="Auto-speak Responses"
              description="Automatically read AI responses aloud"
              right={() => (
                <Switch
                  value={autoSpeakResponses}
                  onValueChange={setAutoSpeakResponses}
                  disabled={!voiceOutputEnabled}
                />
              )}
            />
          </View>

          <Divider style={styles.divider} />

          {/* Language Settings */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Language & Voice
            </Text>
            
            <List.Item
              title="Language"
              description={getLanguageLabel(settings.language)}
              onPress={() => setShowLanguageModal(true)}
              right={() => <List.Icon icon="chevron-right" />}
            />
          </View>

          <Divider style={styles.divider} />

          {/* Voice Quality Settings */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Voice Quality
            </Text>
            
            <View style={styles.sliderContainer}>
              <Text variant="bodyMedium">Speech Rate: {settings.rate.toFixed(1)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.1}
                maximumValue={2.0}
                value={settings.rate}
                onValueChange={(value) => handleSettingsUpdate({rate: value})}
                step={0.1}
              />
            </View>
            
            <View style={styles.sliderContainer}>
              <Text variant="bodyMedium">Pitch: {settings.pitch.toFixed(1)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={2.0}
                value={settings.pitch}
                onValueChange={(value) => handleSettingsUpdate({pitch: value})}
                step={0.1}
              />
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* Test Voice */}
          <View style={styles.section}>
            <Button
              mode="outlined"
              onPress={testVoice}
              disabled={!voiceOutputEnabled}
              style={styles.testButton}
            >
              Test Voice
            </Button>
          </View>

          {/* Close Button */}
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={onDismiss}>
              Done
            </Button>
          </View>
        </ScrollView>

        {/* Language Selection Modal */}
        <Portal>
          <Modal
            visible={showLanguageModal}
            onDismiss={() => setShowLanguageModal(false)}
            contentContainerStyle={styles.languageModal}
          >
            <Text variant="titleLarge" style={styles.modalTitle}>
              Select Language
            </Text>
            <ScrollView style={styles.languageList}>
              {LANGUAGE_OPTIONS.map((option) => (
                <List.Item
                  key={option.value}
                  title={option.label}
                  onPress={() => {
                    handleSettingsUpdate({language: option.value});
                    setShowLanguageModal(false);
                  }}
                  right={() => 
                    settings.language === option.value ? (
                      <List.Icon icon="check" />
                    ) : null
                  }
                />
              ))}
            </ScrollView>
          </Modal>
        </Portal>
      </Modal>
    </Portal>
  );
};
