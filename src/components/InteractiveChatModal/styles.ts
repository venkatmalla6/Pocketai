import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

interface StylesProps {
  theme: Theme;
}

export const createStyles = ({theme}: StylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    bottomSheetBackground: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    handleIndicator: {
      backgroundColor: theme.colors.outline,
      width: 40,
      height: 4,
      borderRadius: 2,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      color: theme.colors.onBackground,
      fontWeight: '600',
    },
    closeButton: {
      margin: 0,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    tabText: {
      color: theme.colors.onSurfaceVariant,
      fontWeight: '500',
    },
    activeTabText: {
      color: theme.colors.onPrimary,
      fontWeight: '600',
    },
    content: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    sectionHeader: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    sectionTitle: {
      color: theme.colors.onBackground,
      fontWeight: '700',
      marginBottom: 4,
    },
    sectionSubtitle: {
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    
    // Assistant Card Styles
    assistantCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: theme.colors.outline,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    assistantCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    assistantAvatar: {
      marginRight: 12,
    },
    assistantInfo: {
      flex: 1,
    },
    assistantName: {
      color: theme.colors.onSurface,
      fontWeight: '600',
      marginBottom: 2,
    },
    assistantType: {
      color: theme.colors.onSurfaceVariant,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    activeIndicator: {
      backgroundColor: `${theme.colors.primary}20`,
      borderRadius: 20,
      padding: 8,
    },
    assistantDescription: {
      color: theme.colors.onSurfaceVariant,
      lineHeight: 20,
      marginBottom: 12,
    },
    assistantTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    assistantTag: {
      marginRight: 8,
      marginBottom: 4,
      backgroundColor: `${theme.colors.primary}10`,
      borderColor: theme.colors.primary,
    },
    assistantTagText: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    
    // Model Card Styles
    modelCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    modelCardContent: {
      flex: 1,
    },
    modelName: {
      color: theme.colors.onSurface,
      fontWeight: '600',
      marginBottom: 4,
    },
    modelSize: {
      color: theme.colors.onSurfaceVariant,
    },
    
    // Empty State Styles
    emptyState: {
      alignItems: 'center',
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    emptyStateText: {
      color: theme.colors.onSurfaceVariant,
      marginTop: 16,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateSubtext: {
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      opacity: 0.7,
    },
  });
