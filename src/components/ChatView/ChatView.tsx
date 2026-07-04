import * as React from 'react';
import {
  FlatList,
  FlatListProps,
  InteractionManager,
  LayoutAnimation,
  StatusBar,
  StatusBarProps,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
  Vibration,
} from 'react-native';

import dayjs from 'dayjs';
import {observer} from 'mobx-react';
import calendar from 'dayjs/plugin/calendar';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  KeyboardAvoidingView,
  useKeyboardAnimation,
} from 'react-native-keyboard-controller';
import {RefreshControl} from 'react-native';
import {PanGestureHandler, State, Directions} from 'react-native-gesture-handler';

import {
  useComponentSize,
  useKeyboardDimensions,
} from '../KeyboardAccessoryView/hooks';

import {usePrevious, useTheme, useMessageActions} from '../../hooks';

import ImageView from './ImageView';
import {createStyles} from './styles';

import {chatSessionStore, modelStore, palStore} from '../../store';

import {MessageType, User} from '../../utils/types';
import {calculateChatMessages, unwrap, UserContext} from '../../utils';
import {L10nContext} from '../../utils';
import {PalType} from '../PalsSheets/types';

import {
  Message,
  MessageTopLevelProps,
  CircularActivityIndicator,
  ChatInput,
  ChatInputAdditionalProps,
  ChatInputTopLevelProps,
  Menu,
  LoadingBubble,
  ChatPalModelPickerSheet,
  ChatHeader,
  ChatEmptyPlaceholder,
  VideoPalEmptyPlaceholder,
  ContentReportSheet,
} from '..';
import {
  AlertIcon,
  CopyIcon,
  GridIcon,
  PencilLineIcon,
  RefreshIcon,
} from '../../assets/icons';

type MenuItem = {
  label: string;
  onPress?: () => void;
  icon?: () => React.ReactNode;
  disabled: boolean;
  submenu?: SubMenuItem[];
};

type SubMenuItem = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  width?: number;
};

// Untestable
/* istanbul ignore next */
const animate = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

dayjs.extend(calendar);

export type ChatTopLevelProps = ChatInputTopLevelProps & MessageTopLevelProps;

export interface ChatProps extends ChatTopLevelProps {
  /** If {@link ChatProps.dateFormat} and/or {@link ChatProps.timeFormat} is not enough to
   * customize date headers in your case, use this to return an arbitrary
   * string based on a `dateTime` of a particular message. Can be helpful to
   * return "Today" if `dateTime` is today. IMPORTANT: this will replace
   * all default date headers, so you must handle all cases yourself, like
   * for example today, yesterday and before. Or you can just return the same
   * date header for any message. */
  customDateHeaderText?: (dateTime: number) => string;
  /** Custom content to display between the header and chat list */
  customContent?: React.ReactNode;
  /** Allows you to customize the date format. IMPORTANT: only for the date,
   * do not return time here. @see {@link ChatProps.timeFormat} to customize the time format.
   * @see {@link ChatProps.customDateHeaderText} for more customization. */
  dateFormat?: string;
  /** Disable automatic image preview on tap. */
  disableImageGallery?: boolean;
  /** Allows you to change what the user sees when there are no messages.
   * `emptyChatPlaceholder` and `emptyChatPlaceholderTextStyle` are ignored
   * in this case. */
  emptyState?: () => React.ReactNode;
  /** Use this to enable `LayoutAnimation`. Experimental on Android (same as React Native). */
  enableAnimation?: boolean;
  flatListProps?: Partial<FlatListProps<MessageType.DerivedAny[]>>;
  inputProps?: ChatInputAdditionalProps;
  /** Used for pagination (infinite scroll) together with {@link ChatProps.onEndReached}.
   * When true, indicates that there are no more pages to load and
   * pagination will not be triggered. */
  isLastPage?: boolean;
  /** Indicates if the AI is currently streaming tokens */
  isStreaming?: boolean;
  /** Indicates if the AI is currently thinking (processing but not yet streaming) */
  isThinking?: boolean;
  messages: MessageType.Any[];
  /** Used for pagination (infinite scroll). Called when user scrolls
   * to the very end of the list (minus `onEndReachedThreshold`).
   * See {@link ChatProps.flatListProps} to set it up. */
  onEndReached?: () => Promise<void>;
  /** Show user names for received messages. Useful for a group chat. Will be
   * shown only on text messages. */
  showUserNames?: boolean;
  /** Whether to show the image upload button in the chat input */
  showImageUpload?: boolean;
  /** Whether to enable vision mode for the chat input */
  isVisionEnabled?: boolean;
  /**
   * Allows you to customize the time format. IMPORTANT: only for the time,
   * do not return date here. @see {@link ChatProps.dateFormat} to customize the date format.
   * @see {@link ChatProps.customDateHeaderText} for more customization.
   */
  timeFormat?: string;
  user: User;
}

/** Entry component, represents the complete chat */
export const ChatView = observer(
  ({
    customContent,
    customDateHeaderText,
    dateFormat,
    disableImageGallery,
    enableAnimation,
    flatListProps,
    inputProps,
    isLastPage,
    isStopVisible,
    isStreaming = false,
    isThinking = false,
    messages,
    onEndReached,
    onMessageLongPress: externalOnMessageLongPress,
    onMessagePress,
    onPreviewDataFetched,
    onSendPress,
    onStopPress,
    renderBubble,
    renderCustomMessage,
    renderFileMessage,
    renderImageMessage,
    renderTextMessage,
    sendButtonVisibilityMode = 'editing',
    showUserAvatars = false,
    showUserNames = false,
    showImageUpload = false,
    isVisionEnabled = false,
    textInputProps,
    timeFormat,
    usePreviewData = true,
    user,
  }: ChatProps) => {
    const l10n = React.useContext(L10nContext);
    const theme = useTheme();
    const styles = createStyles({theme});

    const [inputText, setInputText] = React.useState('');
    const [inputImages, setInputImages] = React.useState<string[]>([]);
    const [isPickerVisible, setIsPickerVisible] = React.useState(false);

    const animationRef = React.useRef(false);
    const list = React.useRef<FlatList<MessageType.DerivedAny>>(null);
    const insets = useSafeAreaInsets();
    const {progress} = useKeyboardAnimation();
    const headerHeight = useHeaderHeight();
    const activePalId = chatSessionStore.activePalId;
    const activePal = palStore.pals.find(pal => pal.id === activePalId);

    const {onLayout, size} = useComponentSize();
    const {onLayout: onLayoutChatInput, size: chatInputHeight} =
      useComponentSize();

    const bottomComponentHeight = React.useMemo(() => {
      const height = chatInputHeight.height;
      return height;
    }, [chatInputHeight.height]);

    const listPaddingBottom = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [
        bottomComponentHeight,
        bottomComponentHeight - insets.bottom,
      ],
    });

    const {keyboardHeight: keyboardHeight} = useKeyboardDimensions(true);
    const translateY = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        Math.max(0, Math.min(insets.bottom, keyboardHeight - insets.bottom)),
      ],
    });

    const [isImageViewVisible, setIsImageViewVisible] = React.useState(false);
    const [isNextPageLoading, setNextPageLoading] = React.useState(false);
    const [imageViewIndex, setImageViewIndex] = React.useState(0);
    const [stackEntry, setStackEntry] = React.useState<StatusBarProps>({});

    const [showScrollButton, setShowScrollButton] = React.useState(false);
    const scrollButtonScale = React.useRef(new Animated.Value(0)).current;
    const [isUserScrolling, setIsUserScrolling] = React.useState(false);
    const scrollTimeoutRef = React.useRef<NodeJS.Timeout>();
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
      if (activePal) {
        if (!modelStore.activeModel && activePal.defaultModel) {
          const palDefaultModel = modelStore.availableModels.find(
            m => m.id === activePal.defaultModel?.id,
          );

          if (palDefaultModel) {
            // Initialize the model context
            modelStore.initContext(palDefaultModel);
          }
        }
      }
    }, [activePal]);

    const handleScroll = React.useCallback(event => {
      const {contentOffset} = event.nativeEvent;
      const isAtTop = contentOffset.y <= 80;
      const shouldShow = !isAtTop;
      
      setIsUserScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to detect when user stops scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 150);
      
      if (shouldShow !== showScrollButton) {
        setShowScrollButton(shouldShow);
        
        // Animate scroll button appearance
        Animated.spring(scrollButtonScale, {
          toValue: shouldShow ? 1 : 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    }, [showScrollButton, scrollButtonScale]);

    const scrollToBottom = React.useCallback(() => {
      // Add haptic feedback
      if (Platform.OS === 'ios') {
        Vibration.vibrate(10);
      } else {
        Vibration.vibrate(50);
      }
      
      list.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      
      // Animate button scale for feedback
      Animated.sequence([
        Animated.spring(scrollButtonScale, {
          toValue: 0.8,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        }),
        Animated.spring(scrollButtonScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        })
      ]).start();
    }, [scrollButtonScale]);

    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      
      // Add haptic feedback
      if (Platform.OS === 'ios') {
        Vibration.vibrate(10);
      } else {
        Vibration.vibrate(30);
      }
      
      // Simulate refresh action - reload session messages
      try {
        await chatSessionStore.loadSessionList();
        // Add a small delay for better UX
        setTimeout(() => {
          setRefreshing(false);
        }, 500);
      } catch (error) {
        console.error('Error refreshing messages:', error);
        setRefreshing(false);
      }
    }, []);

    const wrappedOnSendPress = React.useCallback(
      async (message: MessageType.PartialText) => {
        if (chatSessionStore.isEditMode) {
          await chatSessionStore.commitEdit();
        }
        onSendPress(message);
        setInputText('');
      },
      [onSendPress],
    );

    const handleCancelEdit = React.useCallback(() => {
      setInputText('');
      setInputImages([]);
      chatSessionStore.exitEditMode();
    }, []);

    const {handleCopy, handleEdit, handleTryAgain, handleTryAgainWith} =
      useMessageActions({
        user,
        messages,
        handleSendPress: wrappedOnSendPress,
        setInputText,
        setInputImages,
      });

    const {chatMessages, gallery} = calculateChatMessages(messages, user, {
      customDateHeaderText,
      dateFormat,
      showUserNames,
      timeFormat,
    });

    const previousChatMessages = usePrevious(chatMessages);

    React.useEffect(() => {
      if (
        chatMessages[0]?.type !== 'dateHeader' &&
        chatMessages[0]?.id !== previousChatMessages?.[0]?.id &&
        chatMessages[0]?.author?.id === user.id
      ) {
        list.current?.scrollToOffset({
          animated: true,
          offset: 0,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatMessages]);

    // Auto-scroll when AI is streaming or when new AI messages arrive
    React.useEffect(() => {
      if (isStreaming && chatMessages.length > 0) {
        // Scroll to bottom when streaming starts
        list.current?.scrollToOffset({
          animated: true,
          offset: 0,
        });
      } else if (
        !isStreaming &&
        previousChatMessages &&
        chatMessages[0]?.id !== previousChatMessages[0]?.id &&
        chatMessages[0]?.type !== 'dateHeader' &&
        chatMessages[0]?.author?.id !== user.id
      ) {
        // Scroll to bottom when AI completes response
        list.current?.scrollToOffset({
          animated: true,
          offset: 0,
        });
      }
    }, [isStreaming, chatMessages, previousChatMessages, user.id]);

    // Untestable
    /* istanbul ignore next */
    if (animationRef.current && enableAnimation) {
      InteractionManager.runAfterInteractions(animate);
    }

    React.useEffect(() => {
      // Untestable
      /* istanbul ignore next */
      if (animationRef.current && enableAnimation) {
        InteractionManager.runAfterInteractions(animate);
      } else {
        animationRef.current = true;
      }
    }, [enableAnimation, messages]);

    const handleEndReached = React.useCallback(
      // Ignoring because `scroll` event for some reason doesn't trigger even basic
      // `onEndReached`, impossible to test.
      // TODO: Verify again later
      /* istanbul ignore next */
      async ({distanceFromEnd}: {distanceFromEnd: number}) => {
        if (
          !onEndReached ||
          isLastPage ||
          distanceFromEnd <= 0 ||
          messages.length === 0 ||
          isNextPageLoading
        ) {
          return;
        }

        setNextPageLoading(true);
        await onEndReached?.();
        setNextPageLoading(false);
      },
      [isLastPage, isNextPageLoading, messages.length, onEndReached],
    );

    const handleImagePress = React.useCallback(
      (message: MessageType.Image) => {
        setImageViewIndex(
          gallery.findIndex(
            image => image.id === message.id && image.uri === message.uri,
          ),
        );
        setIsImageViewVisible(true);
        setStackEntry(
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
          }),
        );
      },
      [gallery],
    );

    const handleMessagePress = React.useCallback(
      (message: MessageType.Any) => {
        if (message.type === 'image' && !disableImageGallery) {
          handleImagePress(message);
        }
        onMessagePress?.(message);
      },
      [disableImageGallery, handleImagePress, onMessagePress],
    );

    // TODO: Tapping on a close button results in the next warning:
    // `An update to ImageViewing inside a test was not wrapped in act(...).`
    /* istanbul ignore next */
    const handleRequestClose = () => {
      setIsImageViewVisible(false);
      StatusBar.popStackEntry(stackEntry);
    };

    const keyExtractor = React.useCallback(
      ({id}: MessageType.DerivedAny) => id,
      [],
    );

    const [menuVisible, setMenuVisible] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({x: 0, y: 0});
    const [selectedMessage, setSelectedMessage] =
      React.useState<MessageType.Any | null>(null);
    const [isReportSheetVisible, setIsReportSheetVisible] =
      React.useState(false);

    const handleMessageLongPress = React.useCallback(
      (message: MessageType.Any, event: any) => {
        if (message.type !== 'text') {
          externalOnMessageLongPress?.(message);
          return;
        }

        const {pageX, pageY} = event.nativeEvent;
        setMenuPosition({x: pageX, y: pageY});
        setSelectedMessage(message);
        setMenuVisible(true);
        externalOnMessageLongPress?.(message);
      },
      [externalOnMessageLongPress],
    );

    const handleMenuDismiss = React.useCallback(() => {
      setMenuVisible(false);
      setSelectedMessage(null);
    }, []);

    const {
      copy: copyLabel,
      regenerate: regenerateLabel,
      regenerateWith: regenerateWithLabel,
      edit: editLabel,
      reportContent: reportContentLabel,
    } = l10n.components.chatView.menuItems;

    const menuItems = React.useMemo((): MenuItem[] => {
      if (!selectedMessage || selectedMessage.type !== 'text') {
        return [];
      }

      const isAuthor = selectedMessage.author.id === user.id;
      const hasActiveModel = modelStore.activeModelId !== undefined;
      const models = modelStore.availableModels || [];

      const baseItems: MenuItem[] = [
        {
          label: copyLabel,
          onPress: () => {
            handleCopy(selectedMessage);
            handleMenuDismiss();
          },
          icon: () => <CopyIcon stroke={theme.colors.primary} />,
          disabled: false,
        },
      ];

      if (!isAuthor) {
        baseItems.push({
          label: regenerateLabel,
          onPress: () => {
            handleTryAgain(selectedMessage);
            handleMenuDismiss();
          },
          icon: () => <RefreshIcon stroke={theme.colors.primary} />,
          disabled: !hasActiveModel,
        });

        baseItems.push({
          label: regenerateWithLabel,
          icon: () => <GridIcon stroke={theme.colors.primary} />,
          disabled: false,
          submenu: models.map(model => ({
            label: model.name,
            width: Math.min(300, size.width),
            onPress: () => {
              handleTryAgainWith(model.id, selectedMessage);
              handleMenuDismiss();
            },
          })),
        });
      }

      if (isAuthor) {
        baseItems.push({
          label: editLabel,
          onPress: () => {
            handleEdit(selectedMessage);
            handleMenuDismiss();
          },
          icon: () => <PencilLineIcon stroke={theme.colors.primary} />,
          disabled: !hasActiveModel,
        });
      }

      baseItems.push({
        label: reportContentLabel,
        onPress: () => {
          setIsReportSheetVisible(true);
          handleMenuDismiss();
        },
        icon: () => <AlertIcon stroke={theme.colors.primary} />,
        disabled: false,
      });

      return baseItems;
    }, [
      selectedMessage,
      user.id,
      handleCopy,
      handleTryAgain,
      handleTryAgainWith,
      handleEdit,
      handleMenuDismiss,
      size.width,
      theme.colors.primary,
      copyLabel,
      regenerateLabel,
      regenerateWithLabel,
      editLabel,
      reportContentLabel,
    ]);

    const renderMenuItem = React.useCallback(
      (item: MenuItem, index: number) => {
        if (item.submenu) {
          return (
            <React.Fragment key={index}>
              <Menu.Item
                label={item.label}
                leadingIcon={item.icon}
                disabled={item.disabled}
                submenu={item.submenu.map(
                  (subItem: SubMenuItem, subIndex: number) => (
                    <React.Fragment key={subIndex}>
                      <Menu.Item
                        key={subIndex}
                        label={subItem.label}
                        onPress={subItem.onPress}
                        disabled={subItem.disabled}
                      />
                    </React.Fragment>
                  ),
                )}
              />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            <Menu.Item
              label={item.label}
              onPress={item.onPress}
              leadingIcon={item.icon}
              disabled={item.disabled}
            />
          </React.Fragment>
        );
      },
      [],
    );

    const handleSwipeGesture = React.useCallback((event: any, message: MessageType.DerivedAny) => {
      const { translationX, state } = event.nativeEvent;
      
      if (state === State.END) {
        if (Math.abs(translationX) > 100) {
          // Add haptic feedback
          if (Platform.OS === 'ios') {
            Vibration.vibrate(10);
          } else {
            Vibration.vibrate(30);
          }
          
          // Handle swipe actions based on direction
          if (translationX > 0) {
            // Swipe right - Reply action
            if (message.type === 'text') {
              handleEdit(message);
            }
          } else {
            // Swipe left - Copy action
            if (message.type === 'text') {
              handleCopy(message);
            }
          }
        }
      }
    }, [handleEdit, handleCopy]);

    const renderMessage = React.useCallback(
      ({item: message}: {item: MessageType.DerivedAny; index: number}) => {
        const messageWidth =
          showUserAvatars &&
          message.type !== 'dateHeader' &&
          message.author?.id !== user.id
            ? Math.floor(Math.min(size.width * 0.9, 900))
            : Math.floor(Math.min(size.width * 0.92, 900));

        const roundBorder =
          message.type !== 'dateHeader' && message.nextMessageInGroup;
        const showAvatar =
          message.type !== 'dateHeader' && !message.nextMessageInGroup;
        const showName = message.type !== 'dateHeader' && message.showName;
        const showStatus = message.type !== 'dateHeader' && message.showStatus;

        const messageContent = (
          <Message
            {...{
              enableAnimation,
              message,
              messageWidth,
              onMessageLongPress: handleMessageLongPress,
              onMessagePress: handleMessagePress,
              onPreviewDataFetched,
              renderBubble,
              renderCustomMessage,
              renderFileMessage,
              renderImageMessage,
              renderTextMessage,
              roundBorder,
              showAvatar,
              showName,
              showStatus,
              showUserAvatars,
              usePreviewData,
            }}
          />
        );

        // Wrap text messages with swipe gesture
        if (message.type === 'text') {
          return (
            <PanGestureHandler
              onGestureEvent={(event) => handleSwipeGesture(event, message)}
              onHandlerStateChange={(event) => handleSwipeGesture(event, message)}
              activeOffsetX={[-10, 10]}
              failOffsetY={[-5, 5]}
              shouldCancelWhenOutside={true}
              enableTrackpadTwoFingerGesture={false}>
              <Animated.View>
                {messageContent}
              </Animated.View>
            </PanGestureHandler>
          );
        }

        return <View>{messageContent}</View>;
      },
      [
        enableAnimation,
        handleMessageLongPress,
        handleMessagePress,
        onPreviewDataFetched,
        renderBubble,
        renderCustomMessage,
        renderFileMessage,
        renderImageMessage,
        renderTextMessage,
        showUserAvatars,
        size.width,
        usePreviewData,
        user.id,
      ],
    );

    const renderListEmptyComponent = React.useCallback(() => {
      // Show VideoPalEmptyPlaceholder for video pal, otherwise show regular ChatEmptyPlaceholder
      if (inputProps?.palType === PalType.VIDEO) {
        return (
          <VideoPalEmptyPlaceholder
            bottomComponentHeight={bottomComponentHeight}
          />
        );
      }

      return (
        <ChatEmptyPlaceholder
          bottomComponentHeight={bottomComponentHeight}
          onSelectModel={() => setIsPickerVisible(true)}
        />
      );
    }, [bottomComponentHeight, setIsPickerVisible, inputProps?.palType]);

    const renderListFooterComponent = React.useCallback(
      () =>
        // Impossible to test, see `handleEndReached` function
        /* istanbul ignore next */
        isNextPageLoading ? (
          <View style={styles.footerLoadingPage}>
            <CircularActivityIndicator color={theme.colors.primary} size={16} />
          </View>
        ) : (
          <View style={styles.footer} />
        ),
      [
        isNextPageLoading,
        styles.footerLoadingPage,
        styles.footer,
        theme.colors.primary,
      ],
    );

    const renderListHeaderComponent = React.useCallback(
      () => (isThinking ? <LoadingBubble /> : null),
      [isThinking],
    );

    const renderChatList = React.useCallback(
      () => (
        <>
          <Animated.FlatList
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={[
              styles.flatListContentContainer,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                justifyContent:
                  chatMessages.length !== 0 ? undefined : 'center',
                paddingTop: listPaddingBottom, // Use animated padding
              },
            ]}
            initialNumToRender={10}
            ListEmptyComponent={renderListEmptyComponent}
            ListFooterComponent={renderListFooterComponent}
            ListHeaderComponent={renderListHeaderComponent}
            maxToRenderPerBatch={6}
            onEndReachedThreshold={0.75}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.primary}
                colors={[theme.colors.primary]}
                progressBackgroundColor={theme.colors.surface}
              />
            }
            {...unwrap(flatListProps)}
            data={chatMessages}
            inverted={chatMessages.length > 0}
            keyboardDismissMode="interactive"
            keyExtractor={keyExtractor}
            onEndReached={handleEndReached}
            ref={list}
            renderItem={renderMessage}
            maintainVisibleContentPosition={{
              autoscrollToTopThreshold: 20,
              minIndexForVisible: isStreaming ? 1 : 0,
            }}
          />
          {showScrollButton && (
            <Animated.View 
              style={{
                transform: [
                  {translateY},
                  {scale: scrollButtonScale}
                ],
                position: 'absolute',
                right: 16,
                bottom: bottomComponentHeight + 70, // Moved up by 50px (was +20)
                zIndex: 1000,
              }}>
              <TouchableOpacity
                style={[
                  styles.scrollToBottomButton,
                  {
                    shadowColor: theme.colors.shadow,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                  }
                ]}
                onPress={scrollToBottom}
                activeOpacity={0.8}>
                <Animated.View style={{
                  transform: [{
                    rotate: isUserScrolling ? '0deg' : '360deg'
                  }]
                }}>
                  <Icon
                    name="chevron-down"
                    size={24}
                    color={theme.colors.onPrimary}
                  />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </>
      ),
      [
        styles.flatListContentContainer,
        styles.flatList,
        styles.scrollToBottomButton,
        chatMessages,
        listPaddingBottom,
        renderListEmptyComponent,
        renderListFooterComponent,
        renderListHeaderComponent,
        handleScroll,
        flatListProps,
        keyExtractor,
        handleEndReached,
        renderMessage,
        isStreaming,
        showScrollButton,
        translateY,
        bottomComponentHeight,
        scrollToBottom,
        theme.colors.onPrimary,
      ],
    );

    const [_selectedModel, setSelectedModel] = React.useState<string | null>(
      null,
    );
    const [_selectedPal, setSelectedPal] = React.useState<string | undefined>();

    const handleModelSelect = React.useCallback((model: string) => {
      setSelectedModel(model);
      setIsPickerVisible(false);
    }, []);

    const handlePalSelect = React.useCallback((pal: string | undefined) => {
      setSelectedPal(pal);
      setIsPickerVisible(false);
    }, []);

    const inputBackgroundColor = activePal?.color?.[1]
      ? activePal.color?.[1]
      : Platform.OS === 'ios'
      ? theme.colors.surface
      : theme.colors.secondaryContainer; // Since on Android, we don't have shadow enabled, use secondaryContainer for better contrast
    // Use surface for Android when new architecture is enabled

    return (
      <UserContext.Provider value={user}>
        <View style={styles.container} onLayout={onLayout}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={headerHeight}
            style={styles.container}>
            <View style={styles.chatContainer}>
              <ChatHeader />
              {customContent}
              {renderChatList()}
              <Animated.View
                onLayout={onLayoutChatInput}
                style={[
                  styles.inputContainer,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    paddingBottom: insets.bottom,
                    transform: [{translateY}],
                    zIndex: 10,
                  },
                  {backgroundColor: inputBackgroundColor},
                ]}>
                <ChatInput
                  {...{
                    ...unwrap(inputProps),
                    isStreaming,
                    onSendPress: wrappedOnSendPress,
                    onStopPress,
                    chatInputHeight,
                    inputBackgroundColor,
                    onCancelEdit: handleCancelEdit,
                    onPalBtnPress: () => setIsPickerVisible(!isPickerVisible),
                    isStopVisible,
                    isPickerVisible,
                    sendButtonVisibilityMode,
                    showImageUpload,
                    isVisionEnabled,
                    defaultImages: inputImages,
                    onDefaultImagesChange: setInputImages,
                    textInputProps: {
                      ...textInputProps,
                      // Only override value and onChangeText if not using promptText
                      ...(!(inputProps?.palType === PalType.VIDEO) && {
                        value: inputText,
                        onChangeText: setInputText,
                      }),
                    },
                  }}
                />
              </Animated.View>
              <ChatPalModelPickerSheet
                isVisible={isPickerVisible}
                onClose={() => setIsPickerVisible(false)}
                onModelSelect={handleModelSelect}
                onPalSelect={handlePalSelect}
                chatInputHeight={chatInputHeight.height}
                keyboardHeight={keyboardHeight}
              />
            </View>
          </KeyboardAvoidingView>
          <ImageView
            imageIndex={imageViewIndex}
            images={gallery}
            onRequestClose={handleRequestClose}
            visible={isImageViewVisible}
          />
          <Menu
            visible={menuVisible}
            onDismiss={handleMenuDismiss}
            selectable={false}
            anchor={menuPosition}>
            {menuItems.map(renderMenuItem)}
          </Menu>
          <ContentReportSheet
            isVisible={isReportSheetVisible}
            onClose={() => setIsReportSheetVisible(false)}
          />
        </View>
      </UserContext.Provider>
    );
  },
);
