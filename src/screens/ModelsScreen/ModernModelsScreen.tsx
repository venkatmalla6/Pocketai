import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { observer } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Card, Button, SectionHeader, ProgressBar, Tag } from '../../components/UI';
import { DesignSystem, gradients } from '../../design/designSystem';
import { hapticFeedback } from '../../utils/hapticFeedback';

import { modelStore } from '../../store';
import { Model } from '../../utils/types';

const { width: screenWidth } = Dimensions.get('window');

// Model Status Badge Component
const ModelStatusBadge: React.FC<{ 
  status: 'downloaded' | 'downloading' | 'available' | 'error';
  progress?: number;
}> = ({ status, progress }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'downloaded':
        return {
          color: DesignSystem.colors.accent.success,
          icon: 'check-circle',
          text: 'Ready'
        };
      case 'downloading':
        return {
          color: DesignSystem.colors.primary[500],
          icon: 'download',
          text: `${Math.round((progress || 0) * 100)}%`
        };
      case 'error':
        return {
          color: DesignSystem.colors.accent.error,
          icon: 'alert-circle',
          text: 'Error'
        };
      default:
        return {
          color: DesignSystem.colors.neutral[500],
          icon: 'cloud-download',
          text: 'Available'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.statusBadge, { backgroundColor: `${config.color}15` }]}>
      <Icon name={config.icon} size={12} color={config.color} />
      <Text style={[styles.statusText, { color: config.color }]}>
        {config.text}
      </Text>
    </View>
  );
};

// Modern Model Card Component
interface ModernModelCardProps {
  model: ModelInfo;
  isActive: boolean;
  onPress: () => void;
  onDownload?: () => void;
  onRemove?: () => void;
  index: number;
}

const ModernModelCard: React.FC<ModernModelCardProps> = ({
  model,
  isActive,
  onPress,
  onDownload,
  onRemove,
  index
}) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * 100;
    
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, []);

  const isDownloaded = model.isDownloaded;
  const isDownloading = model.isDownloading;
  const downloadProgress = model.downloadProgress || 0;

  const getModelStatus = () => {
    if (isDownloading) return 'downloading';
    if (isDownloaded) return 'downloaded';
    return 'available';
  };

  const animatedStyle = {
    opacity: opacityAnim,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <Animated.View style={[styles.modelCardContainer, animatedStyle]}>
      <Card
        style={[
          styles.modelCard,
          isActive && styles.activeModelCard,
        ]}
        onPress={() => {
          hapticFeedback.light();
          onPress();
        }}
        interactive
        elevated
        gradient={isActive ? 'primary' : undefined}
      >
        <View style={styles.modelCardContent}>
          <View style={styles.modelHeader}>
            <View style={styles.modelInfo}>
              <Text style={[
                styles.modelName,
                isActive && styles.activeModelName
              ]}>
                {model.name}
              </Text>
              <Text style={[
                styles.modelSize,
                isActive && styles.activeModelSize
              ]}>
                {model.size} • {model.quantization || 'Q4_K_M'}
              </Text>
            </View>

            <View style={styles.modelActions}>
              <ModelStatusBadge 
                status={getModelStatus()}
                progress={downloadProgress}
              />
              {isActive && (
                <View style={styles.activeIndicator}>
                  <Icon name="check" size={16} color="white" />
                </View>
              )}
            </View>
          </View>

          {model.description && (
            <Text style={[
              styles.modelDescription,
              isActive && styles.activeModelDescription
            ]}>
              {model.description}
            </Text>
          )}

          <View style={styles.modelTags}>
            {model.tags?.map((tag, index) => (
              <Tag
                key={index}
                label={tag}
                variant={isActive ? 'light' : 'default'}
                size="sm"
              />
            ))}
            {model.contextLength && (
              <Tag
                label={`${model.contextLength}k context`}
                variant={isActive ? 'light' : 'default'}
                size="sm"
              />
            )}
          </View>

          {isDownloading && (
            <View style={styles.downloadProgress}>
              <ProgressBar
                progress={downloadProgress}
                color={DesignSystem.colors.primary[500]}
                backgroundColor={DesignSystem.colors.neutral[200]}
                height={4}
                animated
              />
              <Text style={styles.downloadText}>
                Downloading... {Math.round(downloadProgress * 100)}%
              </Text>
            </View>
          )}

          <View style={styles.modelCardActions}>
            {!isDownloaded && !isDownloading && (
              <Button
                title="Download"
                variant="primary"
                size="sm"
                onPress={() => {
                  hapticFeedback.medium();
                  onDownload?.();
                }}
                icon={<Icon name="download" size={14} color="white" />}
              />
            )}
            
            {isDownloaded && !isActive && (
              <Button
                title="Remove"
                variant="ghost"
                size="sm"
                onPress={() => {
                  hapticFeedback.light();
                  onRemove?.();
                }}
                icon={<Icon name="trash-can" size={14} color={DesignSystem.colors.accent.error} />}
              />
            )}
            
            {isDownloading && (
              <Button
                title="Cancel"
                variant="ghost"
                size="sm"
                onPress={() => {
                  hapticFeedback.medium();
                  // Cancel download logic
                }}
                icon={<Icon name="close" size={14} color={DesignSystem.colors.neutral[500]} />}
              />
            )}
          </View>
        </View>
      </Card>
    </Animated.View>
  );
};

// Modern Search Bar Component
const ModernSearchBar: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}> = ({ value, onChangeText, placeholder = "Search models..." }) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(focusAnim, {
      toValue: isFocused ? 1 : 0,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const focusedStyle = {
    borderColor: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [DesignSystem.colors.semantic.border.primary, DesignSystem.colors.primary[500]],
    }),
    shadowOpacity: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.05, 0.15],
    }),
  };

  return (
    <Animated.View style={[styles.searchContainer, focusedStyle]}>
      <Icon name="magnify" size={20} color={DesignSystem.colors.neutral[400]} />
      <TextInput
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={DesignSystem.colors.neutral[400]}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearButton}
        >
          <Icon name="close-circle" size={20} color={DesignSystem.colors.neutral[400]} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

// Model Category Filter Component
const CategoryFilter: React.FC<{
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFilter}
      contentContainerStyle={styles.categoryFilterContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            activeCategory === category && styles.activeCategoryButton
          ]}
          onPress={() => {
            hapticFeedback.light();
            onCategoryChange(category);
          }}
        >
          <Text style={[
            styles.categoryText,
            activeCategory === category && styles.activeCategoryText
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Main Modern Models Screen
export const ModernModelsScreen: React.FC = observer(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const allModels = modelStore.models || [];
  const activeModel = modelStore.activeModel;
  
  // Get unique categories
  const categories = ['All', ...new Set(
    allModels.flatMap(model => model.tags || []).concat(['Downloaded', 'Available'])
  )];

  // Filter models based on search and category
  const filteredModels = allModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' ||
                           (selectedCategory === 'Downloaded' && model.isDownloaded) ||
                           (selectedCategory === 'Available' && !model.isDownloaded) ||
                           model.tags?.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    hapticFeedback.light();
    
    try {
      // Refresh models - this method doesn't exist, using refresh instead
      // await modelStore.fetchModels();
    } catch (error) {
      console.error('Failed to refresh models:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleModelSelect = (model: ModelInfo) => {
    if (model.isDownloaded) {
      modelStore.setActiveModel(model);
      hapticFeedback.success();
    }
  };

  const handleModelDownload = async (model: Model) => {
    try {
      await modelStore.downloadHFModel(model.hfModel!, model.hfModelFile!);
      hapticFeedback.success();
    } catch (error) {
      console.error('Failed to download model:', error);
      hapticFeedback.error();
    }
  };

  const handleModelRemove = async (model: ModelInfo) => {
    try {
      await modelStore.deleteModel(model);
      hapticFeedback.medium();
    } catch (error) {
      console.error('Failed to remove model:', error);
      hapticFeedback.error();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={DesignSystem.colors.primary[500]}
      />
      
      {/* Header */}
      <LinearGradient
        colors={gradients.primary}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Text style={styles.headerTitle}>AI Models</Text>
          <Text style={styles.headerSubtitle}>
            Choose your AI companion
          </Text>
          
          {activeModel && (
            <View style={styles.activeModelInfo}>
              <Icon name="check-circle" size={16} color="rgba(255,255,255,0.9)" />
              <Text style={styles.activeModelText}>
                Active: {activeModel.name}
              </Text>
            </View>
          )}
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <ModernSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
          <CategoryFilter
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </View>

        {/* Models List */}
        <ScrollView
          style={styles.modelsList}
          contentContainerStyle={styles.modelsListContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={DesignSystem.colors.primary[500]}
              colors={[DesignSystem.colors.primary[500]]}
            />
          }
        >
          {filteredModels.length === 0 ? (
            <Card style={styles.emptyState}>
              <View style={styles.emptyStateContent}>
                <Icon name="robot-confused" size={48} color={DesignSystem.colors.neutral[400]} />
                <Text style={styles.emptyStateTitle}>
                  {searchQuery ? 'No models found' : 'No models available'}
                </Text>
                <Text style={styles.emptyStateSubtitle}>
                  {searchQuery 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Check your internet connection and try refreshing'
                  }
                </Text>
                <Button
                  title="Refresh"
                  variant="primary"
                  size="md"
                  onPress={handleRefresh}
                  icon={<Icon name="refresh" size={16} color="white" />}
                  style={styles.emptyStateButton}
                />
              </View>
            </Card>
          ) : (
            <>
              <SectionHeader
                title={`${filteredModels.length} Models`}
                subtitle={`Filtered by: ${selectedCategory}`}
              />
              
              {filteredModels.map((model, index) => (
                <ModernModelCard
                  key={model.id}
                  model={model}
                  isActive={activeModel?.id === model.id}
                  onPress={() => handleModelSelect(model)}
                  onDownload={() => handleModelDownload(model)}
                  onRemove={() => handleModelRemove(model)}
                  index={index}
                />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignSystem.colors.semantic.background.secondary,
  },

  // Header Styles
  header: {
    paddingTop: DesignSystem.layout.safeArea.top,
    paddingBottom: DesignSystem.spacing.lg,
  },

  headerContent: {
    paddingHorizontal: DesignSystem.spacing.lg,
    paddingVertical: DesignSystem.spacing.md,
  },

  headerTitle: {
    fontSize: DesignSystem.typography.fontSize['3xl'],
    fontWeight: DesignSystem.typography.fontWeight.bold,
    color: 'white',
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  headerSubtitle: {
    fontSize: DesignSystem.typography.fontSize.base,
    color: 'rgba(255,255,255,0.8)',
    marginTop: DesignSystem.spacing.xs,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  activeModelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DesignSystem.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: DesignSystem.spacing.md,
    paddingVertical: DesignSystem.spacing.sm,
    borderRadius: DesignSystem.borderRadius.md,
  },

  activeModelText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: DesignSystem.typography.fontSize.sm,
    marginLeft: DesignSystem.spacing.sm,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  content: {
    flex: 1,
  },

  // Search Section Styles
  searchSection: {
    paddingHorizontal: DesignSystem.spacing.lg,
    paddingVertical: DesignSystem.spacing.md,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: DesignSystem.borderRadius.lg,
    paddingHorizontal: DesignSystem.spacing.md,
    borderWidth: 1,
    ...DesignSystem.shadows.sm,
    marginBottom: DesignSystem.spacing.md,
  },

  searchInput: {
    flex: 1,
    fontSize: DesignSystem.typography.fontSize.base,
    color: DesignSystem.colors.semantic.text.primary,
    paddingVertical: DesignSystem.spacing.md,
    marginLeft: DesignSystem.spacing.sm,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  clearButton: {
    padding: 4,
  },

  categoryFilter: {
    marginBottom: DesignSystem.spacing.sm,
  },

  categoryFilterContent: {
    paddingRight: DesignSystem.spacing.lg,
  },

  categoryButton: {
    paddingHorizontal: DesignSystem.spacing.md,
    paddingVertical: DesignSystem.spacing.sm,
    backgroundColor: DesignSystem.colors.neutral[100],
    borderRadius: DesignSystem.borderRadius.full,
    marginRight: DesignSystem.spacing.sm,
  },

  activeCategoryButton: {
    backgroundColor: DesignSystem.colors.primary[500],
  },

  categoryText: {
    fontSize: DesignSystem.typography.fontSize.sm,
    color: DesignSystem.colors.neutral[600],
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  activeCategoryText: {
    color: 'white',
    fontWeight: DesignSystem.typography.fontWeight.medium,
  },

  // Models List Styles
  modelsList: {
    flex: 1,
  },

  modelsListContent: {
    paddingHorizontal: DesignSystem.spacing.lg,
    paddingBottom: DesignSystem.spacing.xl,
  },

  modelCardContainer: {
    marginBottom: DesignSystem.spacing.md,
  },

  modelCard: {
    width: '100%',
  },

  activeModelCard: {
    borderWidth: 2,
    borderColor: 'transparent',
  },

  modelCardContent: {
    padding: 0,
  },

  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignSystem.spacing.sm,
  },

  modelInfo: {
    flex: 1,
  },

  modelName: {
    fontSize: DesignSystem.typography.fontSize.lg,
    fontWeight: DesignSystem.typography.fontWeight.semibold,
    color: DesignSystem.colors.semantic.text.primary,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  activeModelName: {
    color: 'white',
  },

  modelSize: {
    fontSize: DesignSystem.typography.fontSize.sm,
    color: DesignSystem.colors.neutral[500],
    marginTop: 2,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  activeModelSize: {
    color: 'rgba(255,255,255,0.8)',
  },

  modelActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DesignSystem.spacing.sm,
  },

  activeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DesignSystem.spacing.sm,
    paddingVertical: 4,
    borderRadius: DesignSystem.borderRadius.full,
  },

  statusText: {
    fontSize: DesignSystem.typography.fontSize.xs,
    fontWeight: DesignSystem.typography.fontWeight.medium,
    marginLeft: 4,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  modelDescription: {
    fontSize: DesignSystem.typography.fontSize.sm,
    color: DesignSystem.colors.neutral[600],
    marginBottom: DesignSystem.spacing.md,
    lineHeight: DesignSystem.typography.lineHeight.relaxed * DesignSystem.typography.fontSize.sm,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  activeModelDescription: {
    color: 'rgba(255,255,255,0.9)',
  },

  modelTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DesignSystem.spacing.xs,
    marginBottom: DesignSystem.spacing.md,
  },

  downloadProgress: {
    marginBottom: DesignSystem.spacing.md,
  },

  downloadText: {
    fontSize: DesignSystem.typography.fontSize.xs,
    color: DesignSystem.colors.neutral[500],
    marginTop: DesignSystem.spacing.xs,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  modelCardActions: {
    flexDirection: 'row',
    gap: DesignSystem.spacing.sm,
    justifyContent: 'flex-end',
  },

  // Empty State Styles
  emptyState: {
    alignItems: 'center',
    marginTop: DesignSystem.spacing.xl,
  },

  emptyStateContent: {
    alignItems: 'center',
    paddingVertical: DesignSystem.spacing.xl,
  },

  emptyStateTitle: {
    fontSize: DesignSystem.typography.fontSize.lg,
    fontWeight: DesignSystem.typography.fontWeight.semibold,
    color: DesignSystem.colors.semantic.text.primary,
    marginTop: DesignSystem.spacing.md,
    marginBottom: DesignSystem.spacing.sm,
    textAlign: 'center',
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  emptyStateSubtitle: {
    fontSize: DesignSystem.typography.fontSize.base,
    color: DesignSystem.colors.neutral[500],
    textAlign: 'center',
    marginBottom: DesignSystem.spacing.lg,
    paddingHorizontal: DesignSystem.spacing.lg,
    lineHeight: DesignSystem.typography.lineHeight.relaxed * DesignSystem.typography.fontSize.base,
    fontFamily: DesignSystem.typography.fontFamily.primary,
  },

  emptyStateButton: {
    minWidth: 120,
  },
});

export default ModernModelsScreen;
