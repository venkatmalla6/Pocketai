import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {forwardRef, useEffect, useMemo, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Text} from 'react-native-paper';
import {CloseIcon} from '../../assets/icons';
import {useTheme} from '../../hooks';
import {styles} from './styles';
import BottomSheetKeyboardAwareScrollView from './BottomSheetAwareScrollview';
import {Dimensions, TouchableOpacity, View, Animated, Platform, Vibration} from 'react-native';
import {CustomBackdrop} from './CustomBackdrop';
import {Actions} from './Actions';

export interface SheetProps extends Partial<BottomSheetModalProps> {
  children?: React.ReactNode;
  title?: string;
  isVisible?: boolean;
  onClose?: () => void;
  displayFullHeight?: boolean;
}

interface SheetComponent
  extends React.ForwardRefExoticComponent<
    SheetProps & React.RefAttributes<BottomSheetModalMethods>
  > {
  ScrollView: typeof BottomSheetKeyboardAwareScrollView;
  View: typeof BottomSheetView;
  Actions: typeof Actions;
}

export const Sheet = forwardRef(
  (
    {
      children,
      title,
      isVisible,
      displayFullHeight,
      onClose,
      ...props
    }: SheetProps,
    ref: React.Ref<BottomSheetModalMethods>,
  ) => {
    const insets = useSafeAreaInsets();
    const innerRef = useRef<BottomSheetModalMethods>(null);
    
    // Animation values for enhanced interactions
    const headerScale = useRef(new Animated.Value(1)).current;
    const closeButtonRotation = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const [isPresented, setIsPresented] = useState(false);

    const activeRef = useMemo(() => {
      if (ref && 'current' in ref && ref.current) {
        return ref;
      }
      return innerRef;
    }, [ref, innerRef]);

    const theme = useTheme();

    useEffect(() => {
      if (isVisible) {
        activeRef?.current?.present();
        setIsPresented(true);
        
        // Animate title and header when sheet opens
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(headerScale, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        ]).start();
      } else {
        activeRef?.current?.close();
        setIsPresented(false);
        
        // Reset animations
        titleOpacity.setValue(0);
        headerScale.setValue(1);
        closeButtonRotation.setValue(0);
      }
    }, [isVisible, activeRef, titleOpacity, headerScale, closeButtonRotation]);

    const onDismiss = () => {
      // Add haptic feedback
      if (Platform.OS === 'ios') {
        Vibration.vibrate(10);
      } else {
        Vibration.vibrate(30);
      }
      
      activeRef?.current?.close();
      onClose?.();
    };

    const handleClosePress = () => {
      // Animate close button
      Animated.sequence([
        Animated.spring(closeButtonRotation, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        }),
        Animated.spring(closeButtonRotation, {
          toValue: 0,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        })
      ]).start();
      
      onDismiss();
    };

    const snapPoints = useMemo(() => {
      if (displayFullHeight) {
        return [Dimensions.get('screen').height - insets.top - 16];
      }
      return props.snapPoints;
    }, [displayFullHeight, insets, props.snapPoints]);

    return (
      <BottomSheetModal
        ref={activeRef}
        maxDynamicContentSize={
          Dimensions.get('screen').height - insets.top - 16
        }
        enableDynamicSizing={!snapPoints}
        stackBehavior="push"
        backdropComponent={CustomBackdrop}
        keyboardBlurBehavior="restore"
        activeOffsetY={[-1, 1]}
        failOffsetX={[-5, 5]}
        backgroundStyle={{
          backgroundColor: theme.colors.background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: theme.colors.shadow,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 12,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.primary,
          width: 40,
          height: 4,
        }}
        snapPoints={snapPoints}
        onDismiss={onDismiss}
        {...props}>
        <Animated.View 
          style={[
            styles.header,
            {
              transform: [{scale: headerScale}],
            }
          ]}>
          {title && (
            <Animated.View style={{ opacity: titleOpacity }}>
              <Text variant="titleMedium" style={{ fontWeight: '600' }}>
                {title}
              </Text>
            </Animated.View>
          )}
          <Animated.View
            style={{
              transform: [
                {
                  rotate: closeButtonRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '90deg'],
                  })
                }
              ]
            }}>
            <TouchableOpacity
              style={[
                styles.closeBtn,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: 20,
                  padding: 8,
                }
              ]}
              onPress={handleClosePress}
              hitSlop={10}
              activeOpacity={0.7}>
              <CloseIcon stroke={theme.colors.primary} width={16} height={16} />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View style={{ opacity: titleOpacity }}>
          {children}
        </Animated.View>
      </BottomSheetModal>
    );
  },
) as SheetComponent;

Sheet.displayName = 'Sheet';
Sheet.ScrollView = BottomSheetKeyboardAwareScrollView;
Sheet.View = BottomSheetView;
Sheet.Actions = Actions;
