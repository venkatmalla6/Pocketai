import React, {useCallback, useState, useEffect} from 'react';
import {Alert, Linking, View} from 'react-native';

import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  Card,
  ProgressBar,
  Button,
  IconButton,
  Text,
  TouchableRipple,
  HelperText,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';

import {Divider, VisionControlSheet} from '../../../components';

import {useTheme, useMemoryCheck, useStorageCheck} from '../../../hooks';

import {createStyles} from './styles';

import {uiStore, modelStore} from '../../../store';

import {
  Model,
  ModelOrigin,
  ModelType,
  RootDrawerParamList,
} from '../../../utils/types';
import {
  getModelDescription,
  L10nContext,
  checkModelFileIntegrity,
} from '../../../utils';
import {SkillsDisplay} from '../../../components';

type ChatScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

interface ModelCardProps {
  model: Model;
  activeModelId?: string;
  onFocus?: () => void;
  onOpenSettings?: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = observer(
  ({model, activeModelId, onOpenSettings}) => {
    const l10n = React.useContext(L10nContext);
    const theme = useTheme();
    const styles = createStyles(theme);

    const navigation = useNavigation<ChatScreenNavigationProp>();

    const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility
    const [integrityError, setIntegrityError] = useState<string | null>(null);

    const [showVisionControlSheet, setShowVisionControlSheet] = useState(false);

    const {memoryWarning, shortMemoryWarning, multimodalWarning} =
      useMemoryCheck(model.size, model.supportsMultimodal);
    const {isOk: storageOk, message: storageNOkMessage} = useStorageCheck(
      model,
      {enablePeriodicCheck: true, checkInterval: 10000},
    );

    const isActiveModel = activeModelId === model.id;
    const isDownloaded = model.isDownloaded;
    const isDownloading = modelStore.isDownloading(model.id);
    const isHfModel = model.origin === ModelOrigin.HF;

    // Check projection model status for downloaded vision models
    const projectionModelStatus = modelStore.getProjectionModelStatus(model);
    const hasProjectionModelWarning =
      isDownloaded &&
      model.supportsMultimodal &&
      modelStore.getModelVisionPreference(model) && // Only show warning when vision is enabled
      projectionModelStatus.state === 'missing';

    // Check integrity when model is downloaded
    useEffect(() => {
      if (isDownloaded) {
        checkModelFileIntegrity(model).then(({errorMessage}) => {
          setIntegrityError(errorMessage);
        });
      } else {
        setIntegrityError(null);
      }
    }, [isDownloaded, model]);

    // Check download limits - refresh when downloaded
    const handleDelete = useCallback(() => {
      if (model.isDownloaded) {
        // Special handling for projection models
        if (model.modelType === ModelType.PROJECTION) {
          const canDeleteResult = modelStore.canDeleteProjectionModel(model.id);

          if (!canDeleteResult.canDelete) {
            // Show error dialog with specific reason
            let message =
              canDeleteResult.reason ||
              l10n.models.multimodal.cannotDeleteTitle;

            if (
              canDeleteResult.reason === 'Projection model is currently active'
            ) {
              message = l10n.models.multimodal.cannotDeleteActive;
            } else if (
              canDeleteResult.dependentModels &&
              canDeleteResult.dependentModels.length > 0
            ) {
              const modelNames = canDeleteResult.dependentModels
                .map(m => m.name)
                .join(', ');
              message = `${l10n.models.multimodal.cannotDeleteInUse}\n\n${l10n.models.multimodal.dependentModels} ${modelNames}`;
            }

            Alert.alert(l10n.models.multimodal.cannotDeleteTitle, message, [
              {text: l10n.common.ok, style: 'default'},
            ]);
            return;
          }

          // Show projection-specific confirmation dialog
          Alert.alert(
            l10n.models.multimodal.deleteProjectionTitle,
            l10n.models.multimodal.deleteProjectionMessage,
            [
              {text: l10n.common.cancel, style: 'cancel'},
              {
                text: l10n.common.delete,
                style: 'destructive',
                onPress: async () => {
                  try {
                    await modelStore.deleteModel(model);
                  } catch (error) {
                    console.error('Failed to delete projection model:', error);
                    Alert.alert(
                      l10n.models.multimodal.cannotDeleteTitle,
                      error instanceof Error
                        ? error.message
                        : 'Unknown error occurred',
                      [{text: l10n.common.ok, style: 'default'}],
                    );
                  }
                },
              },
            ],
          );
        } else {
          // Standard model deletion
          Alert.alert(
            l10n.models.modelCard.alerts.deleteTitle,
            l10n.models.modelCard.alerts.deleteMessage,
            [
              {text: l10n.common.cancel, style: 'cancel'},
              {
                text: l10n.common.delete,
                onPress: async () => {
                  await modelStore.deleteModel(model);
                },
              },
            ],
          );
        }
      }
    }, [model, l10n]);

    const openHuggingFaceUrl = useCallback(() => {
      if (model.hfUrl) {
        Linking.openURL(model.hfUrl).catch(err => {
          console.error('Failed to open URL:', err);
          setSnackbarVisible(true);
        });
      }
    }, [model.hfUrl]);

    const handleRemove = useCallback(() => {
      Alert.alert(
        l10n.models.modelCard.alerts.removeTitle,
        l10n.models.modelCard.alerts.removeMessage,
        [
          {text: l10n.common.cancel, style: 'cancel'},
          {
            text: l10n.models.modelCard.buttons.remove,
            style: 'destructive',
            onPress: () => modelStore.removeModelFromList(model),
          },
        ],
      );
    }, [model, l10n]);

    const handleWarningPress = () => {
      setSnackbarVisible(true);
    };

    const handleProjectionWarningPress = useCallback(() => {
      if (model.defaultProjectionModel) {
        // Try to download the missing projection model
        modelStore.checkSpaceAndDownload(model.defaultProjectionModel);
      } else {
        // Show vision control sheet to select projection model
        setShowVisionControlSheet(true);
      }
    }, [model.defaultProjectionModel]);

    const renderDownloadOverlay = () => (
      <View>
        {!storageOk && (
          <HelperText
            testID="storage-error-text"
            type="error"
            visible={!storageOk}
            padding="none"
            style={styles.storageErrorText}>
            {storageNOkMessage}
          </HelperText>
        )}
        <View style={styles.overlayButtons}>
          {isHfModel && (
            <Button
              testID="remove-model-button"
              icon="delete-outline"
              mode="text"
              textColor={theme.colors.error}
              onPress={handleRemove}
              style={styles.removeButton}>
              {l10n.models.modelCard.buttons.remove}
            </Button>
          )}
          {storageOk && (
            <Button
              testID={isDownloading ? "cancel-download-button" : "download-button"}
              icon={isDownloading ? "close" : "download"}
              mode="contained"
              onPress={() => {
                if (isDownloading) {
                  // Try to cancel the download
                  if ('cancelDownload' in modelStore && typeof (modelStore as any).cancelDownload === 'function') {
                    (modelStore as any).cancelDownload(model.id);
                  } else {
                    console.log('Cancel download not available for model:', model.id);
                    // Alternative: You might want to show an alert that cancel is not available
                  }
                } else {
                  modelStore.checkSpaceAndDownload(model.id);
                }
              }}
              disabled={!storageOk}
              buttonColor={isDownloading 
                ? theme.colors.error 
                : theme.colors.primary
              }
              textColor={isDownloading 
                ? theme.colors.onError 
                : theme.colors.onPrimary
              }
              style={styles.downloadButton}>
              {isDownloading 
                ? 'Cancel'
                : l10n.models.modelCard.buttons.download
              }
            </Button>
          )}
        </View>
      </View>
    );

    const renderModelLoadButton = () => {
      if (
        modelStore.isContextLoading &&
        modelStore.loadingModel?.id === model.id
      ) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              testID="loading-indicator"
              animating={true}
              color={theme.colors.primary}
            />
          </View>
        );
      }

      const handlePress = async () => {
        if (isActiveModel) {
          modelStore.manualReleaseContext();
        } else {
          try {
            await modelStore.initContext(model);
            if (uiStore.autoNavigatetoChat) {
              navigation.navigate('Chat');
            }
          } catch (e) {
            console.log(`Error: ${e}`);
          }
        }
      };

      return (
        <Button
          testID={isActiveModel ? 'offload-button' : 'load-button'}
          icon={isActiveModel ? 'eject' : 'play-circle-outline'}
          mode="text"
          onPress={handlePress}
          // disabled={!!integrityError} // for now integrity check is experimental. So won't disable the button
          style={styles.actionButton}>
          {isActiveModel
            ? l10n.models.modelCard.buttons.offload
            : l10n.models.modelCard.buttons.load}
        </Button>
      );
    };

    return (
      <>
        <Card
          elevation={0}
          style={[
            styles.card,
            {backgroundColor: theme.colors.surface},
            isActiveModel && {backgroundColor: '#354049ff'}, // Blue color for active model
            {borderColor: theme.colors.primary},
          ]}>
          <View style={styles.cardInner}>
            <View style={styles.cardContent}>
              <View style={styles.headerRow}>
                <View style={styles.modelInfoContainer}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.modelName]}>{model.name}</Text>

                    {model.hfUrl && (
                      <IconButton
                        testID="open-huggingface-url"
                        icon="open-in-new"
                        size={14}
                        iconColor={theme.colors.onSurfaceVariant}
                        onPress={openHuggingFaceUrl}
                        style={styles.hfButton}
                      />
                    )}
                  </View>
                  <Text style={styles.modelDescription}>
                    {getModelDescription(model, isActiveModel, l10n)}
                  </Text>
                  <SkillsDisplay
                    model={model}
                    onVisionPress={
                      model.supportsMultimodal
                        ? () => setShowVisionControlSheet(true)
                        : undefined
                    }
                    visionEnabled={modelStore.getModelVisionPreference(model)}
                    visionAvailable={projectionModelStatus.isAvailable}
                    hasProjectionModelWarning={hasProjectionModelWarning}
                    onProjectionWarningPress={handleProjectionWarningPress}
                  />
                </View>
              </View>

              {/* Display warning icon if there's a memory or multimodal warning */}
              {(shortMemoryWarning || multimodalWarning) && isDownloaded && (
                <TouchableRipple
                  testID="memory-warning-button"
                  onPress={handleWarningPress}
                  style={styles.warningContainer}>
                  <View style={styles.warningContent}>
                    <IconButton
                      icon="alert-circle-outline"
                      iconColor={theme.colors.error}
                      size={20}
                      style={styles.warningIcon}
                    />
                    <Text style={styles.warningText}>
                      {shortMemoryWarning || multimodalWarning}
                    </Text>
                  </View>
                </TouchableRipple>
              )}

              {/* Display integrity warning if check fails */}
              {integrityError && (
                <TouchableRipple
                  testID="integrity-warning-button"
                  //onPress={handleWarningPress}
                  style={styles.warningContainer}>
                  <View style={styles.warningContent}>
                    <IconButton
                      icon="alert-circle-outline"
                      iconColor={theme.colors.error}
                      size={20}
                      style={styles.warningIcon}
                    />
                    <Text style={styles.warningText}>{integrityError}</Text>
                  </View>
                </TouchableRipple>
              )}

              {isDownloading && (
                <>
                  <ProgressBar
                    testID="download-progress-bar"
                    progress={model.progress / 100}
                    color={theme.colors.tertiary}
                    style={styles.progressBar}
                  />
                  {model.downloadSpeed && (
                    <Text style={styles.downloadSpeed}>
                      {model.downloadSpeed}
                    </Text>
                  )}
                </>
              )}
            </View>

            <Divider style={styles.divider} />

            {isDownloaded ? (
              <Card.Actions style={styles.actions}>
                <Button
                  testID="delete-button"
                  icon="delete"
                  mode="text"
                  compact
                  textColor={theme.colors.error}
                  onPress={() => handleDelete()}
                  style={styles.actionButton}>
                  {l10n.common.delete}
                </Button>
                <View style={styles.settingsContainer}>
                  <Button
                    testID="settings-button"
                    icon="tune"
                    mode="text"
                    compact
                    onPress={onOpenSettings}>
                    {l10n.models.modelCard.buttons.settings}
                  </Button>
                  <IconButton
                    icon="chevron-down"
                    size={14}
                    style={styles.settingsChevron}
                  />
                </View>
                {renderModelLoadButton()}
              </Card.Actions>
            ) : (
              renderDownloadOverlay()
            )}
          </View>
        </Card>
        {/* Snackbar to show full memory warning */}
        <Snackbar
          testID="memory-warning-snackbar"
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_MEDIUM}
          action={{
            label: l10n.common.dismiss,
            onPress: () => {
              setSnackbarVisible(false);
            },
          }}>
          {memoryWarning ||
            multimodalWarning ||
            (hasProjectionModelWarning &&
              l10n.models.multimodal.projectionMissingWarning)}
        </Snackbar>

        {/* Vision Control Sheet */}
        <VisionControlSheet
          isVisible={showVisionControlSheet}
          onClose={() => setShowVisionControlSheet(false)}
          model={model}
        />
      </>
    );
  },
);
