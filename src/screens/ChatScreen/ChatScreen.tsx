import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {Bubble, ChatView, ErrorSnackbar} from '../../components';
import {useChatSession} from '../../hooks';
import {
  modelStore,
  chatSessionStore,
  aiStore,
  uiStore,
} from '../../store';

import {L10nContext} from '../../utils';
import {MessageType} from '../../utils/types';
import {user, assistant} from '../../utils/chat';

import {VideoAiScreen} from './VideoAiScreen';
import {AiType} from '../../components/AisSheets/types';

const renderBubble = ({
  child,
  message,
  nextMessageInGroup,
  scale,
}: {
  child: ReactNode;
  message: MessageType.Any;
  nextMessageInGroup: boolean;
  scale?: any;
}) => (
  <Bubble
    child={child}
    message={message}
    nextMessageInGroup={nextMessageInGroup}
    scale={scale}
  />
);

export const ChatScreen: React.FC = observer(() => {
  const navigation = useNavigation();
  const currentMessageInfo = useRef(null);
  const l10n = useContext(L10nContext);

  const {handleSendPress, handleStopPress, isMultimodalEnabled} =
    useChatSession(currentMessageInfo, user, assistant);

  const [multimodalEnabled, setMultimodalEnabled] = useState(false);

  // Check multimodal support
  useEffect(() => {
    const check = async () => {
      setMultimodalEnabled(await isMultimodalEnabled());
    };
    check();
  }, []);

  // Auto-load downloaded model
  useEffect(() => {
    const autoLoad = async () => {
      if (
        !modelStore.activeModel &&
        !modelStore.loadingModel &&
        !modelStore.isContextLoading
      ) {
        const models = modelStore.displayModels.filter(m => m.isDownloaded);
        if (models.length > 0) {
          await modelStore.setActiveModel(models[0].id);
        }
      }
    };
    autoLoad();
  }, []);

  // If VIDEO AI → show VideoAiScreen
  const isVideoAi =
    aiStore.ais.find(a => a.id === chatSessionStore.activeAiId)?.aiType ===
    AiType.VIDEO;

  if (isVideoAi) {
    return <VideoAiScreen />;
  }

  const isThinking =
    modelStore.inferencing && !modelStore.isStreaming;

  return (
    <View style={{flex: 1}}>
      <ChatView
        renderBubble={renderBubble}
        messages={chatSessionStore.currentSessionMessages}
        onSendPress={handleSendPress}
        onStopPress={handleStopPress}
        user={user}
        isStopVisible={modelStore.inferencing}
        isThinking={isThinking}
        isStreaming={modelStore.isStreaming}
        sendButtonVisibilityMode="always"
        showImageUpload={true}
        isVisionEnabled={multimodalEnabled}
        inputProps={{
          showVoiceInput: true,
          voiceLanguage: 'en-US',
        }}
        textInputProps={{
          editable: !!modelStore.context,
          placeholder: !modelStore.context
            ? modelStore.isContextLoading
              ? l10n.chat.loadingModel
              : l10n.chat.modelNotLoaded
            : l10n.chat.typeYourMessage,
        }}
      />

      {uiStore.chatWarning && (
        <ErrorSnackbar
          error={uiStore.chatWarning}
          onDismiss={() => uiStore.clearChatWarning()}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  // Removed unused styles as ChatEmptyPlaceholder now handles the download UI with logo
});

