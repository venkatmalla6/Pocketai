import React, {useRef, useEffect, useContext, useState} from 'react';
import {
  View,
  Animated,
  Dimensions,
  PanGestureHandler,
  State,
  TouchableOpacity,
  ScrollView,
  Vibration,
  Platform,
} from 'react-native';
import {observer} from 'mobx-react';
import {Text, IconButton, Avatar, Chip} from 'react-native-paper';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {modelStore, palStore, chatSessionStore} from '../../store';
import {CustomBackdrop} from '../Sheet/CustomBackdrop';
import {L10nContext} from '../../utils';
import {
  CloseIcon,
  AtomIcon,
  ChevronRightIcon,
  StarIcon,
  RobotIcon,
} from '../../assets/icons';
import {PalType} from '../PalsSheets/types';

interface InteractiveChatModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAssistantSelect?: (palId: string | undefined) => void;
  onModelSelect?: (modelId: string) => void;
}

interface AssistantCardProps {
  pal: any;
  isActive: boolean;
  onSelect: () => void;
  theme: any;
  styles: any;
}

const AssistantCard = observer(({pal, isActive, onSelect, theme, styles}: AssistantCardProps) => {
  const cardScale = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      // Animate glow effect for active assistant
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      glowAnimation.setValue(0);
    }
  }, [isActive]);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(cardScale, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(cardOpacity, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(cardScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    // Add haptic feedback
    if (Platform.OS === 'ios') {
      Vibration.vibrate(10);
    } else {
      Vibration.vibrate(50);
    }
    onSelect();
  };

  const glowColor = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', `${theme.colors.primary}20`],
  });

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.assistantCard,
          {
            transform: [{scale: cardScale}],
            opacity: cardOpacity,
            backgroundColor: isActive ? `${theme.colors.primary}10` : theme.colors.surface,
            borderColor: isActive ? theme.colors.primary : theme.colors.outline,
            shadowColor: glowColor,
          },
        ]}
      >
        <View style={styles.assistantCardHeader}>
          <Avatar.Icon
            size={48}
            icon={pal.type === PalType.ASSISTANT ? AtomIcon : RobotIcon}
            style={[
              styles.assistantAvatar,
              {backgroundColor: isActive ? theme.colors.primary : theme.colors.surfaceVariant}
            ]}
          />
          <View style={styles.assistantInfo}>
            <Text variant="titleMedium" style={styles.assistantName}>
              {pal.name}
            </Text>
            <Text variant="bodySmall" style={styles.assistantType}>
              {pal.type === PalType.ASSISTANT ? 'Assistant' : 'Roleplay'}
            </Text>
          </View>
          {isActive && (
            <Animated.View style={[styles.activeIndicator, {opacity: glowAnimation}]}>
              <StarIcon size={20} color={theme.colors.primary} />
            </Animated.View>
          )}
        </View>
        
        {pal.description && (
          <Text variant="bodySmall" style={styles.assistantDescription} numberOfLines={2}>
            {pal.description}
          </Text>
        )}
        
        <View style={styles.assistantTags}>
          <Chip
            mode="outlined"
            compact
            style={styles.assistantTag}
            textStyle={styles.assistantTagText}
          >
            {pal.defaultModel || 'No Model'}
          </Chip>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
});

export const InteractiveChatModal = observer(({
  isVisible,
  onClose,
  onAssistantSelect,
  onModelSelect,
}: InteractiveChatModalProps) => {
  const theme = useTheme();
  const l10n = useContext(L10nContext);
  const styles = createStyles({theme});
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // Animation values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(50)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  
  // State
  const [selectedSection, setSelectedSection] = useState<'assistants' | 'models'>('assistants');
  
  // Data
  const activePalId = chatSessionStore.activePalId;
  const assistants = palStore.pals;
  const models = modelStore.downloadedModels;
  const activeModel = modelStore.activeModel;

  // Screen dimensions
  const {height: screenHeight} = Dimensions.get('window');
  const snapPoints = React.useMemo(() => ['25%', '50%', '85%'], []);

  useEffect(() => {
    if (isVisible) {
      // Animate in
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(contentTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(contentTranslateY, {
          toValue: 50,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const handleAssistantSelect = (palId: string | undefined) => {
    onAssistantSelect?.(palId);
    onClose();
  };

  const handleModelSelect = (modelId: string) => {
    onModelSelect?.(modelId);
    onClose();
  };

  const renderAssistants = () => (
    <BottomSheetScrollView style={styles.scrollContainer}>
      <View style={styles.sectionHeader}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          AI Assistants
        </Text>
        <Text variant="bodyMedium" style={styles.sectionSubtitle}>
          Choose your AI companion
        </Text>
      </View>
      
      {/* No Assistant Option */}
      <AssistantCard
        pal={{
          id: undefined,
          name: 'No Assistant',
          type: 'none',
          description: 'Use the base model without any assistant personality',
        }}
        isActive={!activePalId}
        onSelect={() => handleAssistantSelect(undefined)}
        theme={theme}
        styles={styles}
      />
      
      {/* Assistant List */}
      {assistants.map((pal) => (
        <AssistantCard
          key={pal.id}
          pal={pal}
          isActive={activePalId === pal.id}
          onSelect={() => handleAssistantSelect(pal.id)}
          theme={theme}
          styles={styles}
        />
      ))}
      
      {assistants.length === 0 && (
        <View style={styles.emptyState}>
          <RobotIcon size={48} color={theme.colors.outline} />
          <Text variant="bodyLarge" style={styles.emptyStateText}>
            No assistants created yet
          </Text>
          <Text variant="bodySmall" style={styles.emptyStateSubtext}>
            Create your first AI assistant to get started
          </Text>
        </View>
      )}
    </BottomSheetScrollView>
  );

  const renderModels = () => (
    <BottomSheetScrollView style={styles.scrollContainer}>
      <View style={styles.sectionHeader}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          AI Models
        </Text>
        <Text variant="bodyMedium" style={styles.sectionSubtitle}>
          Switch between different AI models
        </Text>
      </View>
      
      {models.map((model) => (
        <TouchableOpacity
          key={model.id}
          style={[
            styles.modelCard,
            {
              backgroundColor: activeModel?.id === model.id 
                ? `${theme.colors.primary}10` 
                : theme.colors.surface,
              borderColor: activeModel?.id === model.id 
                ? theme.colors.primary 
                : theme.colors.outline,
            }
          ]}
          onPress={() => handleModelSelect(model.id)}
        >
          <View style={styles.modelCardContent}>
            <Text variant="titleMedium" style={styles.modelName}>
              {model.name}
            </Text>
            <Text variant="bodySmall" style={styles.modelSize}>
              {model.size || 'Unknown size'}
            </Text>
          </View>
          {activeModel?.id === model.id && (
            <StarIcon size={20} color={theme.colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </BottomSheetScrollView>
  );

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={(props) => (
        <CustomBackdrop {...props} opacity={backdropOpacity} />
      )}
      backgroundStyle={[styles.bottomSheetBackground]}
      handleIndicatorStyle={[styles.handleIndicator]}
    >
      <BottomSheetView style={styles.container}>
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: headerOpacity,
              transform: [{translateY: contentTranslateY}],
            }
          ]}
        >
          <View style={styles.headerContent}>
            <Text variant="headlineMedium" style={styles.title}>
              Chat Settings
            </Text>
            <IconButton
              icon={CloseIcon}
              size={24}
              onPress={onClose}
              style={styles.closeButton}
            />
          </View>
          
          {/* Section Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedSection === 'assistants' && styles.activeTab,
              ]}
              onPress={() => setSelectedSection('assistants')}
            >
              <Text
                variant="labelLarge"
                style={[
                  styles.tabText,
                  selectedSection === 'assistants' && styles.activeTabText,
                ]}
              >
                Assistants
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedSection === 'models' && styles.activeTab,
              ]}
              onPress={() => setSelectedSection('models')}
            >
              <Text
                variant="labelLarge"
                style={[
                  styles.tabText,
                  selectedSection === 'models' && styles.activeTabText,
                ]}
              >
                Models
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View 
          style={[
            styles.content,
            {
              transform: [{translateY: contentTranslateY}],
            }
          ]}
        >
          {selectedSection === 'assistants' ? renderAssistants() : renderModels()}
        </Animated.View>
      </BottomSheetView>
    </BottomSheet>
  );
});
