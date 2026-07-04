import React, { useState, useContext } from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Divider, IconButton } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import { useTheme } from '../../hooks';
import { createStyles } from './styles';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  PencilLineIcon,
  TrashIcon,
  AlertIcon,
  ShareIcon,
} from '../../assets/icons';
import { AssistantAiSheet } from '../../components/AisSheets'; // Only Assistant sheet remains
import { aiStore, Ai } from '../../store/AiStore';
import { modelStore } from '../../store/ModelStore';
import { L10nContext } from '../../utils';
import { exportAi } from '../../utils/exportUtils';

const AiDetails = ({ ai }: { ai: Ai }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const l10n = useContext(L10nContext);

  // All non-Assistant types have been removed, so we only handle Assistant
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoColumn}>
        <Text style={theme.fonts.titleMediumLight}>
          {l10n.palsScreen.systemPrompt}
        </Text>
        <Text style={styles.itemDescription}>
          {(ai as any).systemPrompt || 'No system prompt'}
        </Text>
      </View>
    </View>
  );
};

const AiCard = ({ ai, onEdit }: { ai: Ai; onEdit: (ai: Ai) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const l10n = useContext(L10nContext);

  const isDefaultModelMissing =
    ai.defaultModel && !modelStore.isModelAvailable(ai.defaultModel?.id);

  const handleDelete = () => {
    Alert.alert(l10n.palsScreen.deletePal, l10n.palsScreen.deletePalMessage, [
      { text: l10n.common.cancel, style: 'cancel' },
      {
        text: l10n.common.delete,
        onPress: () => aiStore.deleteAi(ai.id),
        style: 'destructive',
      },
    ]);
  };

  const handleExport = async () => {
    await exportAi(ai.id);
  };

  const handleWarningPress = () => {
    Alert.alert(
      l10n.palsScreen.missingModel,
      l10n.palsScreen.missingModelMessage.replace(
        '{{modelName}}',
        ai.defaultModel?.name || '',
      ),
    );
  };

  const renderWarningIcon = () => (
    <AlertIcon stroke={theme.colors.error} width={20} height={20} />
  );

  const renderTrashIcon = () => (
    <TrashIcon stroke={theme.colors.onSurface} width={20} height={20} />
  );

  const renderPencilIcon = () => (
    <PencilLineIcon stroke={theme.colors.onSurface} width={20} height={20} />
  );

  const renderShareIcon = () => (
    <ShareIcon stroke={theme.colors.onSurface} width={20} height={20} />
  );

  return (
    <View style={styles.aiCard}>
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        style={[styles.itemContainer, isExpanded && styles.expandedItem]}>
        <View style={styles.nameContainer}>
          {isDefaultModelMissing && (
            <IconButton
              icon={renderWarningIcon}
              onPress={handleWarningPress}
              style={styles.warningIcon}
            />
          )}
          <Text style={theme.fonts.titleMediumLight}>{ai.name}</Text>
        </View>
        <View style={styles.itemRight}>
          <IconButton icon={renderShareIcon} onPress={handleExport} style={styles.iconBtn} />
          <IconButton icon={renderTrashIcon} onPress={handleDelete} style={styles.iconBtn} />
          <IconButton icon={renderPencilIcon} onPress={() => onEdit(ai)} style={styles.iconBtn} />
          {isExpanded ? (
            <ChevronDownIcon stroke={theme.colors.onSurface} />
          ) : (
            <ChevronRightIcon stroke={theme.colors.onSurface} />
          )}
        </View>
      </Pressable>

      {isExpanded && <AiDetails ai={ai} />}
    </View>
  );
};

export const AisScreen: React.FC = observer(() => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = createStyles(theme, insets);
  const l10n = useContext(L10nContext);

  const [showAssistantSheet, setShowAssistantSheet] = useState(false);
  const [editAi, setEditAi] = useState<Ai | undefined>();

  const handleCreateAssistant = () => {
    setEditAi(undefined);
    setShowAssistantSheet(true);
  };

  const handleEditAi = (ai: Ai) => {
    setEditAi(ai);
    setShowAssistantSheet(true);
  };

  // Only Assistant AIs remain in the store after cleanup
  const ais = aiStore.getAis();

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.scrollviewContent}>
      {/* Create Assistant Button Only */}
      <View style={styles.createBtnsContainer}>
        <Pressable style={styles.itemContainer} onPress={handleCreateAssistant}>
          <Text style={theme.fonts.titleMediumLight}>
            {l10n.palsScreen.assistant}
          </Text>
          <PlusIcon stroke={theme.colors.onSurface} />
        </Pressable>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.aiContainer}>
        {ais.map(ai => (
          <AiCard key={ai.id} ai={ai as any} onEdit={handleEditAi} />
        ))}
      </View>

      {/* Only Assistant Sheet */}
      <AssistantAiSheet
        isVisible={showAssistantSheet}
        onClose={() => setShowAssistantSheet(false)}
        editPal={editAi}
      />
    </ScrollView>
  );
});