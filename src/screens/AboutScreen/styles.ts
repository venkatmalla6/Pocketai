import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flexGrow: 1,
      padding: theme.spacing.default,
      paddingBottom: theme.spacing.default + insets.bottom,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borders.default,
      overflow: 'hidden',
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    header: {
      padding: theme.spacing.default * 2,
      backgroundColor: theme.colors.surfaceContainerHighest,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    },
    headerContent: {
      gap: theme.spacing.default,
    },
    title: {
      ...theme.fonts.headlineMedium,
      color: theme.colors.onSurface,
      marginBottom: theme.spacing.default / 2,
      letterSpacing: -0.5,
    },
    description: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: theme.spacing.default,
      lineHeight: 24,
    },
    versionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.default / 2,
    },
    versionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceContainerHigh,
      paddingHorizontal: theme.spacing.default,
      paddingVertical: theme.spacing.default / 2,
      borderRadius: theme.borders.default,
      gap: theme.spacing.default / 2,
      borderWidth: 1,
      borderColor: theme.colors.surfaceVariant,
    },
    versionText: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.onSurface,
    },
    section: {
      padding: theme.spacing.default * 2,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    },
    sectionTitle: {
      ...theme.fonts.titleMedium,
      color: theme.colors.onSurface,
      marginBottom: theme.spacing.default,
    },
    actionButton: {
      marginBottom: 15,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
    },
    orText: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      marginVertical: theme.spacing.default,
      opacity: 0.7,
    },
    supportButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.default,
      borderRadius: theme.borders.default,
      gap: theme.spacing.default / 2,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    supportButtonText: {
      ...theme.fonts.titleMedium,
      color: theme.colors.onPrimary,
      letterSpacing: 0.5,
    },
    feedbackButtonContent: {
      flexDirection: 'row-reverse',
    },
    feedbackForm: {
      padding: theme.spacing.default,
    },
    field: {
      marginBottom: theme.spacing.default,
    },
    label: {
      ...theme.fonts.labelMedium,
      color: theme.colors.onSurface,
      marginBottom: theme.spacing.default / 2,
    },
    segmentedButtons: {
      marginTop: theme.spacing.default / 2,
    },
    submitButton: {
      marginTop: theme.spacing.default,
    },
    secondaryButtons: {
      flexDirection: 'row',
    },
    teamMember: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: theme.colors.surfaceContainerLow,
      padding: 12,
      borderRadius: theme.borders.default,
    },
    teamLeadCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: theme.colors.primaryContainer,
      padding: 16,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    teamLeadImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 16,
    },
    teamLeadInfo: {
      flex: 1,
    },
    teamLeadName: {
      color: theme.colors.onPrimaryContainer,
      marginBottom: 4,
      fontSize: 18,
    },
    teamLeadRole: {
      color: theme.colors.primary,
      marginBottom: 4,
    },
    teamLeadContact: {
      color: theme.colors.onPrimaryContainer,
      fontSize: 14,
    },
    teamMembersRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    teamMembersCarousel: {
      flexDirection: 'row',
      gap: 16,
    },
    carouselContent: {
      paddingHorizontal: 4,
    },
    teamMemberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceContainerLow,
      padding: 16,
      borderRadius: theme.borders.default,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      width: 280,
      marginRight: 20,
    },
    teamMemberCardImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 12,
    },
    teamMemberCardInfo: {
      flex: 1,
    },
    teamMemberCardName: {
      color: theme.colors.onSurface,
      marginBottom: 2,
      fontSize: 13,
    },
    teamMemberCardRole: {
      color: theme.colors.primary,
      marginBottom: 2,
      fontSize: 12,
    },
    teamMemberCardContact: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 10,
    },
    contactIcons: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
    },
    teamMemberImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 12,
    },
    teamMemberInfo: {
      flex: 1,
    },
    teamMemberName: {
      color: theme.colors.onSurface,
      marginBottom: 2,
    },
    teamMemberRole: {
      color: theme.colors.primary,
      marginBottom: 2,
    },
    teamMemberContact: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 12,
    },
    logosContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 20,
    },
    logoImage: {
      width: 80,
      height: 80,
      marginHorizontal: 10,
    },
    collegeLogo: {
      width: 120,
      height: 120,
      alignSelf: 'center',
      marginTop: 20,
    },
  });
