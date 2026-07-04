import React from 'react';
import {StyleSheet, View} from 'react-native';

import {List, IconButton} from 'react-native-paper';
import {observer} from 'mobx-react-lite';

import {useTheme} from '../../../hooks';

import {createStyles} from './styles';

import {modelStore} from '../../../store';

interface ModelAccordionProps {
  group: any;
  expanded: boolean;
  onPress: () => void;
  children: React.ReactNode;
  description?: string;
  descriptionStyle?: any;
}

export const ModelAccordion: React.FC<ModelAccordionProps> = observer(
  ({group, expanded, onPress, children, description, descriptionStyle}) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const activeModel = modelStore.activeModel;
    const activeGroup = activeModel && activeModel.type === group.type;

    const accordionStyles = StyleSheet.flatten([
      styles.accordion,
      activeGroup && {
        backgroundColor: '#2196F3', // Blue color for active group
        borderColor: theme.colors.primary,
      },
    ]);

    return (
      <List.Accordion
        testID={`model-accordion-${group.type}`}
        title={group.type}
        titleStyle={StyleSheet.flatten([
          styles.accordionTitle,
          {color: theme.colors.secondary},
        ])}
        description={description}
        descriptionStyle={StyleSheet.flatten([
          styles.accordionDescription,
          descriptionStyle,
        ])}
        expanded={expanded}
        onPress={onPress}
        style={accordionStyles}
        right={props => (
          <View style={styles.accordionRight}>
            <IconButton
              {...props}
              icon={expanded ? 'chevron-up' : 'chevron-down'}
              iconColor={theme.colors.secondary}
              size={20}
            />
          </View>
        )}>
        {children}
      </List.Accordion>
    );
  },
);
