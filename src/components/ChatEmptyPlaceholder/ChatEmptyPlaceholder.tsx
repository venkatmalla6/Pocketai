import React, {useContext} from 'react';
import {Image, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {observer} from 'mobx-react';

import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {modelStore} from '../../store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {L10nContext} from '../../utils';

interface ChatEmptyPlaceholderProps {
  onSelectModel: () => void;
  bottomComponentHeight: number;
}

export const ChatEmptyPlaceholder = observer(
  ({onSelectModel, bottomComponentHeight}: ChatEmptyPlaceholderProps) => {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<any>>();
    const l10n = useContext(L10nContext);
    const styles = createStyles({theme});

    const hasAvailableModels = modelStore.availableModels.length > 0;
    const hasActiveModel = modelStore.activeModelId !== undefined;

    const getContent = () => {
      if (!hasAvailableModels) {
        return {
          title: l10n.components.chatEmptyPlaceholder.noModelsTitle,
          description: l10n.components.chatEmptyPlaceholder.noModelsDescription,
          buttonText: l10n.components.chatEmptyPlaceholder.noModelsButton,
          onPress: () => {
            navigation.navigate('Models');
          },
        };
      }

      return {
        title: l10n.components.chatEmptyPlaceholder.activateModelTitle,
        description:
          l10n.components.chatEmptyPlaceholder.activateModelDescription,
        buttonText: l10n.components.chatEmptyPlaceholder.activateModelButton,
        onPress: onSelectModel,
      };
    };

    const {title, description, buttonText, onPress} = getContent();

    if (hasActiveModel) {
      return null;
    }
    return (
      <View
        style={[styles.container, {marginBottom: bottomComponentHeight + 100}]}>
        <Image
          source={require('../../assets/pocketai-dark-v2.png')}
          style={[
            styles.logo,
            {
              width: 168, // 50% increase from 112
              height: 168, // 50% increase from 112
              opacity: 0.3, // Reduced opacity
            }
          ]}
          resizeMode="contain"
        />
        
        {/* Download text and button grouped with logo */}
        <View style={styles.downloadContainer}>
          <Text style={styles.downloadText}>
            Download a model to use the app
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Models')}
            style={styles.downloadButton}
          >
            Download Model
          </Button>
        </View>
      </View>
    );
  },
);
