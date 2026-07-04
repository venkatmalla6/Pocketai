import {View, Animated, Dimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';

import {useTheme} from '../../hooks';

import {styles} from './styles';

import {Theme} from '../../utils/types';

interface LoadingDotProps {
  delay: number;
  theme: Theme;
}

const LoadingDot: React.FC<LoadingDotProps> = ({delay, theme}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -3,
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]);

    Animated.loop(animation).start();
  }, [opacity, scale, translateY, delay]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          backgroundColor: theme.colors.primary,
          opacity,
          transform: [
            {scale},
            {translateY}
          ],
        },
      ]}
    />
  );
};

export const LoadingBubble: React.FC = () => {
  const theme = useTheme();
  const containerScale = useRef(new Animated.Value(0.8)).current;
  const containerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(containerScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(containerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [containerScale, containerOpacity]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceVariant,
          opacity: containerOpacity,
          transform: [{scale: containerScale}],
        },
      ]}>
      <LoadingDot delay={0} theme={theme} />
      <LoadingDot delay={150} theme={theme} />
      <LoadingDot delay={300} theme={theme} />
    </Animated.View>
  );
};
