import type {ReactNode} from 'react';
import React, {useContext, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Animated, Platform, Vibration} from 'react-native';

import {Text} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useTheme} from '../../hooks';

import {styles} from './styles';
import {VoiceOutputButton} from '../VoiceOutputButton';

import {UserContext, L10nContext} from '../../utils';
import {MessageType} from '../../utils/types';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const Bubble = ({
  child,
  message,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextMessageInGroup,
  scale = new Animated.Value(1),
}: {
  child: ReactNode;
  message: MessageType.Any;
  nextMessageInGroup: boolean;
  scale?: Animated.Value;
}) => {
  const theme = useTheme();
  const user = useContext(UserContext);
  const l10n = useContext(L10nContext);
  const currentUserIsAuthor = user?.id === message.author.id;
  const {copyable, timings} = message.metadata || {};

  // Animation values for entrance effect
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(currentUserIsAuthor ? 50 : -50)).current;
  const copyButtonScale = useRef(new Animated.Value(1)).current;

  const timingsString = l10n.components.bubble.timingsString
    .replace('{{predictedMs}}', timings?.predicted_per_token_ms?.toFixed())
    .replace(
      '{{predictedPerSecond}}',
      timings?.predicted_per_second?.toFixed(2),
    );

  // Add time to first token if available
  const timeToFirstTokenString =
    timings?.time_to_first_token_ms !== undefined &&
    timings?.time_to_first_token_ms !== null
      ? `, ${timings.time_to_first_token_ms}ms TTFT`
      : '';

  const fullTimingsString = timingsString + timeToFirstTokenString;

  const {contentContainer, dateHeaderContainer, dateHeader, iconContainer} =
    styles({
      currentUserIsAuthor,
      message,
      roundBorder: true,
      theme,
    });

  // Entrance animation effect
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const copyToClipboard = () => {
    if (message.type === 'text') {
      // Enhanced haptic feedback
      if (Platform.OS === 'ios') {
        ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
      } else {
        Vibration.vibrate(50);
      }
      
      // Animate copy button
      Animated.sequence([
        Animated.spring(copyButtonScale, {
          toValue: 0.8,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        }),
        Animated.spring(copyButtonScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        })
      ]).start();
      
      Clipboard.setString(message.text.trim());
    }
  };

  return (
    <Animated.View
      style={[
        contentContainer,
        {
          opacity: fadeAnim,
          transform: [
            {scale},
            {translateX: slideAnim}
          ],
        },
      ]}>
      {child}
      {timings && (
        <Animated.View 
          style={[
            dateHeaderContainer,
            {
              opacity: fadeAnim,
            }
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            {/* Voice Output Button for AI messages */}
            {!currentUserIsAuthor && message.type === 'text' && message.text.trim() && (
              <VoiceOutputButton
                text={message.text}
                size={16}
                style={{marginRight: 4}}
              />
            )}
            
            {copyable && (
              <Animated.View
                style={{
                  transform: [{scale: copyButtonScale}]
                }}>
                <TouchableOpacity 
                  onPress={copyToClipboard}
                  activeOpacity={0.7}>
                  <Icon name="content-copy" style={iconContainer} />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
          {timings && <Text style={dateHeader}>{fullTimingsString}</Text>}
        </Animated.View>
      )}
    </Animated.View>
  );
};
