import React, {useContext, useEffect, useRef} from 'react';
import {Modal, TextInput, TouchableOpacity, View, Animated, Platform, Vibration} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import {createStyles} from './styles';
import {L10nContext} from '../../utils';
import {chatSessionStore, SessionMetaData} from '../../store';

interface RenameModalProps {
  visible: boolean;
  onClose: () => void;
  session: SessionMetaData | null;
}

export const RenameModal: React.FC<RenameModalProps> = ({
  visible,
  onClose,
  session,
}) => {
  const [newTitle, setNewTitle] = React.useState(session?.title || '');
  const theme = useTheme();
  const styles = createStyles(theme);
  const l10n = useContext(L10nContext);
  
  // Animation values
  const modalScale = useRef(new Animated.Value(0.8)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const inputBorderAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const titleShake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setNewTitle(session?.title || '');
    
    if (visible) {
      // Animate modal entrance
      Animated.parallel([
        Animated.spring(modalScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations
      modalScale.setValue(0.8);
      modalOpacity.setValue(0);
      inputBorderAnim.setValue(0);
    }
  }, [session, visible, modalScale, modalOpacity, inputBorderAnim]);

  const handleRename = async () => {
    if (session?.id && newTitle.trim()) {
      // Add haptic feedback
      if (Platform.OS === 'ios') {
        Vibration.vibrate(10);
      } else {
        Vibration.vibrate(30);
      }
      
      // Animate button press
      Animated.sequence([
        Animated.spring(buttonScale, {
          toValue: 0.9,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        })
      ]).start();
      
      await chatSessionStore.updateSessionTitleBySessionId(
        session?.id,
        newTitle,
      );
      onClose();
    } else {
      // Shake animation for invalid input
      Animated.sequence([
        Animated.timing(titleShake, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(titleShake, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(titleShake, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(titleShake, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Vibrate for error
      if (Platform.OS === 'ios') {
        Vibration.vibrate([0, 50, 50, 50]);
      } else {
        Vibration.vibrate(100);
      }
    }
  };

  const handleClose = () => {
    // Add haptic feedback
    if (Platform.OS === 'ios') {
      Vibration.vibrate(10);
    } else {
      Vibration.vibrate(30);
    }
    
    onClose();
  };

  const handleInputFocus = () => {
    Animated.timing(inputBorderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleInputBlur = () => {
    Animated.timing(inputBorderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
      animationType="none">
      <Animated.View 
        style={[
          styles.modalOverlay,
          {
            opacity: modalOpacity,
          }
        ]}>
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [
                { scale: modalScale },
                { translateX: titleShake }
              ],
              shadowColor: theme.colors.shadow,
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 16,
              borderRadius: 16,
            }
          ]}>
          <Animated.View style={{ transform: [{ translateX: titleShake }] }}>
            <Text style={[styles.modalTitle, { fontWeight: '600', fontSize: 18 }]}>
              {l10n.common.rename}
            </Text>
          </Animated.View>
          
          <Animated.View
            style={[
              {
                borderWidth: 2,
                borderRadius: 12,
                borderColor: inputBorderAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [theme.colors.outline, theme.colors.primary],
                }),
                marginVertical: 16,
              }
            ]}>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderWidth: 0,
                  margin: 0,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }
              ]}
              placeholder="New Title"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={newTitle}
              maxLength={40}
              onChangeText={setNewTitle}
              autoFocus={true}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onSubmitEditing={handleRename}
              returnKeyType="done"
            />
          </Animated.View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.cancelButton,
                {
                  borderRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                }
              ]} 
              onPress={handleClose}
              activeOpacity={0.7}>
              <Text style={[styles.cancelText, { fontWeight: '500' }]}>
                {l10n.common.cancel}
              </Text>
            </TouchableOpacity>
            
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  {
                    borderRadius: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    backgroundColor: newTitle.trim() 
                      ? theme.colors.primary 
                      : theme.colors.surfaceVariant,
                  },
                  !newTitle.trim() && styles.disabledButton,
                ]}
                onPress={handleRename}
                disabled={!newTitle.trim()}
                activeOpacity={0.8}>
                <Text 
                  style={[
                    styles.confirmText, 
                    { 
                      fontWeight: '600',
                      color: newTitle.trim() 
                        ? theme.colors.onPrimary 
                        : theme.colors.onSurfaceVariant,
                    }
                  ]}>
                  {l10n.common.save}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};
