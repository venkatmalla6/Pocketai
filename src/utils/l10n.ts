/** Base chat l10n containing all required properties to provide localized copy. */
export const l10n = {
  en: {
    common: {
      cancel: 'Cancel',
      delete: 'Delete',
      dismiss: 'Dismiss',
      rename: 'Rename',
      reset: 'Reset',
      save: 'Save',
      update: 'Update',
      networkError: 'Network error. Please try again.',
      downloadETA: 'ETA',
      calculating: 'calculating...',
      second: 'sec',
      seconds: 'sec',
      year: 'year',
      years: 'years',
      month: 'month',
      months: 'months',
      week: 'week',
      weeks: 'weeks',
      day: 'day',
      days: 'days',
      hour: 'hour',
      hours: 'hours',
      minute: 'min',
      minutes: 'min',
      justNow: 'just now',
      ok: 'OK',
      close: 'Close',
      clear: 'Clear All',
      gallery: 'Gallery',
    },
    settings: {
      // Model Initialization Settings
      modelInitializationSettings: 'Model Initialization Settings',
      // Metal Settings
      metal: 'Metal',
      metalDescription: "Apple's hardware-accelerated API.",
      metalRequiresNewerIOS:
        'Metal acceleration requires iOS 18 or higher. Please upgrade your device to use this feature.',
      layersOnGPU: 'Layers on GPU: {{gpuLayers}}',
      // Context Size
      contextSize: 'Context Size',
      contextSizePlaceholder: 'Enter context size (min {{minContextSize}})',
      invalidContextSizeError:
        'Please enter a valid number (minimum {{minContextSize}})',
      modelReloadNotice: 'Model reload needed for changes to take effect.',
      // Advanced Settings
      advancedSettings: 'Advanced Settings',
      // Batch Size
      batchSize: 'Batch Size',
      batchSizeDescription: 'Batch size: {{batchSize}}{{effectiveBatch}}',
      effectiveLabel: 'effective',
      // Physical Batch Size
      physicalBatchSize: 'Physical Batch Size',
      physicalBatchSizeDescription:
        'Physical batch size: {{physicalBatchSize}}{{effectivePhysicalBatch}}',
      // Thread Count
      cpuThreads: 'CPU Threads',
      cpuThreadsDescription:
        'Using {{threads}} of {{maxThreads}} available threads',
      // Flash Attention
      flashAttention: 'Flash Attention',
      flashAttentionDescription: 'Enable Flash Attention for faster processing',
      // Cache Type K
      keyCacheType: 'Key Cache Type',
      keyCacheTypeDescription: 'Select the cache type for key computation',
      keyCacheTypeDisabledDescription:
        'Enable Flash Attention to change cache type',
      // Cache Type V
      valueCacheType: 'Value Cache Type',
      valueCacheTypeDescription: 'Select the cache type for value computation',
      valueCacheTypeDisabledDescription:
        'Enable Flash Attention to change cache type',
      // Memory Settings
      memorySettings: 'Memory Settings',
      useMlock: 'Use Memory Lock',
      useMlockDescription:
        'Force system to keep model in RAM rather than swapping or compressing',
      useMmap: 'Memory Mapping',
      useMmapDescription: 'Use memory-mapped files for faster model loading',
      useMmapTrue: 'Enabled',
      useMmapFalse: 'Disabled',
      useMmapSmart: 'Smart',
      useMmapTrueDescription: 'Always use memory mapping for faster loading',
      useMmapFalseDescription:
        'Never use memory mapping (slower loading but may reduce memory usage)',
      useMmapSmartDescription:
        'Automatically choose based on model type (Android only)',
      useMmapRecommended:
        'Recommended for performance - Memory-mapped with locked pages. Combines fast loading with consistent performance',
      // Model Loading Settings
      modelLoadingSettings: 'Model Loading Settings',
      // Auto Offload/Load
      autoOffloadLoad: 'Auto Offload/Load',
      autoOffloadLoadDescription: 'Offload model when app is in background.',
      // Auto Navigate to Chat
      autoNavigateToChat: 'Auto-Navigate to Chat',
      autoNavigateToChatDescription: 'Navigate to chat when loading starts.',
      // App Settings
      appSettings: 'App Settings',
      // Language
      language: 'Language',
      // Dark Mode
      darkMode: 'Dark Mode',
      // Display Memory Usage
      displayMemoryUsage: 'Display Memory Usage',
      displayMemoryUsageDescription: 'Display memory usage in the chat page.',
      // Export/Import Options
      exportOptions: 'Export Options',
      exportLegacyChats: 'Export Legacy Chats',
      exportLegacyChatsDescription:
        'Use this if migration failed or you need to recover old chat sessions.',
      exportButton: 'Export',
      importChats: 'Import Chat Sessions',
      importChatsDescription:
        'Import chat sessions from am (exported) JSON file.',
      importButton: 'Import',
      importSuccess: 'Successfully imported {{count}} chat session(s).',
      importError:
        'Failed to import chat sessions. Please check the file format.',
      // API Settings
      apiSettingsTitle: 'API Settings',
      // Hugging Face Token
      huggingFaceTokenLabel: 'Hugging Face Token',
      tokenIsSetDescription:
        'Token is set. Required for accessing gated models.',
      setTokenDescription:
        'Set a token to access gated models from Hugging Face.',
      setTokenButton: 'Set Token',
      useHfTokenLabel: 'Use HF Token',
      useHfTokenDescription:
        'Enable to use token for API requests. Disable if token is causing authentication issues.',
    },
    memory: {
      shortWarning: 'Memory Warning',
      warning:
        'Warning: Model size may exceed available memory. This could affect performance and stability of your device.',
      multimodalWarning:
        'This device may not have sufficient resources for multimodal models.',
      alerts: {
        memoryWarningTitle: 'Memory Warning',
        memoryWarningMessage:
          'This model may exceed available memory, which could cause instability. Continue loading?',
        multimodalWarningTitle: 'Device Performance Warning',
        multimodalWarningMessage:
          'This device may not have sufficient resources for multimodal models. Loading may cause instability. Continue anyway?',
        combinedWarningTitle: 'Performance Warning',
        combinedWarningMessage:
          'This model may exceed available memory and this device may not have sufficient resources for multimodal models. Loading may cause instability. Continue anyway?',
        cancel: 'Cancel',
        continue: 'Continue',
      },
    },
    storage: {
      checkFailed: 'Failed to check storage',
      lowStorage: 'Storage low! Model {{modelSize}} > {{freeSpace}} free',
    },
    generation: {
      modelNotInitialized: 'Model context not initialized',
      failedToGenerate: 'Failed to generate output',
    },
    models: {
      fileManagement: {
        fileAlreadyExists: 'File already exists',
        fileAlreadyExistsMessage:
          'A file with this name already exists. What would you like to do?',
        replace: 'Replace',
        keepBoth: 'Keep Both',
      },
      labels: {
        localModel: 'Local',
        hfModel: 'HF',
        unknownGroup: 'Unknown',
        availableToUse: 'Ready to Use',
        availableToDownload: 'Available to Download',
        useAddButtonForMore: 'Use + button to find more models',
      },
      vision: 'Vision',
      mmproj: 'Projector',
      multimodal: {
        settings: 'Multimodal Settings',
        projectionModels: 'Projection Models',
        noCompatibleModels: 'No compatible projection models found',
        noProjectionModels: 'No projection models available',
        selected: 'Selected',
        select: 'Select',
        download: 'Download',
        projectionNeededTitle: 'Projection Model Needed',
        projectionNeededMessage:
          'This model requires a projection model for multimodal capabilities.',
        projectionMissingWarning: 'Projection model missing',
        projectionMissingShort: 'Missing projection',
        reloadModelTitle: 'Reload Model',
        reloadModelMessage:
          'The model needs to be reloaded to apply the new projection model. Do you want to reload now?',
        reload: 'Reload',
        deleteProjectionTitle: 'Delete Projection Model',
        deleteProjectionMessage:
          'Are you sure you want to delete this projection model?',
        cannotDeleteTitle: 'Cannot Delete',
        // Vision control strings
        visionControls: {
          enableVision: 'Enable vision capabilities',
          disableVision: 'Disable vision capabilities',
          visionEnabled: 'Vision enabled',
          visionDisabled: 'Vision disabled',
          textOnlyMode: 'Text only',
          visionMode: 'Vision enabled',
          downloadWithVision: 'Download with vision',
          downloadTextOnly: 'Download text only',
          visionToggleDescription: 'Enable image processing capabilities',
          projectionModelSize: '+{size} projection model',
          visionModeDescription: 'Process images and text',
          textOnlyModeDescription: 'Process text only',
          includesVisionCapability: 'Includes vision capability',
          requiresProjectionModel:
            'Download a compatible projection model first',
        },
        cannotDeleteActive: 'This projection model is currently active.',
        cannotDeleteInUse:
          'This projection model is used by downloaded LLM models:',
        dependentModels: 'Dependent models:',
        visionWillBeDisabled:
          'Vision capabilities will be disabled for these models.',
      },
      buttons: {
        addFromHuggingFace: 'Add from Hugging Face',
        addLocalModel: 'Add Local Model',
        reset: 'Reset',
      },
      modelsHeaderRight: {
        menuTitleHf: 'Hugging Face Models',
        menuTitleDownloaded: 'Downloaded Models',
        menuTitleGrouped: 'Group by Model Type',
        menuTitleReset: 'Reset Models List',
      },
      modelsResetDialog: {
        proceedWithReset: 'Proceed with Reset',
        confirmReset: 'Confirm Reset',
      },
      chatTemplate: {
        label: 'Base Chat Template:',
      },
      details: {
        title: 'Available GGUF Files',
      },
      modelFile: {
        alerts: {
          cannotRemoveTitle: 'Cannot Remove',
          modelPreset: 'The model is preset.',
          downloadedFirst:
            'The model is downloaded. Please delete the file first.',
          removeTitle: 'Remove Model',
          removeMessage:
            'Are you sure you want to remove this model from the list?',
          removeError: 'Failed to remove the model.',
          alreadyDownloadedTitle: 'Model Already Downloaded',
          alreadyDownloadedMessage: 'The model is already downloaded.',
          deleteTitle: 'Delete Model',
          deleteMessage:
            'Are you sure you want to delete this downloaded model?',
        },
        buttons: {
          remove: 'Remove',
        },
        warnings: {
          storage: {
            message: 'Not enough storage space available.',
            shortMessage: 'Low Storage',
          },
          memory: {
            message:
              "Model size is close to or exceeds your device's total memory. This may cause unexpected behavior.",
          },
          legacy: {
            message: 'Legacy quantization format - model may not run.',
            shortMessage: 'Legacy quantization',
          },
          multiple: '{count} Warnings',
        },
        labels: {
          downloadSpeed: '{speed}',
        },
      },
      search: {
        noResults: 'No models found',
        loadingMore: 'Loading more...',
        searchPlaceholder: 'Search Hugging Face models',
        modelUpdatedLong: 'Updated {{time}} ago',
        modelUpdatedShort: '{{time}} ago',
        modelUpdatedJustNowLong: 'Updated just now',
        modelUpdatedJustNowShort: 'just now',
        errorOccurred: 'Unable to load models. Please try again.',
      },
      modelCard: {
        alerts: {
          deleteTitle: 'Delete Model',
          deleteMessage:
            'Are you sure you want to delete this downloaded model?',
          removeTitle: 'Remove Model',
          removeMessage:
            'Are you sure you want to remove this model from the list?',
        },
        buttons: {
          settings: 'Settings',
          download: 'Download',
          remove: 'Remove',
          load: 'Load',
          offload: 'Offload',
        },
        labels: {
          skills: 'Skills: ',
        },
      },
      modelSettings: {
        template: {
          label: 'Template:',
          editButton: 'Edit',
          dialogTitle: 'Edit Chat Template',
          note1:
            'Note: Changing the template may alter BOS, EOS, and system prompt.',
          note2: "Uses Nunjucks. Leave empty to use model's template.",
          placeholder: 'Enter your chat template here...',
          closeButton: 'Close',
        },
        stopWords: {
          label: 'STOP WORDS',
          placeholder: 'Add new stop word',
        },
        tokenSettings: {
          bos: 'BOS',
          eos: 'EOS',
          addGenerationPrompt: 'Add Generation Prompt',
          bosTokenPlaceholder: 'BOS Token',
          eosTokenPlaceholder: 'EOS Token',
          systemPrompt: 'System Prompt',
        },
      },
      modelDescription: {
        size: 'Size: ',
        parameters: 'Parameters: ',
        separator: ' | ',
        notAvailable: 'N/A',
      },
      modelCapabilities: {
        questionAnswering: 'Question Answering',
        summarization: 'Summarization',
        reasoning: 'Reasoning',
        roleplay: 'Role-play',
        instructions: 'Instruction following',
        code: 'Code generation',
        math: 'Math solving',
        multilingual: 'Multilingual',
        rewriting: 'Rewriting',
        creativity: 'Creative writing',
        vision: 'Vision',
      },
    },
    completionParams: {
      include_thinking_in_context:
        'Include AI thinking/reasoning parts in the context sent to the model. Disabling this can save context space. It might impact performance.',
      jinja:
        'Enable Jinja templating for chat formatting. When enabled, uses Jinja-based chat template processing for better compatibility with modern models.',
      grammar:
        'Enforce specific grammar rules to ensure the generated text follows a particular structure or format',
      stop: 'Define specific phrases that will stop text generation',
      n_predict: 'Set how long the generated response should be (in tokens)',
      n_probs: 'Show probability scores for alternative words.',
      top_k:
        'Control creativity by limiting word choices to the K most likely options. Lower values make responses more focused',
      top_p:
        'Balance creativity and coherence. Higher values (near 1.0) allow more creative but potentially less focused responses',
      min_p:
        'The minimum probability for a token to be considered. Filter out unlikely words to reduce nonsensical or out-of-context responses',
      temperature:
        'Control creativity vs predictability. Higher values make responses more creative but less focused',
      penalty_last_n:
        'How far back to check for repetition. Larger values help prevent long-term repetition',
      penalty_repeat:
        'Discourage word repetition. Higher values make responses use more diverse language',
      penalty_freq:
        'Penalize overused words. Higher values encourage using a broader vocabulary',
      penalty_present:
        'Reduce repetition of themes and ideas. Higher values encourage more diverse content',
      mirostat:
        'Enable advanced control over response creativity. Set to 1 or 2 (smoother) for smart, real-time adjustments to randomness and coherence.',
      mirostat_tau:
        'Set the target creativity level for Mirostat. Higher values allow for more diverse and imaginative responses, while lower values ensure more focused outputs.',
      mirostat_eta:
        'How quickly Mirostat adjusts creativity. Higher values mean faster adjustments',
      dry_multiplier:
        "Strength of the DRY (Don't Repeat Yourself) feature. Higher values strongly prevent repetition",
      dry_base:
        'Base penalty for repetition in DRY mode. Higher values are more aggressive at preventing repetition',
      dry_allowed_length:
        'How many words can repeat before DRY penalty kicks in',
      dry_penalty_last_n: 'How far back to look for repetition in DRY mode',
      dry_sequence_breakers:
        'Symbols that reset the repetition checker in DRY mode',
      ignore_eos:
        'Continue generating even if the model wants to stop. Useful for forcing longer responses',
      logit_bias:
        'Influence how likely specific words are to appear in the response',
      seed: 'Set the random number generator seed. Useful for reproducible results',
      xtc_probability:
        'Set the chance for token removal via XTC sampler. 0 is disabled',
      xtc_threshold:
        'Set a minimum probability threshold for tokens to be removed via XTC sampler. (> 0.5 disables XTC)',
      typical_p:
        'Enable locally typical sampling with parameter p. 1.0 is disabled',
    },
    about: {
      screenTitle: 'App Info',
      description:
        'I am currently building an Offline AI Chatbot that can run directly on devices without internet dependency. Unlike cloud-based bots, this chatbot loads AI models locally, ensuring fast response times, privacy, and availability even in low-connectivity areas. My focus is on making AI accessible, lightweight, and practical for students, professionals, and businesses.',
      developerTitle: 'About Me',
      developerDescription:
        'Name: Pavankumar Swamy Shesetti\nEmail: shesettipavankumarswamy@gmail.com\nMobile: +91 8639122823\nWebsite: pavankumarswamys.link',
      educationTitle: 'Education',
      educationList: [
        '\u2022 B.Tech \u2013 3rd Year, Computer Science Engineering',
        '  Godavari Institute of Engineering & Technology, Rajamahendravaram, Andhra Pradesh',
        '  giet.ac.in',
        '',
        '\u2022 Diploma \u2013 Computer Science Engineering',
        '  Sri Jyothi Polytechnic College, Vijayawada',
        '  srijyothipolytechnic.com',
        '',
        '\u2022 Schooling \u2013 Class 1 to 10',
        '  Sri Nagaraja Municipal Corporation High School'
      ],
      skillsTitle: 'Skills & Interests',
      skillsList: [
        '• Artificial Intelligence & Machine Learning',
        '• Offline AI Applications (Local AI Model Deployment)',
        '• Chatbot Development (WhatsApp, Web, Mobile)',
        '• Full Stack Development (Flutter, Node.js, React)',
        '• Cloud & Deployment (Firebase, Supabase, Render)'
      ],
      latestProjectTitle: 'Current Project',
      latestProjectName: 'Pocket-AI',
      latestProjectDescription:
        'An Offline AI Chatbot that runs directly on devices without internet dependency, ensuring privacy, speed, and accessibility.',
      connectTitle: 'Connect with me',
      linkedinButton: 'LinkedIn Profile',
      githubProfileButton: 'GitHub Profile',
      websiteButton: 'Visit Website',
      emailButton: 'Send Email',
      versionCopiedTitle: 'Version copied',
      versionCopiedDescription:
        'Version information has been copied to clipboard',
    },
    feedback: {
      title: 'Send Feedback',
      description:
        'Your voice matters! Tell us how Pocket-AI is helping you and what we can do to make it even more useful.',
      shareThoughtsButton: 'Sharing your thoughts',
      useCase: {
        label: 'What are you using Pocket-AI for?',
        placeholder: 'e.g., summarization, roleplay, etc.',
      },
      featureRequests: {
        label: 'Feature Request',
        placeholder: 'What features would you like to see?',
      },
      generalFeedback: {
        label: 'General Feedback',
        placeholder: 'Share any other thoughts you may have.',
      },
      usageFrequency: {
        label: 'How often do you use Pocket-AI? (Optional)',
        options: {
          daily: 'Daily',
          weekly: 'Weekly',
          monthly: 'Monthly',
          rarely: 'Rarely',
        },
      },
      email: {
        label: 'Contact Email (Optional)',
        placeholder: 'Your email address',
      },
      submit: 'Submit Feedback',
      validation: {
        required: 'Please provide at least some feedback',
      },
      success: 'Thank you for your feedback!',
      error: {
        general: 'Error sending feedback. Please try again.',
      },
    },

    components: {
      attachmentButton: {
        attachmentButtonAccessibilityLabel: 'Send media',
      },
      bubble: {
        timingsString:
          '{{predictedMs}}ms/token, {{predictedPerSecond}} tokens/sec',
      },
      exportUtils: {
        fileSaved: 'File Saved',
        fileSavedMessage:
          'The file has been saved to your Downloads folder as {{filename}}',
        share: 'Share',
        ok: 'OK',
        shareError: 'Share Error',
        shareErrorMessage: 'Could not share the file. Please try again.',
        saveError: 'Error saving to Downloads',
        saveOptions: 'Save Options',
        saveOptionsMessage:
          'Unable to save directly to Downloads. Would you like to share the file instead?',
        cancel: 'Cancel',
        shareContentErrorMessage:
          'Could not share the content. Please try again.',
        exportError: 'Export Error',
        exportErrorMessage:
          'There was an error exporting the file. Please try again.',
        permissionRequired: 'Storage Permission Required',
        permissionMessage:
          'We need permission to save your export into the Download folder.',
        permissionDenied: 'Permission Denied',
        permissionDeniedMessage:
          'Without storage permission, the export feature will be disabled.',
        continue: 'Continue',
      },
      thinkingBubble: {
        reasoning: 'Reasoning',
      },
      chatEmptyPlaceholder: {
        noModelsTitle: 'No Models Available',
        noModelsDescription:
          'Download a model to start chatting with Pocket-AI',
        noModelsButton: 'Download Model',
        activateModelTitle: 'Activate Model To Get Started',
        activateModelDescription:
          'Select the model and download it. After downloading, tap Load next to the model and start chatting.',
        activateModelButton: 'Select Model',
        loading: 'Loading...',
      },
      chatInput: {
        inputPlaceholder: 'Message',
        thinkingToggle: {
          enableThinking: 'Enable thinking mode',
          disableThinking: 'Disable thinking mode',
          thinkingEnabled: 'Thinking mode enabled',
          thinkingDisabled: 'Thinking mode disabled',
          thinkText: 'Think',
        },
      },
      contentReportSheet: {
        title: 'Report Content',
        privacyNote:
          'We do not send any message content or conversation details. Please describe the specific issue you encountered.',
        categoryLabel: 'Report Category',
        selectCategory: 'Select a category',
        categories: {
          hate: 'Hate Speech',
          sexual: 'Sexual Content',
          selfHarm: 'Self-Harm',
          violence: 'Violence',
          other: 'Other',
        },
        descriptionLabel: 'Description',
        descriptionPlaceholder:
          'Please describe the issue with this content...',
        includeModelInfo: 'Include model information',
        includeModelInfoDescription:
          'Include the model name and identifier to help us investigate',
        noActiveModelNote: 'No model is currently active',
        submit: 'Submit Report',
        validation: {
          title: 'Missing Information',
          message: 'Please select a category and provide a description.',
        },
        success: {
          title: 'Report Submitted',
          message:
            'Thank you for your report. We will review it and take appropriate action.',
        },
        error: {
          title: 'Report Failed',
          message: 'Failed to submit report. Please try again.',
        },
      },
      chatGenerationSettingsSheet: {
        invalidValues: 'Invalid Values',
        invalidNumericValuesMessage: 'Must be a valid number',
        pleaseCorrect: 'Please correct the following:',
        ok: 'OK',
        saveChanges: 'Save Changes',
        saveAsPreset: 'Save as Preset',
        title_session: 'Chat Generation Settings (Session)',
        title_preset: 'Chat Generation Settings (Preset)',
        resetToSystemDefaults: 'Reset to System Defaults',
        resetToPreset: 'Reset to Preset',
        applytoPresetAlert: {
          title: 'Success',
          message: 'These settings will be applied to all future sessions',
        },
      },
      chatHeaderTitle: {
        defaultTitle: 'Chat',
      },
      fileMessage: {
        fileButtonAccessibilityLabel: 'File',
      },
      chatPalModelPickerSheet: {
        modelsTab: 'Models',
        palsTab: 'AIs',
        noPal: 'No AI',
        disablePal: 'Disable active AI',
        noDescription: 'No description',
        assistantType: 'Assistant',
        roleplayType: 'Roleplay',
        videoType: 'Video',
        confirmationTitle: 'Confirmation',
        modelSwitchMessage:
          "This AI has a different default model ({{modelName}}). Would you like to switch to the AI's default model?",
        keepButton: 'Keep',
        switchButton: 'Switch',
      },
      downloadErrorDialog: {
        downloadFailedTitle: 'Download Failed',
        downloadFailedMessage: 'Failed to download model: {message}',
        unauthorizedTitle: 'Authentication Failed',
        unauthorizedMessage:
          'Your Hugging Face token appears to be invalid or expired. Please update your token in the settings.',
        forbiddenTitle: 'Access Denied',
        forbiddenMessage:
          'You do not have permission to access this model. Please ensure:',
        forbiddenSteps: [
          'Your token has "read" permission',
          'You requested and were granted access to this model',
          'The model owner approved your access request',
        ],
        getTokenTitle: 'Get Hugging Face Token',
        getTokenMessage:
          'This model requires a Hugging Face token to download.',
        getTokenSteps: [
          'Go to huggingface.co and sign in',
          'Navigate to Settings > Access Tokens',
          'Create a new token with "read" access',
          'Copy the token and paste it in the token field',
        ],
        tokenDisabledTitle: 'Token is Disabled',
        tokenDisabledMessage:
          'You have a Hugging Face token set, but it is currently disabled. This model requires a token to download. Enable your token to continue.',
        enableAndRetry: 'Enable and Retry',
        goToSettings: 'Go to Settings',
        tryAgain: 'Try Again',
        viewOnHuggingFace: 'View Model on HF ↗',
      },
      headerRight: {
        deleteChatTitle: 'Delete Chat',
        deleteChatMessage: 'Are you sure you want to delete this chat?',
        generationSettings: 'Generation settings',
        model: 'Model',
        duplicateChatHistory: 'Duplicate chat history',
        makeChatTemporary: 'Make chat temporary',
        export: 'Export/Import',
        exportCurrentSession: 'Export current session',
        exportAllSessions: 'Export all sessions',
        exportChatSession: 'Export chat session',
        importSessions: 'Import sessions',
      },
      hfTokenSheet: {
        title: 'Hugging Face Token',
        description: 'Required to access gated models',
        inputLabel: 'Personal Access Token',
        inputPlaceholder: 'Paste your token here',
        save: 'Save Token',
        saved: 'Token saved successfully',
        reset: 'Reset Token',
        resetSuccess: 'Token removed successfully',
        instructions: 'How to get a token:',
        instructionsSteps: [
          'Go to huggingface.co and sign in',
          'Navigate to Settings > Access Tokens',
          'Create a new token with "read" access',
          'Copy the token and paste it below',
        ],
        getTokenLink: 'Get a token from huggingface.co ↗',
        error: {
          saving: 'Error saving token',
          missing: 'Hugging Face token required',
          invalid: 'Invalid or expired token',
          gatedModelAccess: 'Access to this gated model was denied',
        },
        gatedModelIndicator: 'Requires Token',
        tokenRequired: 'This model requires a Hugging Face access token',
        searchErrorHint:
          'Your Hugging Face API token is invalid or expired. To continue searching, please either remove the token or disable token authentication in Settings.',
        disableAndRetry: 'Disable Token & Retry',
      },
      modelSettingsSheet: {
        modelSettings: 'Model Settings',
        saveChanges: 'Save Changes',
      },
      modelsHeaderRight: {
        menuTitleHf: 'Hugging Face Models',
        menuTitleDownloaded: 'Downloaded Models',
        menuTitleGrouped: 'Group by Model Type',
        menuTitleReset: 'Reset Models List',
      },
      modelsResetDialog: {
        proceedWithReset: 'Proceed with Reset',
        confirmReset: 'Confirm Reset',
      },
      assistantPalSheet: {
        title: {
          create: 'Create Assistant AI',
          edit: 'Edit Assistant AI',
        },
        palName: 'AI Name',
        palNamePlaceholder: 'Name',
        defaultModel: 'Default Model',
        defaultModelPlaceholder: 'Select model',
        validation: {
          generatingPromptRequired: 'Generating prompt is required',
          promptModelRequired: 'Prompt generation model is required',
        },
        create: 'Create',
      },
      modelNotAvailable: {
        noModelsDownloaded:
          'You do not have any models downloaded yet. Please download a model first.',
        downloadAModel: 'Download a model',
        defaultModelNotDownloaded:
          'Default model is not downloaded yet. Please download it first.',
        cancelDownload: 'Cancel download',
        download: 'Download',
      },
      roleplayPalSheet: {
        title: {
          create: 'Create Roleplay AI',
          edit: 'Edit Roleplay AI',
        },
        palName: 'AI Name',
        palNamePlaceholder: 'Name',
        defaultModel: 'Default Model',
        defaultModelPlaceholder: 'Select model',
        descriptionSection: 'Description',
        world: 'World',
        worldPlaceholder: 'Fantasy',
        location: 'Location',
        locationPlaceholder: 'Enchanted Forest',
        locationSublabel: 'Where does the story take place?',
        aiRole: "AI's Role",
        aiRolePlaceholder: 'Eldara, a mischievous forest sprite',
        aiRoleSublabel: 'Set the role for character',
        userRole: 'User Role',
        userRolePlaceholder: 'Sir Elandor, a brave knight',
        userRoleSublabel: 'Who are you?',
        situation: 'Situation',
        situationPlaceholder: 'Rescue mission, solving a mystery',
        toneStyle: 'Tone/Style',
        toneStylePlaceholder: 'Serious',
        validation: {
          promptModelRequired: 'Prompt generation model is required',
        },
        create: 'Create',
      },
      lookiePalSheet: {
        title: {
          create: 'Create Lookie AI',
          edit: 'Edit Lookie AI',
        },
        palName: 'AI Name',
        palNamePlaceholder: 'Enter a name for your Lookie AI',
        visionModel: 'Vision Model',
        visionModelPlaceholder: 'Select a vision model',
        requiredModelsSection: 'Required Models',
        captureInterval: 'Capture Interval',
        captureIntervalHelper:
          'Time between automatic captures in milliseconds',
        create: 'Create',
      },
      sendButton: {
        accessibilityLabel: 'Send',
      },
      systemPromptSection: {
        sectionTitle: 'System Prompt',
        useAIPrompt: 'Use AI to generate system prompt',
        modelSelector: {
          label: 'Select Model for Generation*',
          sublabel: 'Recommended: Llama 3.2 3B or Qwen2.5 3B.',
          placeholder: 'Select model',
        },
        generatingPrompt: {
          label: 'Generating Prompt',
          placeholder: 'Enter prompt for generation',
        },
        buttons: {
          loadingModel: 'Loading model...',
          stopGenerating: 'Stop Generating',
          generatePrompt: 'Generate System Prompt',
        },
        systemPrompt: {
          label: 'System Prompt',
          sublabel:
            'Feel free to edit and experiment to find the optimal prompt for your scenario',
          placeholder: 'You are a helpful assistant',
        },
        warnings: {
          promptChanged: 'System prompt has been manually changed',
        },
      },
      sidebarContent: {
        menuItems: {
          chat: 'Chat',
          models: 'Models',
          pals: "AI's",
          benchmark: 'Benchmark',
          shareApp: 'Share App',
          settings: 'Settings',
          appInfo: 'App Info',
          testCompletion: 'Test Completion',
        },
        deleteChatTitle: 'Delete Chat',
        deleteChatMessage: 'Are you sure you want to delete this chat?',
        dateGroups: {
          today: 'Today',
          yesterday: 'Yesterday',
          thisWeek: 'This week',
          lastWeek: 'Last week',
          twoWeeksAgo: '2 weeks ago',
          threeWeeksAgo: '3 weeks ago',
          fourWeeksAgo: '4 weeks ago',
          lastMonth: 'Last month',
          older: 'Older',
        },
      },
      usageStats: {
        tooltip: {
          title: 'Memory Usage',
          used: 'Used: ',
          total: 'Total: ',
          usage: 'Usage: ',
        },
        byteSizes: ['Bytes', 'KB', 'MB', 'GB'],
      },
      chatView: {
        menuItems: {
          copy: 'Copy',
          regenerate: 'Regenerate',
          regenerateWith: 'Regenerate with',
          edit: 'Edit',
          reportContent: 'Report Content',
        },
      },
      palHeaderRight: {
        exportAllPals: 'Export all AIs',
        importPals: 'Import AIs',
        importSuccess: 'Successfully imported {{count}} AI(s).',
        importError: 'Failed to import AIs. Please check the file format.',
      },
    },
    palsScreen: {
      systemPrompt: 'System Prompt',
      videoAnalysis: 'Video Analysis',
      videoAnalysisDescription:
        "This is a video-based AI assistant that provides real-time commentary on video streams from your device's camera.",
      captureInterval: 'Capture Interval',
      captureIntervalUnit: 'ms',
      world: 'World',
      toneStyle: 'Tone/Style',
      aiRole: "AI's Role",
      userRole: 'My Role',
      prompt: 'Prompt',
      assistant: 'Assistant',
      roleplay: 'Roleplay',
      video: 'Video',
      deletePal: 'Delete AI',
      deletePalMessage: 'Are you sure you want to delete this AI?',
      missingModel: 'Missing Model',
      missingModelMessage:
        'The default model "{{modelName}}" for this AI is not available. Please download it in the edit sheet or select a different model.',
    },
    validation: {
      nameRequired: 'Name is required',
      systemPromptRequired: 'System prompt is required',
      worldRequired: 'World is required',
      locationRequired: 'Location is required',
      aiRoleRequired: "AI's role is required",
      userRoleRequired: 'User role is required',
      situationRequired: 'Situation is required',
      toneStyleRequired: 'Tone/Style is required',
    },
    camera: {
      permissionTitle: 'Camera Permission Required',
      permissionMessage: 'Pocket-AI needs camera access to analyze images',
      requestingPermission: 'Requesting camera permission...',
      noDevice: 'No camera device found',
      errorTitle: 'Camera Error',
      errorMessage: 'An error occurred while taking the photo',
      flip: 'Flip',
      analyzing: 'Analyzing image...',
      startCamera: 'Start Camera',
      stopCamera: 'Stop Camera',
      promptPlaceholder: 'What do you want to know about this image?',
      takePhoto: 'Camera',
    },
    video: {
      permissionTitle: 'Camera Permission Required',
      permissionMessage: 'Pocket-AI needs camera access for video analysis',
      requestingPermission: 'Requesting camera permission...',
      noDevice: 'No camera device found',
      errorTitle: 'Camera Error',
      errorMessage: 'An error occurred with the camera',
      flip: 'Flip',
      analyzing: 'Analyzing video...',
      startCamera: 'Start Camera',
      stopCamera: 'Stop Camera',
      promptPlaceholder: 'What do you want to know about this video?',
      captureInterval: 'Capture Interval',
      captureIntervalUnit: 'ms',
      liveCommentary: 'Live Commentary',
      emptyPlaceholder: {
        title: 'Welcome to Lookie',
        subtitle: 'Private On-Device Real-time Video Analysis',
        experimentalNotice:
          'This is an experimental feature. Accuracy depends on the selected model, speed depends on your device specs, and some models might fail.',
        howToUse: 'How to use:',
        step1: '• Edit the prompt (optional) to guide the analysis',
        step2: '• Tap the camera button to start live video analysis',
        step3: '• Adjust snapshot frequency while camera is active',
          step4: '• Switch to another AI for normal text chat',
      },
    },
    screenTitles: {
      chat: 'Chat',
      models: 'Models',
      pals: 'AIs (experimental)',
      benchmark: 'Benchmark',
      settings: 'Settings',
      appInfo: 'About',
      testCompletion: 'Test Completion',
    },
    chat: {
      conversationReset: 'Conversation reset!',
      modelNotLoaded: 'Model not loaded. Please initialize the model.',
      completionFailed: 'Completion failed: ',
      loadingModel: 'Loading model ...',
      typeYourMessage: 'Type your message here',
      load: 'Load',
      goToModels: 'Go to Models',
      readyToChat: 'Ready to chat? Load the last used model.',
      pleaseLoadModel: 'Load a model to chat.',
      multimodalNotEnabled:
        'Multimodal is not enabled for this model. Images will be displayed but not processed by the AI.',
    },
    benchmark: {
      title: 'Benchmark',
      modelSelector: {
        prompt: 'Select Model',
      },
      buttons: {
        advancedSettings: 'Advanced Settings',
        startTest: 'Start Test',
        runningTest: 'Running Test...',
        clearAll: 'Clear All',
        done: 'Done',
        cancel: 'Cancel',
        delete: 'Delete',
        share: 'Share',
        sharing: 'Sharing...',
        viewRawData: 'View Raw Data',
        hideRawData: 'Hide Raw Data',
      },
      messages: {
        pleaseSelectModel: 'Please select and initialize a model first',
        testWarning:
          'Note: Test could run for up to 2-5 minutes for larger models and cannot be interrupted once started.',
        keepScreenOpen: 'Please keep this screen open.',
        initializingModel: 'Initializing model...',
        modelMaxValue: '(max: {{maxValue}})',
      },
      dialogs: {
        advancedSettings: {
          title: 'Advanced Settings',
          testProfile: 'Test Profile',
          customParameters: 'Custom Parameters',
          description:
            'Fine-tune the benchmark parameters for specific testing scenarios.',
        },
        deleteResult: {
          title: 'Delete Result',
          message: 'Are you sure you want to delete this benchmark result?',
        },
        clearAllResults: {
          title: 'Clear All Results',
          message: 'Are you sure you want to delete all benchmark results?',
        },
        shareResults: {
          title: 'Share Benchmark Results',
          sharedDataTitle: 'Shared data includes:',
          deviceAndModelInfo: '• Device specs & model info',
          performanceMetrics: '• Performance metrics',
          dontShowAgain: "Don't show this message again",
        },
      },
      sections: {
        testResults: 'Test Results',
      },
      benchmarkResultCard: {
        modelMeta: {
          params: 'params',
        },
        config: {
          title: 'Benchmark Config',
          format: 'PP: {{pp}} • TG: {{tg}} • PL: {{pl}} • Rep: {{nr}}',
        },
        modelSettings: {
          title: 'Model Settings',
          context: 'Context: {{context}}',
          batch: 'Batch: {{batch}}',
          ubatch: 'UBatch: {{ubatch}}',
          cpuThreads: 'CPU Threads: {{threads}}',
          gpuLayers: 'GPU Layers: {{layers}}',
          flashAttentionEnabled: 'Flash Attention Enabled',
          flashAttentionDisabled: 'Flash Attention Disabled',
          cacheTypes: 'Cache Types: {{cacheK}}/{{cacheV}}',
        },
        results: {
          promptProcessing: 'Prompt Processing',
          tokenGeneration: 'Token Generation',
          totalTime: 'Total Time',
          peakMemory: 'Peak Memory',
          tokensPerSecond: 't/s',
        },
        actions: {
          deleteButton: '',
          submittedText: '✓ Shared to',
          leaderboardLink: 'AI Phone Leaderboard ↗',
          cannotShare: 'Cannot share',
          cannotShareTooltip: 'Local model results cannot be shared',
          submitButton: 'Submit to Leaderboard',
          viewLeaderboard: 'View leaderboard ↗',
        },
        errors: {
          networkRetry: 'Check connection & retry',
          appCheckRetry: 'Retry submission',
          serverRetry: 'Try again later',
          genericRetry: 'Retry',
          failedToSubmit: 'Failed to submit benchmark',
        },
      },
      deviceInfoCard: {
        title: 'Device Information',
        deviceSummary: '{{brand}} {{model}} • {{systemName}} {{systemVersion}}',
        coreSummary: '{{cores}} cores • {{memory}}',
        sections: {
          basicInfo: 'Basic Info',
          cpuDetails: 'CPU Details',
          appInfo: 'App Info',
        },
        fields: {
          architecture: 'Architecture',
          totalMemory: 'Total Memory',
          deviceId: 'Device ID',
          cpuCores: 'CPU Cores',
          cpuModel: 'CPU Model',
          chipset: 'Chipset',
          instructions: 'Instructions',
          version: 'Version',
        },
        instructions: {
          format:
            'FP16: {{fp16}}, DotProd: {{dotProd}}, SVE: {{sve}}, I8MM: {{i8mm}}',
          yes: '✓',
          no: '✗',
        },
        versionFormat: '{{version}} ({{buildNumber}})',
      },
    },
    errors: {
      unexpectedError: 'An unexpected error occurred',
      hfAuthenticationError:
        'Hugging Face authentication error: Token is missing or invalid',
      hfAuthenticationErrorSearch:
        'Hugging Face authentication error: Invalid token',
      authenticationError: 'Authentication error: Token is missing or invalid',
      hfAuthorizationError:
        'Hugging Face authorization error: No permission to access this resource',
      authorizationError:
        'Authorization error: No permission to access this resource',
      hfServerError: 'Hugging Face server error: API server issue',
      serverError: 'Server error: API server issue',
      hfNetworkTimeout:
        'Network timeout: Request to Hugging Face took too long to complete',
      networkTimeout: 'Network timeout: Request took too long to complete',
      hfNetworkError: 'Network error: Unable to connect to Hugging Face API',
      networkError: 'Network error: Unable to connect to API',
      downloadSetupFailedTitle: 'Download Setup Failed',
      downloadSetupFailedMessage:
        'Failed to prepare model for download: {message}',
      cameraErrorTitle: 'Camera Error',
      cameraErrorMessage: 'Failed to take photo',
      galleryErrorTitle: 'Gallery Error',
      galleryErrorMessage: 'Failed to select images',
    },
    simulator: {
      cameraNotAvailable:
        'Camera not available in simulator. Please use a physical device.',
    },
  },

  te: {
    common: {
      cancel: 'రద్దు చేయండి',
      delete: 'తొలగించు',
      dismiss: 'విస్మరించు',
      rename: 'పేరు మార్చు',
      reset: 'రీసెట్',
      save: 'భద్రపరచు',
      update: 'అప్డేట్',
      networkError: 'నెట్వర్క్ లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.',
      downloadETA: 'ETA',
      minutes: 'నిమిషాలు',
      second: 'సెకను',
      seconds: 'సెకనులు',
      calculating: 'లెక్కిస్తున్నాం...',
      year: 'సంవత్సరం',
      years: 'సంవత్సరాలు',
      month: 'నెల',
      months: 'నెలలు',
      week: 'వారం',
      weeks: 'వారాలు',
      day: 'రోజు',
      days: 'రోజులు',
      hour: 'గంట',
      hours: 'గంటలు',
      minute: 'నిమిషం',
      justNow: 'ఇప్పుడే',
      ok: 'సరే',
      close: 'మూసివేయి',
      clear: 'అన్నింటినీ క్లియర్ చేయి',
      gallery: 'గ్యాలరీ',
    },
    settings: {
      // Model Initialization Settings
      modelInitializationSettings: 'మాడల్ ప్రారంభ సెట్టింగ్లు',
      // Metal Settings
      metal: 'Metal',
      metalDescription: 'Apple వారి హార్డ్వేర్-అక్సెలరేటెడ్ API',
      metalRequiresNewerIOS:
        'Metal అక్సెలరేషన్ కోసం iOS 18 కి మేలె పై వేర్షన్ అవసరం. ఈ వైశిష్ట్యాన్ని ఉపయోగించడం కోసం దయచేసి మీ డివైస్ని అప్డేట్ చేయండి.',
      layersOnGPU: 'GPU లేయర్లు: {{gpuLayers}}',
      // Context Size
      contextSize: 'కాన్టెక్స్ట్ సైజు',
      contextSizePlaceholder:
        'కాన్టెక్స్ట్ సైజు నమ్మండి (కనిష్ఠం {{minContextSize}})',
      invalidContextSizeError:
        'దయచేసి వలిడ్ నంబర్ నమ్మండి (కనిష్ఠం {{minContextSize}})',
      modelReloadNotice: 'మార్పులను లాగు పరచడానికి మాడల్ రీలోడ్ అవసరం.',
      // Advanced Settings
      advancedSettings: 'అడ్వాన్స్డ్ సెట్టింగ్లు',
      // Batch Size
      batchSize: 'బ్యాచ్ సైజు',
      batchSizeDescription: 'బ్యాచ్ సైజు: {{batchSize}}{{effectiveBatch}}',
      effectiveLabel: 'ప్రభావవంతం',
      // Physical Batch Size
      physicalBatchSize: 'భౌతిక బ్యాచ్ సైజు',
      physicalBatchSizeDescription:
        'భౌతిక బ్యాచ్ సైజు: {{physicalBatchSize}}{{effectivePhysicalBatch}}',
      // Thread Count
      cpuThreads: 'CPU థ్రెడ్లు',
      cpuThreadsDescription:
        '{{maxThreads}} అందుబాటులో ఉన్న థ్రెడ్లలో {{threads}} వాడుతున్నాం',
      // Flash Attention
      flashAttention: 'ఫ్లాష్ అటెన్షన్',
      flashAttentionDescription: 'వేగవంతమైన ప్రాసెసింగ్ కోసం ఫ్లాష్ అటెన్షన్ ఎనేబుల్ చేయండి',
      // Cache Type K
      keyCacheType: 'కీ క్యాష్ టైపు',
      keyCacheTypeDescription: 'కీ లెక్కల కోసం క్యాష్ టైపు ఎంచుకోండి',
      keyCacheTypeDisabledDescription:
        'క్యాష్ టైపు మార్చడానికి ఫ్లాష్ అటెన్షన్ ఎనేబుల్ చేయాలి',
      // Cache Type V
      valueCacheType: 'విలువ క్యాష్ టైపు',
      valueCacheTypeDescription: 'విలువ లెక్కల కోసం క్యాష్ టైపు ఎంచుకోండి',
      valueCacheTypeDisabledDescription:
        'క్యాష్ టైపు మార్చడానికి ఫ్లాష్ అటెన్షన్ ఎనేబుల్ చేయాలి',
      // Memory Settings
      memorySettings: 'మెమరీ సెట్టింగులు',
      useMlock: 'మెమరీ లాక్ వాడండి',
      useMlockDescription: 'మోడల్‌ని RAMలో ఉంచి, స్వాప్ లేదా కంప్రెషన్‌ని నివారిస్తుంది',
      useMmap: 'మెమరీ మ్యాపింగ్',
      useMmapDescription:
        'మెమరీ మ్యాప్ ఫైల్ వాడి మోడల్ లోడింగ్ వేగవంతం చేయండి',
      useMmapTrue: 'ఎనేబుల్',
      useMmapFalse: 'డిసేబుల్',
      useMmapSmart: 'స్మార్ట్',
      useMmapTrueDescription: 'ఎల్లప్పుడూ మెమరీ మ్యాపింగ్ వాడి వేగంగా లోడ్ చేయండి',
      useMmapFalseDescription:
        'మెమరీ మ్యాపింగ్ వాడరు (లోడింగ్ నెమ్మదిగా ఉంటుంది కానీ మెమరీ వినియోగం తగ్గవచ్చు)',
      useMmapSmartDescription: 'మోడల్ టైప్ ఆధారంగా ఆటోమేటిక్ ఎంపిక (Androidలో మాత్రమే)',
      useMmapRecommended:
        'పర్ఫార్మెన్స్ కోసం సిఫార్సు - లాక్ చేసిన పేజీలతో మెమరీ మ్యాపింగ్. వేగవంతమైన లోడింగ్ మరియు స్థిరమైన పనితీరు కలిపి ఇస్తుంది',
      // Model Loading Settings
      modelLoadingSettings: 'మోడల్ లోడింగ్ సెట్టింగులు',
      // Auto Offload/Load
      autoOffloadLoad: 'ఆటో ఆఫ్‌లోడ్/లోడ్',
      autoOffloadLoadDescription:
        'యాప్ బ్యాక్‌గ్రౌండ్‌లో ఉన్నప్పుడు మోడల్ ఆఫ్‌లోడ్ అవుతుంది',
      // Auto Navigate to Chat
      autoNavigateToChat: 'చాట్‌కి ఆటోమేటిక్‌గా వెళ్ళు',
      autoNavigateToChatDescription:
        'లోడింగ్ ప్రారంభమైన వెంటనే చాట్ స్క్రీన్‌కి వెళుతుంది',
      // App Settings
      appSettings: 'యాప్ సెట్టింగులు',
      // Language
      language: 'భాష',
      // Dark Mode
      darkMode: 'డార్క్ మోడ్',
      // Display Memory Usage
      displayMemoryUsage: 'మెమరీ వినియోగాన్ని చూపు',
      displayMemoryUsageDescription: 'చాట్ స్క్రీన్‌లో మెమరీ వినియోగం చూపిస్తుంది',
      // Export/Import Options
      exportOptions: 'ఎక్స్‌పోర్ట్ ఆప్షన్స్',
      exportLegacyChats: 'పాత చాట్ సెషన్లు ఎక్స్‌పోర్ట్ చేయి',
      exportLegacyChatsDescription:
        'మైగ్రేషన్ విఫలమైతే లేదా పాత చాట్ సెషన్లు రీస్టోర్ చేయాలి అనుకుంటే వాడండి',
      exportButton: 'ఎక్స్‌పోర్ట్',
      importChats: 'చాట్ సెషన్లు ఇంపోర్ట్ చేయి',
      importChatsDescription:
        'JSON ఫైల్ నుండి చాట్ సెషన్లు ఇంపోర్ట్ చేయండి',
      importButton: 'ఇంపోర్ట్',
      importSuccess: '{{count}} చాట్ సెషన్లు విజయవంతంగా ఇంపోర్ట్ అయ్యాయి',
      importError:
        'చాట్ సెషన్ ఇంపోర్ట్ విఫలమైంది, దయచేసి ఫైల్ ఫార్మాట్‌ని చెక్ చేయండి',
      // API Settings
      apiSettingsTitle: 'API సెట్టింగులు',
      // Hugging Face Token
      huggingFaceTokenLabel: 'Hugging Face టోకెన్',
      tokenIsSetDescription:
        'టోకెన్ సెట్ అయింది, పరిమిత మోడల్స్ యాక్సెస్‌కి అవసరం',
      setTokenDescription:
        'Hugging Face నుండి పరిమిత మోడల్స్ యాక్సెస్ చేయడానికి టోకెన్ సెట్ చేయండి',
      setTokenButton: 'టోకెన్ సెట్ చేయి',
      useHfTokenLabel: 'HF టోకెన్ వాడండి',
      useHfTokenDescription:
        'HF టోకెన్ వాడి పరిమిత మోడల్స్ యాక్సెస్ చేయండి',
    },      
    memory: {
      shortWarning: 'మెమరీ హెచ్చరిక',
      warning:
        'హెచ్చరిక: మోడల్ సైజు అందుబాటులో ఉన్న మెమరీని మించవచ్చు, ఇది పరికరం పనితీరు మరియు స్థిరత్వంపై ప్రభావం చూపవచ్చు',
      multimodalWarning:
        'ఈ పరికరంలో మల్టీమోడల్ మోడల్‌కు తగినంత వనరులు లేకపోవచ్చు',
      alerts: {
        memoryWarningTitle: 'మెమరీ హెచ్చరిక',
        memoryWarningMessage:
          'ఈ మోడల్ అందుబాటులో ఉన్న మెమరీని మించవచ్చు మరియు అస్థిరంగా ఉండవచ్చు, లోడింగ్‌ను కొనసాగించాలా?',
        multimodalWarningTitle: 'పరికర పనితీరు హెచ్చరిక',
        multimodalWarningMessage:
          'ఈ పరికరంలో మల్టీమోడల్ మోడల్‌కు తగినంత వనరులు లేకపోవచ్చు, లోడింగ్ వలన అస్థిరత సంభవించవచ్చు, కొనసాగించాలా?',
        combinedWarningTitle: 'పనితీరు హెచ్చరిక',
        combinedWarningMessage:
          'ఈ మోడల్ అందుబాటులో ఉన్న మెమరీని మించవచ్చు మరియు ఈ పరికరంలో మల్టీమోడల్ మోడల్‌కు తగినంత వనరులు లేకపోవచ్చు, లోడింగ్ వలన అస్థిరత సంభవించవచ్చు, కొనసాగించాలా?',
        cancel: 'రద్దు',
        continue: 'కొనసాగించు',
      },
    },
    storage: {
      checkFailed: 'స్టోరేజ్ తనిఖీ విఫలమైంది',
      lowStorage:
        'స్టోరేజ్ సామర్థ్యం తక్కువగా ఉంది! మోడల్ {{modelSize}} > ఖాళీ స్థలం {{freeSpace}}',
    },
    generation: {
      modelNotInitialized: 'మోడల్ సందర్భం ప్రారంభించబడలేదు',
      failedToGenerate: 'అవుట్‌పుట్ ఉత్పత్తి విఫలమైంది',
    },
    models: {
      fileManagement: {
        fileAlreadyExists: 'ఫైల్ ఇప్పటికే ఉంది',
        fileAlreadyExistsMessage:
          'ఈ పేరుతో ఫైల్ ఇప్పటికే ఉంది, మీరు ఏమి చేయాలనుకుంటున్నారు?',
        replace: 'భర్తీ చేయి',
        keepBoth: 'రెండూ ఉంచు',
      },
      labels: {
        localModel: 'స్థానిక',
        hfModel: 'HF',
        unknownGroup: 'తెలియని',
        availableToUse: 'ఉపయోగించడానికి అందుబాటులో ఉంది',
        availableToDownload: 'డౌన్‌లోడ్ చేయడానికి అందుబాటులో ఉంది',
        useAddButtonForMore: '+ బటన్‌ను ఇతర మోడల్‌ల కోసం ఉపయోగించండి',
      },
      vision: 'విజన్',
      mmproj: 'ప్రొజెక్టర్',
      multimodal: {
        settings: 'మల్టీమోడల్ సెట్టింగ్‌లు',
        projectionModels: 'ప్రొజెక్షన్ మోడల్‌లు',
        noCompatibleModels: 'అనుకూలమైన ప్రొజెక్షన్ మోడల్‌లు కనుగొనబడలేదు',
        noProjectionModels: 'అందుబాటులో ఉన్న ప్రొజెక్షన్ మోడల్‌లు లేవు',
        selected: 'ఎంపిక చేయబడింది',
        select: 'ఎంచుకోండి',
        download: 'డౌన్‌లోడ్',
        projectionNeededTitle: 'ప్రొజెక్షన్ మోడల్ అవసరం',
        projectionNeededMessage:
          'ఈ మోడల్‌కు మల్టీమోడల్ ఫీచర్‌ల కోసం ప్రొజెక్షన్ మోడల్ అవసరం',
        projectionMissingWarning: 'ప్రొజెక్షన్ మోడల్ లోపం',
        projectionMissingShort: 'ప్రొజెక్షన్ మోడల్ లోపం',
        reloadModelTitle: 'మోడల్‌ను మళ్లీ లోడ్ చేయండి',
        reloadModelMessage:
          'కొత్త ప్రొజెక్షన్ మోడల్‌ను వర్తింపజేయడానికి మోడల్‌ను మళ్లీ లోడ్ చేయాలి, ఇప్పుడు మళ్లీ లోడ్ చేయాలా?',
        reload: 'మళ్లీ లోడ్ చేయండి',
        deleteProjectionTitle: 'ప్రొజెక్షన్ మోడల్‌ను తొలగించండి',
        deleteProjectionMessage: 'ఈ ప్రొజెక్షన్ మోడల్‌ను తొలగించాలా?',
        cannotDeleteTitle: 'తొలగించలేము',
        // Vision control strings
        visionControls: {
          enableVision: 'విజన్ ఫీచర్‌ను ప్రారంభించండి',
          disableVision: 'విజన్ ఫీచర్‌ను నిలిపివేయండి',
          visionEnabled: 'విజన్ ప్రారంభించబడింది',
          visionDisabled: 'విజన్ నిలిపివేయబడింది',
          textOnlyMode: 'టెక్స్ట్ మాత్రమే',
          visionMode: 'విజన్ ప్రారంభించబడింది',
          downloadWithVision: 'విజన్‌తో డౌన్‌లోడ్',
          downloadTextOnly: 'టెక్స్ట్ మాత్రమే డౌన్‌లోడ్',
          visionToggleDescription: 'చిత్ర ప్రాసెసింగ్ ఫీచర్‌ను ప్రారంభించండి',
          projectionModelSize: '+{size} ప్రొజెక్షన్ మోడల్',
          visionModeDescription: 'చిత్రాలు మరియు టెక్స్ట్‌ను ప్రాసెస్ చేయండి',
          textOnlyModeDescription: 'టెక్స్ట్ మాత్రమే ప్రాసెస్ చేయండి',
          includesVisionCapability: 'విజన్ సామర్థ్యం ఉంది',
          requiresProjectionModel:
            'ముందుగా అనుకూలమైన ప్రొజెక్షన్ మోడల్‌ను డౌన్‌లోడ్ చేయండి',
        },
        cannotDeleteActive: 'ఈ ప్రొజెక్షన్ మోడల్ ప్రస్తుతం సక్రియంగా ఉంది',
        cannotDeleteInUse:
          'ఈ ప్రొజెక్షన్ మోడల్ డౌన్‌లోడ్ చేయబడిన LLM మోడల్‌లలో ఉపయోగించబడుతోంది:',
        dependentModels: 'ఆధారపడిన మోడల్‌లు:',
        visionWillBeDisabled: 'ఈ మోడల్‌ల విజన్ ఫీచర్‌లు నిలిపివేయబడతాయి',
      },
      buttons: {
        addFromHuggingFace: 'Hugging Face నుండి జోడించండి',
        addLocalModel: 'స్థానిక మోడల్‌ను జోడించండి',
        reset: 'రీసెట్',
      },
      modelsHeaderRight: {
        menuTitleHf: 'Hugging Face మోడల్‌లు',
        menuTitleDownloaded: 'డౌన్‌లోడ్ చేయబడిన మోడల్‌లు',
        menuTitleGrouped: 'మోడల్ రకం ద్వారా సమూహం చేయండి',
        menuTitleReset: 'మోడల్ జాబితాను రీసెట్ చేయండి',
      },
      modelsResetDialog: {
        proceedWithReset: 'రీసెట్‌తో కొనసాగించండి',
        confirmReset: 'రీసెట్‌ను నిర్ధారించండి',
      },
      chatTemplate: {
        label: 'ప్రాథమిక చాట్ టెంప్లేట్:',
      },
      details: {
        title: 'అందుబాటులో ఉన్న GGUF ఫైల్‌లు',
      },
      modelFile: {
        alerts: {
          cannotRemoveTitle: 'తొలగించలేము',
          modelPreset: 'ఈ మోడల్ ప్రీసెట్',
          downloadedFirst:
            'మోడల్ డౌన్‌లోడ్ చేయబడింది, ముందుగా ఫైల్‌ను తొలగించండి',
          removeTitle: 'మోడల్‌ను తొలగించండి',
          removeMessage: 'ఈ మోడల్‌ను జాబితా నుండి తొలగించాలా?',
          removeError: 'మోడల్ తొలగింపు విఫలమైంది',
          alreadyDownloadedTitle: 'ఇప్పటికే డౌన్‌లోడ్ చేయబడింది',
          alreadyDownloadedMessage: 'ఈ మోడల్ ఇప్పటికే డౌన్‌లోడ్ చేయబడింది',
          deleteTitle: 'మోడల్‌ను తొలగించండి',
          deleteMessage:
            'ఈ డౌన్‌లోడ్ చేయబడిన మోడల్‌ను తొలగించాలా?',
        },
        buttons: {
          remove: 'తొలగించండి',
        },
        warnings: {
          storage: {
            message: 'తగినంత స్టోరేజ్ సామర్థ్యం లేదు',
            shortMessage: 'స్టోరేజ్ సామర్థ్యం తక్కువ',
          },
          memory: {
            message:
              'మోడల్ సైజు పరికరం యొక్క మొత్తం మెమరీని సమీపించింది లేదా మించింది, ఊహించని ప్రవర్తన సంభవించవచ్చు',
          },
          legacy: {
            message:
              'పాత క్వాంటైజేషన్ ఫార్మాట్ - మోడల్ అమలు కాకపోవచ్చు',
            shortMessage: 'పాత క్వాంటైజేషన్',
          },
          multiple: '{count} హెచ్చరికలు',
        },
        labels: {
          downloadSpeed: '{speed}',
        },
      },
      search: {
        noResults: 'మోడల్‌లు కనుగొనబడలేదు',
        loadingMore: 'లోడ్ అవుతోంది...',
        searchPlaceholder: 'Hugging Face మోడల్‌లను శోధించండి',
        modelUpdatedLong: '{{time}}కు ముందు నవీకరించబడింది',
        modelUpdatedShort: '{{time}} ముందు',
        modelUpdatedJustNowLong: 'ఇప్పుడే నవీకరించబడింది',
        modelUpdatedJustNowShort: 'ఇప్పుడే',
        errorOccurred: 'మోడల్‌లను లోడ్ చేయడంలో విఫలమైంది, మళ్లీ ప్రయత్నించండి',
      },
      modelCard: {
        alerts: {
          deleteTitle: 'మోడల్‌ను తొలగించండి',
          deleteMessage:
            'ఈ డౌన్‌లోడ్ చేయబడిన మోడల్‌ను తొలగించాలా?',
          removeTitle: 'మోడల్‌ను తొలగించండి',
          removeMessage: 'ఈ మోడల్‌ను జాబితా నుండి తొలగించాలా?',
        },
        buttons: {
          settings: 'సెట్టింగ్‌లు',
          download: 'డౌన్‌లోడ్',
          remove: 'తొలగించండి',
          load: 'లోడ్',
          offload: 'ఆఫ్‌లోడ్',
        },
        labels: {
          skills: 'నైపుణ్యాలు: ',
        },
      },
      modelSettings: {
        template: {
          label: 'టెంప్లేట్:',
          editButton: 'సవరించు',
          dialogTitle: 'చాట్ టెంప్లేట్‌ను సవరించండి',
          note1:
            'గమనిక: టెంప్లేట్‌ను మార్చడం వలన ప్రారంభ టోకెన్, ముగింపు టోకెన్, సిస్టమ్ ప్రాంప్ట్ మారవచ్చు',
          note2:
            'Nunjucksను ఉపయోగిస్తుంది, ఖాళీగా ఉంటే మోడల్ యొక్క డిఫాల్ట్ టెంప్లేట్ ఉపయోగించబడుతుంది',
          placeholder: 'చాట్ టెంప్లేట్‌ను ఇక్కడ ఎంటర్ చేయండి...',
          closeButton: 'మూసివేయండి',
        },
        stopWords: {
          label: 'స్టాప్ వర్డ్స్',
          placeholder: 'కొత్త స్టాప్ వర్డ్‌ను జోడించండి',
        },
        tokenSettings: {
          bos: 'ప్రారంభం',
          eos: 'ముగింపు',
          addGenerationPrompt: 'ఉత్పత్తి ప్రాంప్ట్‌ను జోడించండి',
          bosTokenPlaceholder: 'ప్రారంభ టోకెన్',
          eosTokenPlaceholder: 'ముగింపు టోకెన్',
          systemPrompt: 'సిస్టమ్ ప్రాంప్ట్',
        },
      },
      modelDescription: {
        size: 'సైజు: ',
        parameters: 'పారామీటర్లు: ',
        separator: ' | ',
        notAvailable: 'తెలియదు',
      },
      modelCapabilities: {
        questionAnswering: 'ప్రశ్న సమాధానం',
        summarization: 'సంగ్రహణ',
        reasoning: 'తార్కికం',
        roleplay: 'పాత్రాభినయం',
        instructions: 'సూచనలకు స్పందన',
        code: 'కోడ్ ఉత్పత్తి',
        math: 'గణిత సమస్యల పరిష్కారం',
        multilingual: 'బహుభాషా సామర్థ్యం',
        rewriting: 'వ్యాస రచన మళ్లీ రాయడం',
        creativity: 'సృజనాత్మక రచన',
        vision: 'విజన్',
      },
    },
    completionParams: {
      include_thinking_in_context:
        'AI యొక్క ఆలోచన/తార్కిక భాగాన్ని మోడల్‌కు పంపే సందర్భంలో చేర్చండి, దీన్ని నిలిపివేయడం వలన సందర్భ సామర్థ్యాన్ని ఆదా చేయవచ్చు కానీ పనితీరుపై ప్రభావం పడవచ్చు',
      jinja:
        'చాట్ ఫార్మాట్‌కు Jinja టెంప్లేట్‌ను ఉపయోగిస్తుంది, ప్రారంభించినట్లయితే, తాజా మోడల్‌లతో అనుకూలతను మెరుగుపరచడానికి Jinja ఆధారిత చాట్ టెంప్లేట్ ప్రాసెసింగ్‌ను ఉపయోగిస్తుంది',
      grammar:
        'ఉత్పత్తి చేయబడిన టెక్స్ట్ నిర్దిష్ట నిర్మాణం లేదా ఫార్మాట్‌ను అనుసరించేలా వ్యాకరణ నియమాలను వర్తింపజేస్తుంది',
      stop: 'టెక్స్ట్ ఉత్పత్తిని ఆపడానికి నిర్దిష్ట పదబంధాలను సెట్ చేస్తుంది',
      n_predict: 'ఉత్పత్తి చేయబడే స్పందన యొక్క పొడవును టోకెన్‌లలో సెట్ చేస్తుంది',
      n_probs: 'ప్రత్యామ్నాయ పదాల యొక్క సంభావ్యత స్కోర్‌లను ప్రదర్శిస్తుంది',
      top_k:
        'అత్యంత సంభావ్యమైన K ఎంపికలకు పద ఎంపికను పరిమితం చేయడం ద్వారా సృజనాత్మకతను నియంత్రిస్తుంది, తక్కువ విలువలు స్పందనను మరింత దృష్టి కేంద్రీకరించినవిగా చేస్తాయి',
      top_p:
        'సృజనాత్మకత మరియు స్థిరత్వం మధ్య సమతుల్యతను సర్దుబాటు చేస్తుంది, ఎక్కువ విలువలు (1.0కు సమీపంలో) మరింత సృజనాత్మకమైన కానీ తక్కువ దృష్టి ఉన్న స్పందనలను ఉత్పత్తి చేయవచ్చు',
      min_p:
        'టోకెన్ పరిగణించబడే కనీస సంభావ్యత, తక్కువ సంభావ్యత ఉన్న పదాలను మినహాయించడం ద్వారా అసహజ లేదా సందర్భానికి తగని స్పందనలను తగ్గిస్తుంది',
      temperature:
        'సృజనాత్మకత మరియు ఊహాజన్యతను నియంత్రిస్తుంది, ఎక్కువ విలువలు స్పందనను మరింత సృజనాత్మకంగా కానీ తక్కువ దృష్టి ఉన్నవిగా చేస్తాయి',
      penalty_last_n:
        'పునరావృత్తిని తనిఖీ చేసే పరిధి, పెద్ద విలువలు దీర్ఘకాలిక పునరావృత్తిని నిరోధిస్తాయి',
      penalty_repeat:
        'పద పునరావృత్తిని అణచివేస్తుంది, ఎక్కువ విలువలు స్పందనలో మరింత వైవిధ్యమైన వ్యక్తీకరణలను ఉపయోగిస్తాయి',
      penalty_freq:
        'తరచూ ఉపయోగించే పదాలకు జరిమానా విధిస్తుంది, ఎక్కువ విలువలు విస్తృతమైన శబ్దసామర్థ్యం వాడకాన్ని ప్రోత్సహిస్తాయి',
      penalty_present:
        'థీమ్ లేదా ఆలోచనల పునరావృత్తిని తగ్గిస్తుంది, ఎక్కువ విలువలు మరింత వైవిధ్యమైన కంటెంట్‌ను ఉత్పత్తి చేస్తాయి',
      mirostat:
        'స్పందన యొక్క సృజనాత్మకతను అధికంగా నియంత్రిస్తుంది, 1 లేదా 2 (మరింత సున్నితంగా) సెట్ చేయడం ద్వారా యాదృచ్ఛికత మరియు స్థిరత్వాన్ని రియల్-టైమ్‌లో సర్దుబాటు చేస్తుంది',
      mirostat_tau:
        'Mirostat యొక్క సృజనాత్మకత స్థాయిని సెట్ చేస్తుంది, ఎక్కువ విలువలు మరింత వైవిధ్యమైన మరియు ఊహాత్మక స్పందనలను, తక్కువ విలువలు మరింత దృష్టి కేంద్రీకరించిన అవుట్‌పుట్‌ను ఇస్తాయి',
      mirostat_eta:
        'Mirostat సృజనాత్మకతను సర్దుబాటు చేసే వేగం, ఎక్కువ విలువలు వేగవంతమైన సర్దుబాటును ఇస్తాయి',
      dry_multiplier:
        'DRY (డోంట్ రిపీట్ యువర్‌సెల్ఫ్) ఫీచర్ యొక్క బలాన్ని సెట్ చేస్తుంది, ఎక్కువ విలువలు పునరావృత్తిని గట్టిగా నిరోధిస్తాయి',
      dry_base:
        'DRY మోడ్‌లో పునరావృత్తికి వ్యతిరేకంగా బేస్ జరిమానా, ఎక్కువ విలువలు పునరావృత్తిని మరింత నిరోధిస్తాయి',
      dry_allowed_length:
        'DRY జరిమానా వర్తించే ముందు పునరావృత్తి చేయగల పదాల సంఖ్య',
      dry_penalty_last_n: 'DRY మోడ్‌లో పునరావృత్తిని తనిఖీ చేసే పరిధి',
      dry_sequence_breakers:
        'DRY మోడ్‌లో పునరావృత్తి తనిఖీని రీసెట్ చేసే చిహ్నాలు',
      ignore_eos:
        'మోడల్ ఆగిపోయినా ఉత్పత్తిని కొనసాగిస్తుంది, ఎక్కువ స్పందనలను బలవంతంగా చేయడానికి సహాయపడుతుంది',
      logit_bias: 'నిర్దిష్ట పదాలు స్పందనలో కనిపించే సంభావ్యతను సర్దుబాటు చేస్తుంది',
      seed: 'యాదృచ్ఛిక సంఖ్య ఉత్పత్తికి సీడ్‌ను సెట్ చేస్తుంది, పునరావృత్తి చేయగల ఫలితాలకు సహాయపడుతుంది',
      xtc_probability:
        'XTC సాంప్లర్ ద్వారా టోకెన్ తొలగింపు యొక్క సంభావ్యతను సెట్ చేస్తుంది, 0 అంటే నిలిపివేయబడింది',
      xtc_threshold:
        'XTC సాంప్లర్ ద్వారా తొలగించబడే టోకెన్‌ల కనీస సంభావ్యత థ్రెషోల్డ్‌ను సెట్ చేస్తుంది, 0.5 కంటే ఎక్కువగా ఉంటే XTC నిలిపివేయబడుతుంది',
      typical_p:
        'పారామీటర్ pని ఉపయోగించి స్థానికంగా సాధారణ సాంప్లింగ్‌ను ప్రారంభిస్తుంది, 1.0 అంటే నిలిపివేయబడింది',
    },
    about: {
      screenTitle: 'యాప్ సమాచారం',
      description:
        'నేను ప్రస్తుతం ఇంటర్నెట్ అవసరం లేకుండా నేరుగా పరికరాలలో రన్ అయ్యే ఆఫ్‌లైన్ AI చాట్‌బాట్‌ను నిర్మిస్తున్నాను. క్లౌడ్-ఆధారిత బాట్‌లకు భిన్నంగా, ఈ చాట్‌బాట్ AI మోడల్‌లను స్థానికంగా లోడ్ చేస్తుంది, వేగవంతమైన ప్రతిస్పందన సమయాలు, గోప్యత మరియు తక్కువ కనెక్టివిటీ ప్రాంతాలలో కూడా అందుబాటును నిర్ధారిస్తుంది. విద్యార్థులు, వృత్తిపరులు మరియు వ్యాపారాలకు AIని అందుబాటులో, తేలికగా మరియు ఆచరణాత్మకంగా చేయడంపై నా దృష్టి ఉంది.',
      developerTitle: '👤 నా గురించి',
      developerDescription:
        'పేరు: పవన్‌కుమార్ స్వామి శేషెట్టి\nఇమెయిల్: shesettipavankumarswamy@gmail.com\nమొబైల్: +91 8639122823\n🌐 వెబ్‌సైట్: pavankumarswamys.link',
      educationTitle: '🎓 విద్య',
      educationList: [
        '• B.Tech – 3వ సంవత్సరం, కంప్యూటర్ సైన్స్ ఇంజనీరింగ్',
        '  గోదావరి ఇన్స్టిట్యూట్ ఆఫ్ ఇంజనీరింగ్ & టెక్నాలజీ, రాజమహేంద్రవరం, ఆంధ్రప్రదేశ్',
        '  🔗 giet.ac.in',
        '',
        '• డిప్లొమా – కంప్యూటర్ సైన్స్ ఇంజనీరింగ్',
        '  శ్రీ జ్యోతి పాలిటెక్నిక్ కాలేజ్, విజయవాడ',
        '  🔗 srijyothipolytechnic.com',
        '',
        '• పాఠశాల – తరగతి 1 నుండి 10',
        '  శ్రీ నాగరాజ మునిసిపల్ కార్పొరేషన్ హై స్కూల్'
      ],
      skillsTitle: '🚀 నైపుణ్యాలు & ఆసక్తులు',
      skillsList: [
        '• కృత్రిమ మేధస్సు & మెషిన్ లెర్నింగ్',
        '• ఆఫ్‌లైన్ AI అప్లికేషన్లు (లోకల్ AI మోడల్ డిప్లాయ్‌మెంట్)',
        '• చాట్‌బాట్ డెవలప్‌మెంట్ (వాట్సాప్, వెబ్, మొబైల్)',
        '• ఫుల్ స్టాక్ డెవలప్‌మెంట్ (Flutter, Node.js, React)',
        '• క్లౌడ్ & డిప్లాయ్‌మెంట్ (Firebase, Supabase, Render)'
      ],
      latestProjectTitle: 'ప్రస్తుత ప్రాజెక్ట్',
      latestProjectName: 'Pocket-AI',
      latestProjectDescription:
        'ఇంటర్నెట్ అవసరం లేకుండా నేరుగా పరికరాలలో రన్ అయ్యే ఆఫ్‌లైన్ AI చాట్‌బాట్, గోప్యత, వేగం మరియు అందుబాటును నిర్ధారిస్తుంది.',
      connectTitle: '💼 నాతో కనెక్ట్ అవ్వండి',
      linkedinButton: 'లింక్డ్‌ఇన్ ప్రొఫైల్',
      githubProfileButton: 'గిట్‌హబ్ ప్రొఫైల్',
      websiteButton: 'వెబ్‌సైట్ సందర్శించండి',
      emailButton: 'ఇమెయిల్ పంపండి',
      versionCopiedTitle: 'వెర్షన్ కాపీ చేయబడింది',
      versionCopiedDescription:
        'వెర్షన్ సమాచారం క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది',
    },
    feedback: {
      title: 'ఫీడ్‌బ్యాక్ పంపండి',
      description:
        'మీ అభిప్రాయాలను తెలియజేయండి! Pocket AI యొక్క వినియోగ అనుభవం లేదా మరింత సౌకర్యవంతంగా చేయడానికి ఆలోచనలను పంచుకోండి',
      shareThoughtsButton: 'మీ అభిప్రాయాలను పంచుకోండి',
      useCase: {
        label: 'మీరు Pocket AIని ఎలా ఉపయోగిస్తున్నారు?',
        placeholder: 'ఉదాహరణ: సంగ్రహణ, పాత్రాభినయం మొదలైనవి',
      },
      featureRequests: {
        label: 'కోరుకునే ఫీచర్‌లు',
        placeholder: 'జోడించాలనుకునే ఫీచర్‌లను తెలియజేయండి',
      },
      generalFeedback: {
        label: 'సాధారణ అభిప్రాయం',
        placeholder: 'ఇతర అభిప్రాయాలు లేదా ఆలోచనలను తెలియజేయండి',
      },
      usageFrequency: {
        label: 'మీరు ఎంత తరచుగా ఉపయోగిస్తున్నారు? (ఐచ్ఛికం)',
        options: {
          daily: 'రోజూ',
          weekly: 'వారానికి ఒకసారి లేదా ఎక్కువ',
          monthly: 'నెలకు ఒకసారి లేదా ఎక్కువ',
          rarely: 'ఎప్పుడూ ఉపయోగించలేదు',
        },
      },
      email: {
        label: 'సంప్రదింపు ఇమెయిల్ (ఐచ్ఛికం)',
        placeholder: 'ఇమెయిల్ చిరునామా',
      },
      submit: 'ఫీడ్‌బ్యాక్ పంపండి',
      validation: {
        required: 'ఫీడ్‌బ్యాక్ కంటెంట్‌ను ఎంటర్ చేయండి',
      },
      success: 'ఫీడ్‌బ్యాక్‌కు ధన్యవాదాలు!',
      error: {
        general:
          'ఫీడ్‌బ్యాక్ పంపడంలో లోపం సంభవించింది, మళ్లీ ప్రయత్నించండి',
      },
    },

    components: {
      attachmentButton: {
        attachmentButtonAccessibilityLabel: 'మీడియాను పంపండి',
      },
      bubble: {
        timingsString:
          'టోకెన్‌కు {{predictedMs}}ms, సెకనుకు {{predictedPerSecond}} టోకెన్‌లు',
      },
      exportUtils: {
        fileSaved: 'ఫైల్ సేవ్ చేయబడింది',
        fileSavedMessage:
          'ఫైల్ డౌన్‌లోడ్ ఫోల్డర్‌లో {{filename}}గా సేవ్ చేయబడింది',
        share: 'షేర్',
        ok: 'సరే',
        shareError: 'షేర్ ఎర్రర్',
        shareErrorMessage:
          'ఫైల్‌ను షేర్ చేయడంలో విఫలమైంది, మళ్లీ ప్రయత్నించండి',
        saveError: 'డౌన్‌లోడ్ ఫోల్డర్‌కు సేవ్ చేయడంలో ఎర్రర్',
        saveOptions: 'సేవ్ ఆప్షన్లు',
        saveOptionsMessage:
          'డౌన్‌లోడ్ ఫోల్డర్‌లో నేరుగా సేవ్ చేయలేము, బదులుగా ఫైల్‌ను షేర్ చేయాలా?',
        cancel: 'రద్దు',
        shareContentErrorMessage:
          'కంటెంట్‌ను షేర్ చేయడంలో విఫలమైంది, మళ్లీ ప్రయత్నించండి',
        exportError: 'ఎక్స్‌పోర్ట్ ఎర్రర్',
        exportErrorMessage:
          'ఫైల్ ఎక్స్‌పోర్ట్ చేసేటప్పుడు లోపం సంభవించింది, మళ్లీ ప్రయత్నించండి',
        permissionRequired: 'స్టోరేజ్ యాక్సెస్ అనుమతి అవసరం',
        permissionMessage:
          'డౌన్‌లోడ్ ఫోల్డర్‌లో ఫైల్‌లను సేవ్ చేయడానికి అనుమతి అవసరం',
        permissionDenied: 'యాక్సెస్ అనుమతి నిరాకరించబడింది',
        permissionDeniedMessage:
          'స్టోరేజ్ యాక్సెస్ అనుమతి లేనందున ఎక్స్‌పోర్ట్ ఫీచర్ అందుబాటులో లేదు',
        continue: 'కొనసాగించండి',
      },
      thinkingBubble: {
        reasoning: 'ఆలోచన',
      },
      chatEmptyPlaceholder: {
        noModelsTitle: 'అందుబాటులో ఉన్న మోడల్‌లు లేవు',
        noModelsDescription:
          'Pocketతో చాట్ ప్రారంభించడానికి మోడల్‌ను డౌన్‌లోడ్ చేయండి',
        noModelsButton: 'మోడల్‌ను డౌన్‌లోడ్ చేయండి',
        activateModelTitle: 'ప్రారంభించడానికి మోడల్‌ను సక్రియం చేయండి',
        activateModelDescription:
          'మోడల్‌ను ఎంచుకుని డౌన్‌లోడ్ చేయండి, డౌన్‌లోడ్ తర్వాత, చాట్ ప్రారంభించడానికి మోడల్ పక్కన ఉన్న లోడ్‌ను ట్యాప్ చేయండి',
        activateModelButton: 'మోడల్‌ను ఎంచుకోండి',
        loading: 'లోడ్ అవుతోంది...',
      },
      chatInput: {
        inputPlaceholder: 'సందేశాన్ని ఎంటర్ చేయండి',
        thinkingToggle: {
          enableThinking: 'ఆలోచన మోడ్‌ను ప్రారంభించండి',
          disableThinking: 'ఆలోచన మోడ్‌ను నిలిపివేయండి',
          thinkingEnabled: 'ఆలోచన మోడ్ ప్రారంభించబడింది',
          thinkingDisabled: 'ఆలోచన మోడ్ నిలిపివేయబడింది',
          thinkText: 'ఆలోచన',
        },
      },
      contentReportSheet: {
        title: 'కంటెంట్‌ను రిపోర్ట్ చేయండి',
        privacyNote:
          'సందేశ కంటెంట్ లేదా సంభాషణ వివరాలు పంపబడవు. ఎదుర్కొన్న నిర్దిష్ట సమస్యను వివరించండి.',
        categoryLabel: 'రిపోర్ట్ కేటగిరీ',
        selectCategory: 'కేటగిరీని ఎంచుకోండి',
        categories: {
          hate: 'ద్వేషపూరిత ప్రసంగం',
          sexual: 'లైంగిక కంటెంట్',
          selfHarm: 'స్వీయ హాని',
          violence: 'హింస',
          other: 'ఇతర',
        },
        descriptionLabel: 'వివరణ',
        descriptionPlaceholder:
          'ఈ కంటెంట్‌లో సమస్య గురించి వివరించండి...',
        includeModelInfo: 'మోడల్ సమాచారాన్ని చేర్చండి',
        includeModelInfoDescription:
          'పరిశోధనకు సహాయపడటానికి మోడల్ పేరు మరియు గుర్తింపును చేర్చండి',
        noActiveModelNote: 'ప్రస్తుతం సక్రియ మోడల్ లేదు',
        submit: 'రిపోర్ట్‌ను పంపండి',
        validation: {
          title: 'సమాచారం లోపించింది',
          message: 'కేటగిరీని ఎంచుకోండి మరియు వివరణను ఎంటర్ చేయండి.',
        },
        success: {
          title: 'రిపోర్ట్ పంపబడింది',
          message:
            'మీ రిపోర్ట్‌కు ధన్యవాదాలు. కంటెంట్‌ను సమీక్షించి తగిన చర్యలు తీసుకుంటాము.',
        },
        error: {
          title: 'రిపోర్ట్ విఫలమైంది',
          message: 'రిపోర్ట్ పంపడంలో విఫలమైంది. మళ్లీ ప్రయత్నించండి.',
        },
      },
      chatGenerationSettingsSheet: {
        invalidValues: 'చెల్లని విలువలు',
        invalidNumericValuesMessage: 'చెల్లుబాటు అయ్యే సంఖ్యాత్మక విలువలను ఎంటర్ చేయండి',
        pleaseCorrect: 'దయచేసి ఈ క్రింది వాటిని సరిచేయండి:',
        ok: 'సరే',
        saveChanges: 'మార్పులను సేవ్ చేయండి',
        saveAsPreset: 'ప్రీసెట్‌గా సేవ్ చేయండి',
        title_session: 'చాట్ ఉత్పత్తి సెట్టింగ్‌లు (సెషన్)',
        title_preset: 'చాట్ ఉత్పత్తి సెట్టింగ్‌లు (ప్రీసెట్)',
        resetToSystemDefaults: 'సిస్టమ్ డిఫాల్ట్‌లకు రీసెట్ చేయండి',
        resetToPreset: 'ప్రీసెట్‌కు రీసెట్ చేయండి',
        applytoPresetAlert: {
          title: 'సేవ్ చేయబడింది',
          message: 'ఈ సెట్టింగ్‌లు ఇకపై అన్ని సెషన్‌లకు వర్తిస్తాయి',
        },
      },
      chatHeaderTitle: {
        defaultTitle: 'చాట్',
      },
      fileMessage: {
        fileButtonAccessibilityLabel: 'ఫైల్',
      },
      chatPalModelPickerSheet: {
        modelsTab: 'మోడల్‌లు',
        palsTab: 'అసిస్టెంట్‌లు',
        noPal: 'అసిస్టెంట్ లేదు',
        disablePal: 'ప్రస్తుత అసిస్టెంట్‌ను నిలిపివేయండి',
        noDescription: 'వివరణ లేదు',
        assistantType: 'అసిస్టెంట్',
        roleplayType: 'పాత్రాభినయం',
        videoType: 'వీడియో',
        confirmationTitle: 'నిర్ధారణ',
        modelSwitchMessage:
          'ఈ అసిస్టెంట్‌కు వేరే డిఫాల్ట్ మోడల్ ({{modelName}}) ఉంది, అసిస్టెంట్ యొక్క డిఫాల్ట్ మోడల్‌కు మార్చాలా?',
        keepButton: 'ప్రస్తుత మోడల్‌ను ఉపయోగించండి',
        switchButton: 'మార్చండి',
      },
      downloadErrorDialog: {
        downloadFailedTitle: 'డౌన్‌లోడ్ విఫలమైంది',
        downloadFailedMessage: 'మోడల్ డౌన్‌లోడ్ విఫలమైంది: {message}',
        unauthorizedTitle: 'ఆథంటికేషన్ విఫలమైంది',
        unauthorizedMessage:
          'Hugging Face టోకెన్ చెల్లనిది లేదా గడువు ముగిసింది, సెట్టింగ్‌లలో టోకెన్‌ను నవీకరించండి',
        forbiddenTitle: 'యాక్సెస్ నిరాకరించబడింది',
        forbiddenMessage:
          'ఈ మోడల్‌కు యాక్సెస్ చేయడానికి అనుమతి లేదు, ఈ క్రింది వాటిని తనిఖీ చేయండి:',
        forbiddenSteps: [
          'టోకెన్‌కు "రీడ్" అనుమతి ఉందని నిర్ధారించండి',
          'ఈ మోడల్‌కు యాక్సెస్‌ను రిక్వెస్ట్ చేసి, అనుమతించబడిందని నిర్ధారించండి',
          'మోడల్ యజమాని మీ యాక్సెస్ రిక్వెస్ట్‌ను ఆమోదించారని నిర్ధారించండి',
        ],
        getTokenTitle: 'Hugging Face టోకెన్‌ను పొందండి',
        getTokenMessage:
          'ఈ మోడల్‌ను డౌన్‌లోడ్ చేయడానికి Hugging Face టోకెన్ అవసరం',
        getTokenSteps: [
          'huggingface.coకు వెళ్లి సైన్ ఇన్ చేయండి',
          'సెట్టింగ్‌లు > యాక్సెస్ టోకెన్‌లకు వెళ్ళండి',
          '"రీడ్" యాక్సెస్‌తో కొత్త టోకెన్‌ను సృష్టించండి',
          'టోకెన్‌ను కాపీ చేసి టోకెన్ ఫీల్డ్‌లో అతికించండి',
        ],
        tokenDisabledTitle: 'టోకెన్ నిలిపివేయబడింది',
        tokenDisabledMessage:
          'Hugging Face టోకెన్ సెట్ చేయబడింది కానీ ప్రస్తుతం నిలిపివేయబడింది, ఈ మోడల్‌ను డౌన్‌లోడ్ చేయడానికి టోకెన్ అవసరం, కొనసాగడానికి టోకెన్‌ను ప్రారంభించండి',
        enableAndRetry: 'టోకెన్‌ను ప్రారంభించి మళ్లీ ప్రయత్నించండి',
        goToSettings: 'సెట్టింగ్‌లకు వెళ్ళండి',
        tryAgain: 'మళ్లీ ప్రయత్నించండి',
        viewOnHuggingFace: 'HFలో మోడల్‌ను వీక్షించండి ↗',
      },
      headerRight: {
        deleteChatTitle: 'చాట్‌ను తొలగించండి',
        deleteChatMessage: 'ఈ చాట్‌ను తొలగించాలా?',
        generationSettings: 'ఉత్పత్తి సెట్టింగ్‌లు',
        model: 'మోడల్',
        duplicateChatHistory: 'చాట్ హిస్టరీని డూప్లికేట్ చేయండి',
        makeChatTemporary: 'చాట్‌ను తాత్కాలికంగా చేయండి',
        export: 'ఎక్స్‌పోర్ట్/ఇంపోర్ట్',
        exportCurrentSession: 'ప్రస్తుత సెషన్‌ను ఎక్స్‌పోర్ట్ చేయండి',
        exportAllSessions: 'అన్ని సెషన్‌లను ఎక్స్‌పోర్ట్ చేయండి',
        exportChatSession: 'చాట్‌ను ఎక్స్‌పోర్ట్ చేయండి',
        importSessions: 'సెషన్‌లను ఇంపోర్ట్ చేయండి',
      },
      hfTokenSheet: {
        title: 'Hugging Face టోకెన్',
        description: 'పరిమిత మోడల్‌లకు యాక్సెస్ చేయడానికి అవసరం',
        inputLabel: 'వ్యక్తిగత యాక్సెస్ టోకెన్',
        inputPlaceholder: 'టోకెన్‌ను ఇక్కడ అతికించండి',
        save: 'టోకెన్‌ను సేవ్ చేయండి',
        saved: 'టోకెన్ విజయవంతంగా సేవ్ చేయబడింది',
        reset: 'టోకెన్‌ను రీసెట్ చేయండి',
        resetSuccess: 'టోకెన్ విజయవంతంగా తొలగించబడింది',
        instructions: 'టోకెన్‌ను పొందే విధానం:',
        instructionsSteps: [
          'huggingface.coకు సైన్ ఇన్ చేయండి',
          'సెట్టింగ్‌లు > యాక్సెస్ టోకెన్‌లకు వెళ్ళండి',
          '"read" అనుమతితో కొత్త టోకెన్‌ను సృష్టించండి',
          'టోకెన్‌ను కాపీ చేసి క్రింద అతికించండి',
        ],
        getTokenLink: 'huggingface.coలో టోకెన్‌ను పొందండి ↗',
        error: {
          saving: 'టోకెన్ సేవ్ చేయడంలో ఎర్రర్',
          missing: 'Hugging Face టోకెన్ అవసరం',
          invalid: 'చెల్లని లేదా గడువు ముగిసిన టోకెన్',
          gatedModelAccess: 'ఈ గేటెడ్ మోడల్‌కు యాక్సెస్ నిరాకరించబడింది',
        },
        gatedModelIndicator: 'టోకెన్ అవసరం',
        tokenRequired: 'ఈ మోడల్‌కు Hugging Face యాక్సెస్ టోకెన్ అవసరం',
        searchErrorHint:
          'Hugging Face API టోకెన్ చెల్లనిది లేదా గడువు ముగిసింది, శోధనను కొనసాగించడానికి, సెట్టింగ్‌లలో టోకెన్‌ను తొలగించండి లేదా టోకెన్ ఆథంటికేషన్‌ను నిలిపివేయండి',
        disableAndRetry: 'టోకెన్‌ను నిలిపివేయండి మరియు మళ్లీ ప్రయత్నించండి',
      },
      modelSettingsSheet: {
        modelSettings: 'మోడల్ సెట్టింగ్‌లు',
        saveChanges: 'మార్పులను సేవ్ చేయండి',
      },
      modelsHeaderRight: {
        menuTitleHf: 'Hugging Face మోడల్‌లు',
        menuTitleDownloaded: 'డౌన్‌లోడ్ చేయబడిన మోడల్‌లు',
        menuTitleGrouped: 'మోడల్ రకం ద్వారా సమూహం చేయండి',
        menuTitleReset: 'మోడల్ జాబితాను రీసెట్ చేయండి',
      },
      modelsResetDialog: {
        proceedWithReset: 'రీసెట్‌తో కొనసాగించండి',
        confirmReset: 'రీసెట్‌ను నిర్ధారించండి',
      },
      assistantPalSheet: {
        title: {
          create: 'అసిస్టెంట్‌ను సృష్టించండి',
          edit: 'అసిస్టెంట్‌ను సవరించండి',
        },
        palName: 'అసిస్టెంట్ పేరు',
        palNamePlaceholder: 'పేరు',
        defaultModel: 'డిఫాల్ట్ మోడల్',
        defaultModelPlaceholder: 'మోడల్‌ను ఎంచుకోండి',
        validation: {
          generatingPromptRequired: 'ఉత్పత్తి ప్రాంప్ట్ అవసరం',
          promptModelRequired: 'ప్రాంప్ట్ ఉత్పత్తి మోడల్ అవసరం',
        },
        create: 'సృష్టించండి',
      },
      modelNotAvailable: {
        noModelsDownloaded:
          'మోడల్‌లు డౌన్‌లోడ్ చేయబడలేదు, ముందుగా మోడల్‌ను డౌన్‌లోడ్ చేయండి',
        downloadAModel: 'మోడల్‌ను డౌన్‌లోడ్ చేయండి',
        defaultModelNotDownloaded:
          'డిఫాల్ట్ మోడల్ డౌన్‌లోడ్ చేయబడలేదు, ముందుగా డౌన్‌లోడ్ చేయండి',
        cancelDownload: 'రద్దు',
        download: 'డౌన్‌లోడ్',
      },
      roleplayPalSheet: {
        title: {
          create: 'పాత్రాభినయం సృష్టించండి',
          edit: 'పాత్రాభినయం సవరించండి',
        },
        palName: 'పేరు',
        palNamePlaceholder: 'పేరు',
        defaultModel: 'డిఫాల్ట్ మోడల్',
        defaultModelPlaceholder: 'మోడల్‌ను ఎంచుకోండి',
        descriptionSection: 'వివరణ',
        world: 'ప్రపంచం',
        worldPlaceholder: 'ఫాంటసీ',
        location: 'స్థానం',
        locationPlaceholder: 'మాయా అడవి',
        locationSublabel: 'కథ యొక్క నీటి ఎక్కడ జరుగుతుంది?',
        aiRole: 'AI పాత్ర',
        aiRolePlaceholder: 'ఎల్డారా, చిలిపి అడవి ఆత్మ',
        aiRoleSublabel: 'పాత్ర సెట్టింగ్',
        userRole: 'వినియోగదారు పాత్ర',
        userRolePlaceholder: 'లార్డ్ ఎలాండోర్, ధైర్యవంతమైన నైట్',
        userRoleSublabel: 'మీరు ఎవరిని ఆడతారు?',
        situation: 'పరిస్థితి',
        situationPlaceholder: 'రెస్క్యూ మిషన్, పజిల్ సాల్వింగ్',
        toneStyle: 'వాతావరణం/శైలి',
        toneStylePlaceholder: 'సీరియస్',
        validation: {
          promptModelRequired: 'ప్రాంప్ట్ ఉత్పత్తి మోడల్ అవసరం',
        },
        create: 'సృష్టించండి',
      },
      lookiePalSheet: {
        title: {
          create: 'Lookie అసిస్టెంట్‌ను సృష్టించండి',
          edit: 'Lookie అసిస్టెంట్‌ను సవరించండి',
        },
        palName: 'అసిస్టెంట్ పేరు',
        palNamePlaceholder: 'Lookie అసిస్టెంట్ పేరును ఎంటర్ చేయండి',
        visionModel: 'విజన్ మోడల్',
        visionModelPlaceholder: 'విజన్ మోడల్‌ను ఎంచుకోండి',
        requiredModelsSection: 'అవసరమైన మోడల్‌లు',
        captureInterval: 'క్యాప్చర్ ఇంటర్వల్',
        captureIntervalHelper: 'ఆటోమేటిక్ క్యాప్చర్ మధ్య సమయం (మిల్లీసెకండ్లలో)',
        create: 'సృష్టించండి',
      },
      sendButton: {
        accessibilityLabel: 'పంపండి',
      },
      systemPromptSection: {
        sectionTitle: 'సిస్టమ్ ప్రాంప్ట్',
        useAIPrompt: 'సిస్టమ్ ప్రాంప్ట్‌ను ఉత్పత్తి చేయడానికి AIని ఉపయోగించండి',
        modelSelector: {
          label: 'ఉత్పత్తి కోసం మోడల్‌ను ఎంచుకోండి*',
          sublabel: 'సిఫార్సు: Llama 3.2 3B లేదా Qwen2.5 3B.',
          placeholder: 'మోడల్‌ను ఎంచుకోండి',
        },
        generatingPrompt: {
          label: 'ఉత్పత్తి ప్రాంప్ట్',
          placeholder: 'ఉత్పత్తి కోసం ప్రాంప్ట్‌ను ఎంటర్ చేయండి',
        },
        buttons: {
          loadingModel: 'మోడల్‌ను లోడ్ చేస్తోంది...',
          stopGenerating: 'ఉత్పత్తిని ఆపండి',
          generatePrompt: 'సిస్టమ్ ప్రాంప్ట్‌ను ఉత్పత్తి చేయండి',
        },
        systemPrompt: {
          label: 'సిస్టమ్ ప్రాంప్ట్',
          sublabel: 'ఉత్తమ ఫలితాల కోసం స్వేచ్ఛగా సవరించండి',
          placeholder: 'మీరు సహాయకరమైన అసిస్టెంట్',
        },
        warnings: {
          promptChanged: 'సిస్టమ్ ప్రాంప్ట్ మార్చబడింది',
        },
      },
      sidebarContent: {
        menuItems: {
          chat: 'చాట్',
          models: 'మోడల్‌లు',
          pals: 'అసిస్టెంట్‌లు',
          benchmark: 'బెంచ్‌మార్క్',
          shareApp: 'యాప్‌ను షేర్ చేయండి',
          settings: 'సెట్టింగ్‌లు',
          appInfo: 'యాప్ సమాచారం',
          testCompletion: 'టెస్ట్ కంప్లీషన్',
        },
        deleteChatTitle: 'చాట్‌ను తొలగించండి',
        deleteChatMessage: 'ఈ చాట్‌ను తొలగించాలా?',
        dateGroups: {
          today: 'ఈ రోజు',
          yesterday: 'నిన్న',
          thisWeek: 'ఈ వారం',
          lastWeek: 'గత వారం',
          twoWeeksAgo: 'రెండు వారాల క్రితం',
          threeWeeksAgo: 'మూడు వారాల క్రితం',
          fourWeeksAgo: 'నాలుగు వారాల క్రితం',
          lastMonth: 'గత నెల',
          older: 'అంతకు ముందు',
        },
      },
      usageStats: {
        tooltip: {
          title: 'మెమరీ వినియోగం',
          used: 'ఉపయోగంలో: ',
          total: 'మొత్తం: ',
          usage: 'వినియోగం: ',
        },
        byteSizes: ['B', 'KB', 'MB', 'GB'],
      },
      chatView: {
        menuItems: {
          copy: 'కాపీ',
          regenerate: 'మళ్లీ ఉత్పత్తి చేయండి',
          regenerateWith: 'మళ్లీ ఉత్పత్తి చేయండి (మోడల్ ఎంపిక)',
          edit: 'సవరించు',
          reportContent: 'కంటెంట్‌ను రిపోర్ట్ చేయండి',
        },
      },
      palHeaderRight: {
        exportAllPals: 'అన్ని అసిస్టెంట్‌లను ఎక్స్‌పోర్ట్ చేయండి',
        importPals: 'అసిస్టెంట్‌లను ఇంపోర్ట్ చేయండి',
        importSuccess: '{{count}} అసిస్టెంట్‌లను ఇంపోర్ట్ చేయబడ్డాయి.',
        importError:
          'అసిస్టెంట్‌ల ఇంపోర్ట్ విఫలమైంది. ఫైల్ ఫార్మాట్‌ను తనిఖీ చేయండి.',
      },
    },
    palsScreen: {
      systemPrompt: 'సిస్టమ్ ప్రాంప్ట్',
      videoAnalysis: 'వీడియో విశ్లేషణ',
      videoAnalysisDescription:
        'పరికరం యొక్క కెమెరా నుండి వీడియో స్ట్రీమ్‌పై రియల్-టైమ్‌లో వ్యాఖ్యానం అందించే వీడియో ఆధారిత AI అసిస్టెంట్',
      captureInterval: 'క్యాప్చర్ ఇంటర్వల్',
      captureIntervalUnit: 'మిల్లీసెకండ్లు',
      world: 'ప్రపంచం',
      toneStyle: 'వాతావరణం/శైలి',
      aiRole: 'AI పాత్ర',
      userRole: 'వినియోగదారు పాత్ర',
      prompt: 'ప్రాంప్ట్',
      assistant: 'అసిస్టెంట్',
      roleplay: 'పాత్రాభినయం',
      video: 'వీడియో',
      deletePal: 'అసిస్టెంట్‌ను తొలగించండి',
      deletePalMessage: 'ఈ అసిస్టెంట్‌ను తొలగించాలా?',
      missingModel: 'మోడల్ కనుగొనబడలేదు',
      missingModelMessage:
      'ఈ అసిస్టెంట్ యొక్క డిఫాల్ట్ మోడల్ "{{modelName}}" అందుబాటులో లేదు, ఎడిట్ షీట్‌లో డౌన్‌లోడ్ చేయండి లేదా వేరే మోడల్‌ను ఎంచుకోండి',
  },
  validation: {
    nameRequired: 'పేరును ఎంటర్ చేయండి',
    systemPromptRequired: 'సిస్టమ్ ప్రాంప్ట్‌ను ఎంటర్ చేయండి',
    worldRequired: 'ప్రపంచ వివరణను ఎంటర్ చేయండి',
    locationRequired: 'స్థానాన్ని ఎంటర్ చేయండి',
    aiRoleRequired: 'AI పాత్రను ఎంటర్ చేయండి',
    userRoleRequired: 'వినియోగదారు పాత్రను ఎంటర్ చేయండి',
    situationRequired: 'పరిస్థితిని ఎంటర్ చేయండి',
    toneStyleRequired: 'వాతావరణం/శైలిని ఎంటర్ చేయండి',
  },
  camera: {
    permissionTitle: 'కెమెరా అనుమతి అవసరం',
    permissionMessage:
      'Pocket Ai చిత్రాలను విశ్లేషించడానికి కెమెరాకు యాక్సెస్ అవసరం',
    requestingPermission: 'కెమెరా అనుమతిని అభ్యర్థిస్తోంది...',
    noDevice: 'కెమెరా పరికరం కనుగొనబడలేదు',
    errorTitle: 'కెమెరా ఎర్రర్',
    errorMessage: 'ఫోటో తీసేటప్పుడు లోపం సంభవించింది',
    flip: 'తిప్పండి',
    analyzing: 'చిత్రాన్ని విశ్లేషిస్తోంది...',
    startCamera: 'కెమెరాను ప్రారంభించండి',
    stopCamera: 'కెమెరాను ఆపండి',
    promptPlaceholder: 'ఈ చిత్రం గురించి మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
    takePhoto: 'కెమెరా',
  },
  video: {
    permissionTitle: 'కెమెరా అనుమతి అవసరం',
    permissionMessage:
      'Pocket వీడియోలను విశ్లేషించడానికి కెమెరాకు యాక్సెస్ అవసరం',
    requestingPermission: 'కెమెరా అనుమతిని అభ్యర్థిస్తోంది...',
    noDevice: 'కెమెరా పరికరం కనుగొనబడలేదు',
    errorTitle: 'కెమెరా ఎర్రర్',
    errorMessage: 'కెమెరాలో లోపం సంభవించింది',
    flip: 'తిప్పండి',
    analyzing: 'వీడియోను విశ్లేషిస్తోంది...',
    startCamera: 'కెమెరాను ప్రారంభించండి',
    stopCamera: 'కెమెరాను ఆపండి',
    promptPlaceholder: 'ఈ వీడియో గురించి మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
    captureInterval: 'క్యాప్చర్ ఇంటర్వల్',
    captureIntervalUnit: 'మిల్లీసెకండ్లు',
    liveCommentary: 'లైవ్ కామెంటరీ',
    emptyPlaceholder: {
      title: 'Lookieకు స్వాగతం',
      subtitle: 'ప్రైవేట్, ఆన్-డివైస్, రియల్-టైమ్ వీడియో విశ్లేషణ',
      experimentalNotice:
        'ఇది ప్రయోగాత్మక ఫీచర్, ఖచ్చితత్వం ఎంచుకున్న మోడల్‌పై ఆధారపడి ఉంటుంది, వేగం పరికరం పనితీరుపై ఆధారపడి ఉంటుంది, కొన్ని మోడల్‌లు విఫలమవచ్చు',
      howToUse: 'ఎలా ఉపయోగించాలి:',
      step1: '• విశ్లేషణను గైడ్ చేయడానికి ప్రాంప్ట్‌ను సవరించండి (ఐచ్ఛికం)',
      step2: '• లైవ్ వీడియో విశ్లేషణను ప్రారంభించడానికి కెమెరా బటన్‌ను ట్యాప్ చేయండి',
      step3: '• కెమెరా ప్రారంభంలో స్నాప్‌షాట్ ఫ్రీక్వెన్సీని సర్దుబాటు చేయండి',
      step4: '• సాధారణ టెక్స్ట్ చాట్ కోసం వేరే అసిస్టెంట్‌కు మారండి',
    },
  },
  screenTitles: {
    chat: 'చాట్',
    models: 'మోడల్‌లు',
    pals: 'అసిస్టెంట్‌లు (ప్రయోగాత్మకం)',
    benchmark: 'బెంచ్‌మార్క్',
    settings: 'సెట్టింగ్‌లు',
    appInfo: 'యాప్ సమాచారం',
    testCompletion: 'టెస్ట్ కంప్లీషన్',
  },
  chat: {
    conversationReset: 'సంభాషణ రీసెట్ చేయబడింది',
    modelNotLoaded:
      'మోడల్ లోడ్ చేయబడలేదు, దయచేసి మోడల్‌ను ప్రారంభించండి',
    completionFailed: 'ఉత్పత్తి విఫలమైంది: ',
    loadingModel: 'మోడల్‌ను లోడ్ చేస్తోంది...',
    typeYourMessage: 'మీ సందేశాన్ని టైప్ చేయండి',
    load: 'లోడ్',
    goToModels: 'మోడల్‌లకు వెళ్ళండి',
    readyToChat: 'చాట్ ప్రారంభించడానికి సిద్ధంగా ఉంది, గతంలో ఉపయోగించిన మోడల్‌ను లోడ్ చేస్తోంది',
    pleaseLoadModel: 'చాట్ ప్రారంభించడానికి మోడల్‌ను లోడ్ చేయండి',
    multimodalNotEnabled:
      'ఈ మోడల్‌లో మల్టీమోడల్ ఫీచర్‌లు ప్రారంభించబడలేదు, చిత్రాలు ప్రదర్శించబడతాయి కానీ AI ద్వారా ప్రాసెస్ చేయబడవు',
  },
  benchmark: {
    title: 'బెంచ్‌మార్క్',
    modelSelector: {
      prompt: 'మోడల్‌ను ఎంచుకోండి',
    },
    buttons: {
      advancedSettings: 'అధునాతన సెట్టింగ్‌లు',
      startTest: 'టెస్ట్ ప్రారంభించండి',
      runningTest: 'టెస్ట్ రన్ అవుతోంది...',
      clearAll: 'అన్నీ క్లియర్ చేయండి',
      done: 'పూర్తయింది',
      cancel: 'రద్దు',
      delete: 'తొలగించండి',
      share: 'షేర్',
      sharing: 'షేర్ చేస్తోంది...',
      viewRawData: 'రా డేటాను వీక్షించండి',
      hideRawData: 'రా డేటాను దాచండి',
    },
    messages: {
      pleaseSelectModel: 'మోడల్‌ను ఎంచుకుని ప్రారంభించండి',
      testWarning:
        'గమనిక: పెద్ద మోడల్‌లలో గరిష్టంగా 2-5 నిమిషాలు పట్టవచ్చు, ప్రారంభించిన తర్వాత ఆపలేము',
      keepScreenOpen: 'స్క్రీన్‌ను తెరిచి ఉంచండి',
      initializingModel: 'మోడల్‌ను ప్రారంభిస్తోంది...',
      modelMaxValue: '(గరిష్టం: {{maxValue}})',
    },
    dialogs: {
      advancedSettings: {
        title: 'అధునాతన సెట్టింగ్‌లు',
        testProfile: 'టెస్ట్ ప్రొఫైల్',
        customParameters: 'కస్టమ్ పారామీటర్లు',
        description:
          'నిర్దిష్ట టెస్ట్ సీనారియోలకు అనుగుణంగా బెంచ్‌మార్క్ సెట్టింగ్‌లను సర్దుబాటు చేయవచ్చు',
      },
      deleteResult: {
        title: 'ఫలితాన్ని తొలగించండి',
        message: 'ఈ బెంచ్‌మార్క్ ఫలితాన్ని తొలగించాలా?',
      },
      clearAllResults: {
        title: 'అన్ని ఫలితాలను క్లియర్ చేయండి',
        message: 'అన్ని బెంచ్‌మార్క్ ఫలితాలను తొలగించాలా?',
      },
      shareResults: {
        title: 'బెంచ్‌మార్క్ ఫలితాలను షేర్ చేయండి',
        sharedDataTitle: 'షేర్ చేయబడే డేటా:',
        deviceAndModelInfo: '• పరికర స్పెసిఫికేషన్‌లు మరియు మోడల్ సమాచారం',
        performanceMetrics: '• పనితీరు మెట్రిక్‌లు',
        dontShowAgain: 'మళ్లీ చూపించవద్దు',
      },
    },
    sections: {
      testResults: 'టెస్ట్ ఫలితాలు',
    },
    benchmarkResultCard: {
      modelMeta: {
        params: 'పారామీటర్లు',
      },
      config: {
        title: 'బెంచ్‌మార్క్ సెట్టింగ్‌లు',
        format: 'PP: {{pp}} • TG: {{tg}} • PL: {{pl}} • Rep: {{nr}}',
      },
      modelSettings: {
        title: 'మోడల్ సెట్టింగ్‌లు',
        context: 'సందర్భం: {{context}}',
        batch: 'బ్యాచ్: {{batch}}',
        ubatch: 'Uబ్యాచ్: {{ubatch}}',
        cpuThreads: 'CPU థ్రెడ్‌లు: {{threads}}',
        gpuLayers: 'GPU లేయర్‌లు: {{layers}}',
        flashAttentionEnabled: 'ఫ్లాష్ అటెన్షన్ ప్రారంభించబడింది',
        flashAttentionDisabled: 'ఫ్లాష్ అటెన్షన్ నిలిపివేయబడింది',
        cacheTypes: 'క్యాష్ రకాలు: {{cacheK}}/{{cacheV}}',
      },
      results: {
        promptProcessing: 'ప్రాంప్ట్ ప్రాసెసింగ్',
        tokenGeneration: 'టోకెన్ ఉత్పత్తి',
        totalTime: 'మొత్తం సమయం',
        peakMemory: 'గరిష్ట మెమరీ వినియోగం',
        tokensPerSecond: 'టోకెన్‌లు/సెకను',
      },
      actions: {
        deleteButton: '',
        submittedText: '✓ షేర్ చేయబడిన స్థలం:',
        leaderboardLink: 'AI స్మార్ట్‌ఫోన్ లీడర్‌బోర్డ్ ↗',
        cannotShare: 'షేర్ చేయలేము',
        cannotShareTooltip: 'స్థానిక మోడల్ ఫలితాలను షేర్ చేయలేము',
        submitButton: 'లీడర్‌బోర్డ్‌కు సమర్పించండి',
        viewLeaderboard: 'లీడర్‌బోర్డ్‌ను వీక్షించండి ↗',
      },
      errors: {
        networkRetry: 'కనెక్షన్‌ను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి',
        appCheckRetry: 'సమర్పణను మళ్లీ ప్రయత్నించండి',
        serverRetry: 'తర్వాత మళ్లీ ప్రయత్నించండి',
        genericRetry: 'మళ్లీ ప్రయత్నించండి',
        failedToSubmit: 'బెంచ్‌మార్క్ ఫలితాల సమర్పణ విఫలమైంది',
      },
    },
    deviceInfoCard: {
      title: 'పరికర సమాచారం',
      deviceSummary: '{{brand}} {{model}} • {{systemName}} {{systemVersion}}',
      coreSummary: '{{cores}} కోర్‌లు • {{memory}}',
      sections: {
        basicInfo: 'ప్రాథమిక సమాచారం',
        cpuDetails: 'CPU వివరాలు',
        appInfo: 'యాప్ సమాచారం',
      },
      fields: {
        architecture: 'ఆర్కిటెక్చర్',
        totalMemory: 'మొత్తం మెమరీ',
        deviceId: 'పరికర ID',
        cpuCores: 'CPU కోర్‌ల సంఖ్య',
        cpuModel: 'CPU మోడల్',
        chipset: 'చిప్‌సెట్',
        instructions: 'ఇన్‌స్ట్రక్షన్ సెట్',
        version: 'వెర్షన్',
      },
      instructions: {
        format:
          'FP16: {{fp16}}, DotProd: {{dotProd}}, SVE: {{sve}}, I8MM: {{i8mm}}',
        yes: '✓',
        no: '✗',
      },
      versionFormat: '{{version}} ({{buildNumber}})',
    },
  },
  errors: {
    unexpectedError: 'ఊహించని లోపం సంభవించింది',
    hfAuthenticationError:
      'Hugging Face ఆథంటికేషన్ ఎర్రర్: టోకెన్ కనుగొనబడలేదు లేదా చెల్లనిది',
    hfAuthenticationErrorSearch:
      'Hugging Face ఆథంటికేషన్ ఎర్రర్: టోకెన్ కనుగొనబడలేదు లేదా చెల్లనిది',
    authenticationError: 'ఆథంటికేషన్ ఎర్రర్: టోకెన్ కనుగొనబడలేదు లేదా చెల్లనిది',
    hfAuthorizationError:
      'Hugging Face ఆథరైజేషన్ ఎర్రర్: ఈ రిసోర్స్‌కు యాక్సెస్ చేయడానికి అనుమతి లేదు',
    authorizationError:
      'ఆథరైజేషన్ ఎర్రర్: ఈ రిసోర్స్‌కు యాక్సెస్ చేయడానికి అనుమతి లేదు',
    hfServerError: 'Hugging Face సర్వర్ ఎర్రర్: API సర్వర్ సమస్య',
    serverError: 'సర్వర్ ఎర్రర్: API సర్వర్ సమస్య',
    hfNetworkTimeout:
      'నెట్‌వర్క్ టైమ్‌అవుట్: Hugging Faceకు రిక్వెస్ట్ పూర్తి కావడానికి చాలా సమయం పట్టింది',
    networkTimeout:
      'నెట్‌వర్క్ టైమ్‌అవుట్: రిక్వెస్ట్ పూర్తి కావడానికి చాలా సమయం పట్టింది',
    hfNetworkError: 'నెట్‌వర్క్ ఎర్రర్: Hugging Face APIకి కనెక్ట్ కాలేదు',
    networkError: 'నెట్‌వర్క్ ఎర్రర్: APIకి కనెక్ట్ కాలేదు',
    downloadSetupFailedTitle: 'డౌన్‌లోడ్ సెటప్ విఫలమైంది',
    downloadSetupFailedMessage:
      'మోడల్ డౌన్‌లోడ్ సిద్ధం చేయడంలో విఫలమైంది: {message}',
    cameraErrorTitle: 'కెమెరా ఎర్రర్',
    cameraErrorMessage: 'ఫోటో తీయడంలో విఫలమైంది',
    galleryErrorTitle: 'గ్యాలరీ ఎర్రర్',
    galleryErrorMessage: 'చిత్ర ఎంపికలో విఫలమైంది',
  },
  simulator: {
    cameraNotAvailable:
      'సిమ్యులేటర్‌లో కెమెరాను ఉపయోగించలేము, దయచేసి రియల్ డివైస్‌ను ఉపయోగించండి',
  },
},

hi: {
  common: {
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    dismiss: 'खारिज करें',
    rename: 'नाम बदलें',
    reset: 'रीसेट करें',
    save: 'सहेजें',
    update: 'अपडेट करें',
    networkError: 'नेटवर्क त्रुटि, कृपया पुनः प्रयास करें',
    downloadETA: 'अनुमानित समय',
    calculating: 'गणना हो रही है...',
    second: 'सेकंड',
    seconds: 'सेकंड',
    year: 'वर्ष',
    years: 'वर्ष',
    month: 'महीना',
    months: 'महीने',
    week: 'सप्ताह',
    weeks: 'सप्ताह',
    day: 'दिन',
    days: 'दिन',
    hour: 'घंटा',
    hours: 'घंटे',
    minute: 'मिनट',
    minutes: 'मिनट',
    justNow: 'अभी',
    ok: 'ठीक है',
    close: 'बंद करें',
    clear: 'सब हटाएं',
    gallery: 'गैलरी',
  },
  settings: {
    // Model Initialization Settings
    modelInitializationSettings: 'मॉडल प्रारंभिक सेटिंग्स',
    // Metal Settings
    metal: 'मेटल',
    metalDescription: 'ऐप्पल का हार्डवेयर त्वरण API',
    metalRequiresNewerIOS: 'मेटल त्वरण के लिए iOS 18 या उच्चतर की आवश्यकता है, कृपया इस सुविधा का उपयोग करने के लिए डिवाइस अपग्रेड करें',
    layersOnGPU: 'GPU परतें: {{gpuLayers}}',
    // Context Size
    contextSize: 'संदर्भ आकार',
    contextSizePlaceholder: 'संदर्भ आकार दर्ज करें (न्यूनतम {{minContextSize}})',
    invalidContextSizeError: 'कृपया एक मान्य संख्या दर्ज करें (न्यूनतम {{minContextSize}})',
    modelReloadNotice: 'परिवर्तनों को प्रभावी करने के लिए मॉडल को पुनः लोड करना आवश्यक है',
    // Advanced Settings
    advancedSettings: 'उन्नत सेटिंग्स',
    // Batch Size
    batchSize: 'बैच आकार',
    batchSizeDescription: 'बैच आकार: {{batchSize}}{{effectiveBatch}}',
    effectiveLabel: 'प्रभावी',
    // Physical Batch Size
    physicalBatchSize: 'भौतिक बैच आकार',
    physicalBatchSizeDescription: 'भौतिक बैच आकार: {{physicalBatchSize}}{{effectivePhysicalBatch}}',
    // Thread Count
    cpuThreads: 'CPU थ्रेड्स',
    cpuThreadsDescription: '{{threads}} थ्रेड्स का उपयोग (उपलब्ध {{maxThreads}} थ्रेड्स)',
    // Flash Attention
    flashAttention: 'फ्लैश अटेंशन',
    flashAttentionDescription: 'प्रसंस्करण गति बढ़ाने के लिए फ्लैश अटेंशन सक्षम करें',
    // Cache Type K
    keyCacheType: 'कुंजी कैश प्रकार',
    keyCacheTypeDescription: 'कुंजी गणना के लिए कैश प्रकार चुनें',
    keyCacheTypeDisabledDescription: 'कैश प्रकार बदलने के लिए फ्लैश अटेंशन सक्षम करें',
    // Cache Type V
    valueCacheType: 'मूल्य कैश प्रकार',
    valueCacheTypeDescription: 'मूल्य गणना के लिए कैश प्रकार चुनें',
    valueCacheTypeDisabledDescription: 'कैश प्रकार बदलने के लिए फ्लैश अटेंशन सक्षम करें',
    // Memory Settings
    memorySettings: 'मेमोरी सेटिंग्स',
    useMlock: 'मेमोरी लॉक का उपयोग करें',
    useMlockDescription: 'मॉडल को RAM में बनाए रखने के लिए सिस्टम को बाध्य करें, न कि स्वैप या संपीड़न में',
    useMmap: 'मेमोरी मैपिंग',
    useMmapDescription: 'मॉडल लोडिंग को तेज करने के लिए मेमोरी मैपिंग फाइल का उपयोग करें',
    useMmapTrue: 'सक्षम',
    useMmapFalse: 'अक्षम',
    useMmapSmart: 'स्मार्ट',
    useMmapTrueDescription: 'तेज लोडिंग के लिए हमेशा मेमोरी मैपिंग का उपयोग करें',
    useMmapFalseDescription: 'मेमोरी मैपिंग का उपयोग न करें (लोडिंग धीमी हो सकती है लेकिन मेमोरी उपयोग कम हो सकता है)',
    useMmapSmartDescription: 'मॉडल प्रकार के आधार पर स्वचालित रूप से चयन करें (केवल Android)',
    useMmapRecommended: 'अनुशंसित प्रदर्शन सेटिंग - लॉक पेज के साथ मेमोरी मैपिंग। तेज लोडिंग और सुसंगत प्रदर्शन का संयोजन',
    // Model Loading Settings
    modelLoadingSettings: 'मॉडल लोडिंग सेटिंग्स',
    // Auto Offload/Load
    autoOffloadLoad: 'स्वचालित अनलोड/लोड',
    autoOffloadLoadDescription: 'जब ऐप पृष्ठभूमि में हो तो मॉडल को स्वचालित रूप से अनलोड करें',
    // Auto Navigate to Chat
    autoNavigateToChat: 'चैट पर स्वचालित नेविगेशन',
    autoNavigateToChatDescription: 'लोडिंग पूर्ण होने पर चैट इंटरफेस पर नेविगेट करें',
    // App Settings
    appSettings: 'ऐप सेटिंग्स',
    // Language
    language: 'भाषा',
    // Dark Mode
    darkMode: 'डार्क मोड',
    // Display Memory Usage
    displayMemoryUsage: 'मेमोरी उपयोग प्रदर्शित करें',
    displayMemoryUsageDescription: 'चैट पेज पर मेमोरी उपयोग प्रदर्शित करें',
    // Export/Import Options
    exportOptions: 'निर्यात विकल्प',
    exportLegacyChats: 'पुरानी चैट सत्र निर्यात करें',
    exportLegacyChatsDescription: 'यदि माइग्रेशन विफल हो जाता है या पुरानी चैट सत्रों को पुनर्स्थापित करने की आवश्यकता हो, तो इस विकल्प का उपयोग करें',
    exportButton: 'निर्यात',
    importChats: 'चैट सत्र आयात करें',
    importChatsDescription: 'JSON फ़ाइल से चैट सत्र आयात करें',
    importButton: 'आयात',
    importSuccess: '{{count}} चैट सत्र सफलतापूर्वक आयात किए गए',
    importError: 'चैट सत्र आयात करने में विफल, कृपया फ़ाइल प्रारूप जांचें',
    // API Settings
    apiSettingsTitle: 'API सेटिंग्स',
    // Hugging Face Token
    huggingFaceTokenLabel: 'हगिंग फेस टोकन',
    tokenIsSetDescription: 'टोकन सेट है, प्रतिबंधित मॉडल तक पहुंचने के लिए आवश्यक',
    setTokenDescription: 'हगिंग फेस से प्रतिबंधित मॉडल तक पहुंचने के लिए टोकन सेट करें',
    setTokenButton: 'टोकन सेट करें',
    useHfTokenLabel: 'HF टोकन का उपयोग करें',
    useHfTokenDescription: 'प्रतिबंधित मॉडल तक पहुंचने के लिए HF टोकन का उपयोग करें',
  },
  memory: {
    shortWarning: 'मेमोरी चेतावनी',
    warning: 'चेतावनी: मॉडल का आकार उपलब्ध मेमोरी से अधिक हो सकता है, जिससे डिवाइस के प्रदर्शन और स्थिरता पर असर पड़ सकता है',
    multimodalWarning: 'इस डिवाइस में मल्टीमॉडल मॉडल चलाने के लिए पर्याप्त संसाधन नहीं हो सकते',
    alerts: {
      memoryWarningTitle: 'मेमोरी चेतावनी',
      memoryWarningMessage: 'यह मॉडल उपलब्ध मेमोरी से अधिक हो सकता है, जिसके परिणामस्वरूप अस्थिरता हो सकती है; क्या आप लोडिंग जारी रखना चाहते हैं?',
      multimodalWarningTitle: 'डिवाइस प्रदर्शन चेतावनी',
      multimodalWarningMessage: 'इस डिवाइस में मल्टीमॉडल मॉडल चलाने के लिए पर्याप्त संसाधन नहीं हो सकते, लोडिंग से अस्थिरता हो सकती है; क्या आप फिर भी जारी रखना चाहते हैं?',
      combinedWarningTitle: 'प्रदर्शन चेतावनी',
      combinedWarningMessage: 'यह मॉडल उपलब्ध मेमोरी से अधिक हो सकता है, और इस डिवाइस में मल्टीमॉडल मॉडल चलाने के लिए पर्याप्त संसाधन नहीं हो सकते, लोडिंग से अस्थिरता हो सकती है; क्या आप फिर भी जारी रखना चाहते हैं?',
      cancel: 'रद्द करें',
      continue: 'जारी रखें',
    },
  },
  storage: {
    checkFailed: 'भंडारण जांच विफल',
    lowStorage: 'भंडारण अपर्याप्त! मॉडल {{modelSize}} > उपलब्ध स्थान {{freeSpace}}',
  },
  generation: {
    modelNotInitialized: 'मॉडल संदर्भ प्रारंभ नहीं हुआ',
    failedToGenerate: 'आउटपुट उत्पन्न करने में विफल',
  },
  models: {
    fileManagement: {
      fileAlreadyExists: 'फ़ाइल पहले से मौजूद है',
      fileAlreadyExistsMessage: 'इस नाम की फ़ाइल पहले से मौजूद है, आप क्या करना चाहते हैं?',
      replace: 'बदलें',
      keepBoth: 'दोनों रखें',
    },
    labels: {
      localModel: 'स्थानीय',
      hfModel: 'HF',
      unknownGroup: 'अज्ञात',
      availableToUse: 'उपयोग के लिए उपलब्ध',
      availableToDownload: 'डाउनलोड के लिए उपलब्ध',
      useAddButtonForMore: 'अधिक मॉडल जोड़ने के लिए + बटन पर क्लिक करें',
    },
    vision: 'दृष्टि',
    mmproj: 'प्रोजेक्टर',
    multimodal: {
      settings: 'मल्टीमॉडल सेटिंग्स',
      projectionModels: 'प्रोजेक्शन मॉडल',
      noCompatibleModels: 'कोई संगत प्रोजेक्शन मॉडल नहीं मिला',
      noProjectionModels: 'कोई प्रोजेक्शन मॉडल उपलब्ध नहीं',
      selected: 'चयनित',
      select: 'चुनें',
      download: 'डाउनलोड',
      projectionNeededTitle: 'प्रोजेक्शन मॉडल आवश्यक',
      projectionNeededMessage: 'इस मॉडल को मल्टीमॉडल सुविधाओं के लिए प्रोजेक्शन मॉडल की आवश्यकता है',
      projectionMissingWarning: 'प्रोजेक्शन मॉडल अनुपस्थित',
      projectionMissingShort: 'प्रोजेक्शन मॉडल अनुपस्थित',
      reloadModelTitle: 'मॉडल पुनः लोड करें',
      reloadModelMessage: 'नए प्रोजेक्शन मॉडल को लागू करने के लिए मॉडल को पुनः लोड करने की आवश्यकता है, क्या आप अभी पुनः लोड करना चाहते हैं?',
      reload: 'पुनः लोड करें',
      deleteProjectionTitle: 'प्रोजेक्शन मॉडल हटाएं',
      deleteProjectionMessage: 'क्या आप इस प्रोजेक्शन मॉडल को हटाने के लिए निश्चित हैं?',
      cannotDeleteTitle: 'हटाने में असमर्थ',
      // Vision control strings
      visionControls: {
        enableVision: 'दृष्टि क्षमता सक्षम करें',
        disableVision: 'दृष्टि क्षमता अक्षम करें',
        visionEnabled: 'दृष्टि सक्षम है',
        visionDisabled: 'दृष्टि अक्षम है',
        textOnlyMode: 'केवल पाठ',
        visionMode: 'दृष्टि सक्षम',
        downloadWithVision: 'दृष्टि क्षमताओं के साथ मॉडल डाउनलोड करें',
        downloadTextOnly: 'केवल पाठ क्षमताओं के साथ मॉडल डाउनलोड करें',
        visionToggleDescription: 'छवि प्रसंस्करण सुविधा सक्षम करें',
        projectionModelSize: '+{size} प्रोजेक्शन मॉडल',
        visionModeDescription: 'छवियों और पाठ को संसाधित करें',
        textOnlyModeDescription: 'केवल पाठ को संसाधित करें',
        includesVisionCapability: 'दृष्टि क्षमता शामिल है',
        requiresProjectionModel: 'कृपया पहले संगत प्रोजेक्शन मॉडल डाउनलोड करें',
      },
      cannotDeleteActive: 'यह प्रोजेक्शन मॉडल वर्तमान में सक्रिय है',
      cannotDeleteInUse: 'यह प्रोजेक्शन मॉडल डाउनलोड किए गए LLM मॉडल द्वारा उपयोग में है:',
      dependentModels: 'निर्भर मॉडल:',
      visionWillBeDisabled: 'इन मॉडलों की दृष्टि क्षमता अक्षम हो जाएगी',
    },
    buttons: {
      addFromHuggingFace: 'हगिंग फेस से जोड़ें',
      addLocalModel: 'स्थानीय मॉडल जोड़ें',
      reset: 'रीसेट',
    },
    modelsHeaderRight: {
      menuTitleHf: 'हगिंग फेस मॉडल',
      menuTitleDownloaded: 'डाउनलोड किए गए मॉडल',
      menuTitleGrouped: 'मॉडल प्रकार के अनुसार समूहीकृत',
      menuTitleReset: 'मॉडल सूची रीसेट करें',
    },
    modelsResetDialog: {
      proceedWithReset: 'रीसेट के साथ आगे बढ़ें',
      confirmReset: 'रीसेट की पुष्टि करें',
    },
    chatTemplate: {
      label: 'आधार चैट टेम्पलेट:',
    },
    details: {
      title: 'उपलब्ध GGUF फ़ाइलें',
    },
    modelFile: {
      alerts: {
        cannotRemoveTitle: 'हटाने में असमर्थ',
        modelPreset: 'यह मॉडल प्रीसेट है',
        downloadedFirst: 'मॉडल डाउनलोड हो चुका है, कृपया पहले मॉडल हटाएं',
        removeTitle: 'मॉडल हटाएं',
        removeMessage: 'क्या आप इस मॉडल को सूची से हटाने के लिए निश्चित हैं?',
        removeError: 'मॉडल हटाने में असमर्थ',
        alreadyDownloadedTitle: 'मॉडल पहले से डाउनलोड हो चुका है',
        alreadyDownloadedMessage: 'मॉडल पहले से डाउनलोड हो चुका है',
        deleteTitle: 'मॉडल हटाएं',
        deleteMessage: 'क्या आप इस डाउनलोड किए गए मॉडल को हटाने के लिए निश्चित हैं?',
      },
      buttons: {
        remove: 'हटाएं',
      },
      warnings: {
        storage: {
          message: 'पर्याप्त भंडारण स्थान नहीं है',
          shortMessage: 'भंडारण अपर्याप्त',
        },
        memory: {
          message: 'मॉडल का आकार डिवाइस की कुल मेमोरी के करीब या उससे अधिक है, जिसके परिणामस्वरूप अप्रत्याशित व्यवहार हो सकता है',
        },
        legacy: {
          message: 'पुराना क्वांटाइजेशन प्रारूप - मॉडल शायद न चले',
          shortMessage: 'पुराना क्वांटाइजेशन',
        },
        multiple: '{count} चेतावनियाँ',
      },
      labels: {
        downloadSpeed: '{speed}',
      },
    },
    search: {
      noResults: 'कोई मॉडल नहीं मिला',
      loadingMore: 'लोड हो रहा है...',
      searchPlaceholder: 'हगिंग फेस मॉडल खोजें',
      modelUpdatedLong: '{{time}} पहले अपडेट किया गया',
      modelUpdatedShort: '{{time}} पहले',
      modelUpdatedJustNowLong: 'अभी अपडेट किया गया',
      modelUpdatedJustNowShort: 'अभी',
      errorOccurred: 'मॉडल लोड करने में असमर्थ, कृपया पुनः प्रयास करें',
    },
    modelCard: {
      alerts: {
        deleteTitle: 'मॉडल हटाएं',
        deleteMessage: 'क्या आप इस डाउनलोड किए गए मॉडल को हटाने के लिए निश्चित हैं?',
        removeTitle: 'मॉडल हटाएं',
        removeMessage: 'क्या आप इस मॉडल को सूची से हटाने के लिए निश्चित हैं?',
      },
      buttons: {
        settings: 'सेटिंग्स',
        download: 'डाउनलोड',
        remove: 'हटाएं',
        load: 'लोड',
        offload: 'अनलोड',
      },
      labels: {
        skills: 'कौशल: ',
      },
    },
    modelSettings: {
      template: {
        label: 'टेम्पलेट:',
        editButton: 'संपादन',
        dialogTitle: 'चैट टेम्पलेट संपादित करें',
        note1: 'नोट: टेम्पलेट बदलने से BOS, EOS और सिस्टम प्रॉम्प्ट बदल सकते हैं',
        note2: 'Nunjucks का उपयोग करें, मॉडल के टेम्पलेट का उपयोग करने के लिए खाली छोड़ दें',
        placeholder: 'यहाँ चैट टेम्पलेट दर्ज करें...',
        closeButton: 'बंद करें',
      },
      stopWords: {
        label: 'रोक शब्द',
        placeholder: 'नया रोक शब्द जोड़ें',
      },
      tokenSettings: {
        bos: 'BOS',
        eos: 'EOS',
        addGenerationPrompt: 'जनन प्रॉम्प्ट जोड़ें',
        bosTokenPlaceholder: 'BOS टोकन',
        eosTokenPlaceholder: 'EOS टोकन',
        systemPrompt: 'सिस्टम प्रॉम्प्ट',
      },
    },
    modelDescription: {
      size: 'आकार: ',
      parameters: 'पैरामीटर: ',
      separator: ' | ',
      notAvailable: 'उपलब्ध नहीं',
    },
    modelCapabilities: {
      questionAnswering: 'प्रश्न उत्तर',
      summarization: 'सारांश',
      reasoning: 'तर्क',
      roleplay: 'भूमिका निभाना',
      instructions: 'निर्देशों का पालन',
      code: 'कोड जनन',
      math: 'गणित समाधान',
      multilingual: 'बहुभाषी समर्थन',
      rewriting: 'लेख पुनर्लेखन',
      creativity: 'रचनात्मक लेखन',
      vision: 'दृष्टि',
    },
  },
  completionParams: {
    include_thinking_in_context: 'मॉडल को भेजे गए संदर्भ में AI की सोच/तर्क भाग शामिल करें, इस विकल्प को अक्षम करने से संदर्भ स्थान बच सकता है; लेकिन यह प्रदर्शन को प्रभावित कर सकता है',
    jinja: 'चैट प्रारूपण के लिए जिन्जा टेम्पलेट सक्षम करें; सक्षम होने पर, आधुनिक मॉडलों के साथ संगतता बढ़ाने के लिए जिन्जा-आधारित चैट टेम्पलेट प्रसंस्करण का उपयोग करें',
    grammar: 'विशिष्ट व्याकरण नियम लागू करें, यह सुनिश्चित करने के लिए कि उत्पन्न पाठ विशिष्ट संरचना या प्रारूप का पालन करता है',
    stop: 'विशिष्ट वाक्यांशों को परिभाषित करें जो पाठ जनन को रोक देंगे',
    n_predict: 'उत्पन्न प्रतिक्रिया की लंबाई सेट करें (टोकन में)',
    n_probs: 'वैकल्पिक शब्दों की संभावना स्कोर प्रदर्शित करें',
    top_k: 'K सबसे संभावित विकल्पों तक शब्द चयन को सीमित करके रचनात्मकता को नियंत्रित करें, कम मान प्रतिक्रिया को अधिक केंद्रित बनाते हैं',
    top_p: 'रचनात्मकता और सुसंगतता को संतुलित करें, उच्च मान (1.0 के करीब) अधिक रचनात्मक लेकिन संभवतः कम केंद्रित प्रतिक्रियाओं की अनुमति देते हैं',
    min_p: 'टोकन की न्यूनतम संभावना पर विचार करें, कम संभावित शब्दों को फ़िल्टर करें ताकि असंगत या संदर्भ से बाहर की प्रतिक्रियाएँ कम हों',
    temperature: 'रचनात्मकता और पूर्वानुमानता को नियंत्रित करें, उच्च मान प्रतिक्रियाओं को अधिक रचनात्मक लेकिन कम केंद्रित बनाते हैं',
    penalty_last_n: 'दोहराव की जाँच का दायरा, बड़ा मान लंबे समय तक दोहराव को रोकने में मदद करता है',
    penalty_repeat: 'शब्द दोहराव को दबाएं, उच्च मान प्रतिक्रियाओं में अधिक विविध भाषा का उपयोग करते हैं',
    penalty_freq: 'सामान्य शब्दों को दंडित करें, उच्च मान अधिक व्यापक शब्दावली के उपयोग को प्रोत्साहित करते हैं',
    penalty_present: 'विषय और विचारों के दोहराव को कम करें, उच्च मान अधिक विविध सामग्री को प्रोत्साहित करते हैं',
    mirostat: 'प्रतिक्रिया की रचनात्मकता पर उन्नत नियंत्रण सक्षम करें, बुद्धिमान, वास्तविक समय में रैंडमनेस और सुसंगतता को समायोजित करने के लिए 1 या 2 (अधिक सुचारु) पर सेट करें',
    mirostat_tau: 'मिरोस्टैट की रचनात्मकता स्तर सेट करें, उच्च मान अधिक विविध और कल्पनाशील प्रतिक्रियाओं की अनुमति देते हैं, जबकि कम मान अधिक केंद्रित आउटपुट सुनिश्चित करते हैं',
    mirostat_eta: 'मिरोस्टैट रचनात्मकता को समायोजित करने की गति, उच्च मान का मतलब तेज समायोजन है',
    dry_multiplier: 'DRY (खुद को दोहराने न करें) सुविधा की तीव्रता, उच्च मान दोहराव को दृढ़ता से रोकते हैं',
    dry_base: 'DRY मोड में दोहराव का आधार दंड, उच्च मान दोहराव को अधिक आक्रामक रूप से रोकते हैं',
    dry_allowed_length: 'DRY दंड लागू होने से पहले दोहराए जा सकने वाले शब्दों की संख्या',
    dry_penalty_last_n: 'DRY मोड में दोहराव की जाँच का दायरा',
    dry_sequence_breakers: 'DRY मोड में दोहराव जाँच रीसेट करने वाले प्रतीक',
    ignore_eos: 'मॉडल के रुकने की इच्छा के बावजूद जनन जारी रखें, लंबी प्रतिक्रियाओं को लागू करने में मदद करता है',
    logit_bias: 'विशिष्ट शब्दों के प्रतिक्रिया में दिखने की संभावना को समायोजित करें',
    seed: 'रैंडम नंबर जनरेटर के लिए बीज सेट करें, परिणामों को पुनरुत्पादन करने में मदद करता है',
    xtc_probability: 'XTC सैंपलर के माध्यम से टोकन हटाए जाने की संभावना सेट करें, 0 अक्षम है',
    xtc_threshold: 'XTC सैंपलर के माध्यम से टोकन हटाए जाने की न्यूनतम संभावना थ्रेशोल्ड सेट करें, (> 0.5 XTC को अक्षम करता है)',
    typical_p: 'पैरामीटर p के साथ स्थानीय विशिष्ट सैंपलिंग सक्षम करें, 1.0 अक्षम है',
  },
  about: {
    screenTitle: 'ऐप जानकारी',
    description:
      'मैं वर्तमान में एक ऑफ़लाइन AI चैटबॉट बना रहा हूँ जो इंटरनेट की आवश्यकता के बिना सीधे डिवाइस पर चल सकता है। क्लाउड-आधारित बॉट्स के विपरीत, यह चैटबॉट AI मॉडल को स्थानीय रूप से लोड करता है, जो तेज़ प्रतिक्रिया समय, गोपनीयता और कम कनेक्टिविटी वाले क्षेत्रों में भी उपलब्धता सुनिश्चित करता है। मेरा फोकस छात्रों, पेशेवरों और व्यवसायों के लिए AI को सुलभ, हल्का और व्यावहारिक बनाने पर है।',
    developerTitle: '👤 मेरे बारे में',
    developerDescription:
      'नाम: पवनकुमार स्वामी शेषेट्टी\nईमेल: shesettipavankumarswamy@gmail.com\nमोबाइल: +91 8639122823\n🌐 वेबसाइट: pavankumarswamys.link',
    educationTitle: '🎓 शिक्षा',
    educationList: [
      '• B.Tech – तीसरा वर्ष, कंप्यूटर साइंस इंजीनियरिंग',
      '  गोदावरी इंस्टीट्यूट ऑफ इंजीनियरिंग एंड टेक्नोलॉजी, राजमहेंद्रवरम, आंध्र प्रदेश',
      '  🔗 giet.ac.in',
      '',
      '• डिप्लोमा – कंप्यूटर साइंस इंजीनियरिंग',
      '  श्री ज्योति पॉलिटेक्निक कॉलेज, विजयवाड़ा',
      '  🔗 srijyothipolytechnic.com',
      '',
      '• स्कूली शिक्षा – कक्षा 1 से 10',
      '  श्री नागराज म्युनिसिपल कॉर्पोरेशन हाई स्कूल'
    ],
    skillsTitle: '🚀 कौशल और रुचियां',
    skillsList: [
      '• आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग',
      '• ऑफ़लाइन AI एप्लिकेशन (लोकल AI मॉडल डिप्लॉयमेंट)',
      '• चैटबॉट डेवलपमेंट (व्हाट्सऐप, वेब, मोबाइल)',
      '• फुल स्टैक डेवलपमेंट (Flutter, Node.js, React)',
      '• क्लाउड और डिप्लॉयमेंट (Firebase, Supabase, Render)'
    ],
    latestProjectTitle: 'वर्तमान प्रोजेक्ट',
    latestProjectName: 'Pocket-AI',
    latestProjectDescription:
      'एक ऑफ़लाइन AI चैटबॉट जो इंटरनेट की आवश्यकता के बिना सीधे डिवाइस पर चलता है, गोपनीयता, गति और पहुंच सुनिश्चित करता है।',
    connectTitle: '💼 मुझसे जुड़ें',
    linkedinButton: 'लिंक्डइन प्रोफाइल',
    githubProfileButton: 'गिटहब प्रोफाइल',
    websiteButton: 'वेबसाइट पर जाएं',
    emailButton: 'ईमेल भेजें',
    versionCopiedTitle: 'वर्जन कॉपी हो गया',
    versionCopiedDescription:
      'वर्जन की जानकारी क्लिपबोर्ड में कॉपी हो गई है',
  },
  feedback: {
    title: 'प्रतिक्रिया भेजें',
    description: 'आपकी राय महत्वपूर्ण है! हमें बताएं कि Pocket AI आपकी मदद कैसे करता है और हम इसे और उपयोगी बनाने के लिए क्या कर सकते हैं',
    shareThoughtsButton: 'अपने विचार साझा करें',
    useCase: {
      label: 'आप Pocket AI का उपयोग कैसे करते हैं?',
      placeholder: 'उदाहरण: सारांश, भूमिका निभाना आदि',
    },
    featureRequests: {
      label: 'आप भविष्य में कौन सी सुविधाएँ देखना चाहेंगे?',
      placeholder: 'अपने विचार या सुविधा सुझाव साझा करें',
    },
    generalFeedback: {
      label: 'सामान्य प्रतिक्रिया',
      placeholder: 'यदि आपके पास अन्य विचार हैं, तो कृपया साझा करें',
    },
    usageFrequency: {
      label: 'आप कितनी बार Pocket AI का उपयोग करते हैं? (वैकल्पिक)',
      options: {
        daily: 'रोजाना',
        weekly: 'साप्ताहिक',
        monthly: 'मासिक',
        rarely: 'शायद ही कभी',
      },
    },
    email: {
      label: 'संपर्क ईमेल (वैकल्पिक)',
      placeholder: 'आपका ईमेल पता',
    },
    submit: 'प्रतिक्रिया सबमिट करें',
    validation: {
      required: 'कृपया कम से कम कुछ प्रतिक्रिया प्रदान करें',
    },
    success: 'आपकी प्रतिक्रिया के लिए धन्यवाद!',
    error: {
      general: 'प्रतिक्रिया भेजने में त्रुटि, कृपया पुनः प्रयास करें',
    },
  },
  components: {
    attachmentButton: {
      attachmentButtonAccessibilityLabel: 'मीडिया भेजें',
    },
    bubble: {
      timingsString: 'प्रति टोकन {{predictedMs}}ms, प्रति सेकंड {{predictedPerSecond}} टोकन',
    },
    exportUtils: {
      fileSaved: 'फ़ाइल सहेजी गई',
      fileSavedMessage: 'फ़ाइल आपके डाउनलोड फ़ोल्डर में सहेजी गई है, फ़ाइल का नाम {{filename}} है',
      share: 'साझा करें',
      ok: 'ठीक है',
      shareError: 'साझा करने में त्रुटि',
      shareErrorMessage: 'फ़ाइल साझा करने में असमर्थ, कृपया पुनः प्रयास करें',
      saveError: 'डाउनलोड फ़ोल्डर में सहेजने में त्रुटि',
      saveOptions: 'सहेजने के विकल्प',
      saveOptionsMessage: 'डाउनलोड फ़ोल्डर में सीधे सहेजने में असमर्थ, क्या आप फ़ाइल साझा करना चाहते हैं?',
      cancel: 'रद्द करें',
      shareContentErrorMessage: 'सामग्री साझा करने में असमर्थ, कृपया पुनः प्रयास करें',
      exportError: 'निर्यात त्रुटि',
      exportErrorMessage: 'फ़ाइल निर्यात करने में त्रुटि, कृपया पुनः प्रयास करें',
      permissionRequired: 'भंडारण अनुमति आवश्यक',
      permissionMessage: 'फ़ाइल को डाउनलोड फ़ोल्डर में सहेजने के लिए भंडारण अनुमति आवश्यक है',
      permissionDenied: 'भंडारण अनुमति अस्वीकृत',
      permissionDeniedMessage: 'भंडारण अनुमति नहीं होने के कारण, निर्यात सुविधा अक्षम होगी',
      continue: 'जारी रखें',
    },
    thinkingBubble: {
      reasoning: 'तर्क',
    },
    chatEmptyPlaceholder: {
      noModelsTitle: 'कोई मॉडल उपलब्ध नहीं',
      noModelsDescription: 'PocketAi के साथ चैट शुरू करने के लिए एक मॉडल डाउनलोड करना आवश्यक है',
      noModelsButton: 'मॉडल डाउनलोड करें',
      activateModelTitle: 'PocketAi के साथ चैट शुरू करने से पहले, कृपया एक मॉडल सक्रिय करें~',
      activateModelDescription: 'चैट शुरू करने के लिए एक मॉडल चुनें और लोड करें',
      activateModelButton: 'मॉडल चुनें',
      loading: 'लोड हो रहा है...',
    },
    chatInput: {
      inputPlaceholder: 'संदेश',
      thinkingToggle: {
        enableThinking: 'सोच मोड सक्षम करें',
        disableThinking: 'सोच मोड अक्षम करें',
        thinkingEnabled: 'सोच मोड सक्षम है',
        thinkingDisabled: 'सोच मोड अक्षम है',
        thinkText: 'सोचें',
      },
    },
    contentReportSheet: {
      title: 'सामग्री की शिकायत करें',
      privacyNote: 'हम कोई संदेश सामग्री या वार्तालाप विवरण नहीं भेजते। कृपया आपके द्वारा सामना की गई विशिष्ट समस्या का वर्णन करें।',
      categoryLabel: 'शिकायत श्रेणी',
      selectCategory: 'श्रेणी चुनें',
      categories: {
        hate: 'घृणा भरे भाषण',
        sexual: 'यौन सामग्री',
        selfHarm: 'स्व-हानि',
        violence: 'हिंसा',
        other: 'अन्य',
      },
      descriptionLabel: 'विवरण',
      descriptionPlaceholder: 'इस सामग्री की समस्या का वर्णन करें...',
      includeModelInfo: 'मॉडल जानकारी शामिल करें',
      includeModelInfoDescription: 'हमारी जांच में मदद करने के लिए मॉडल का नाम और पहचानकर्ता शामिल करें',
      noActiveModelNote: 'वर्तमान में कोई सक्रिय मॉडल नहीं है',
      submit: 'शिकायत सबमिट करें',
      validation: {
        title: 'जानकारी अनुपस्थित',
        message: 'कृपया एक श्रेणी चुनें और विवरण प्रदान करें।',
      },
      success: {
        title: 'शिकायत सबमिट की गई',
        message: 'आपकी शिकायत के लिए धन्यवाद। हम समीक्षा करेंगे और उचित कार्रवाई करेंगे।',
      },
      error: {
        title: 'शिकायत विफल',
        message: 'शिकायत सबमिट करने में विफल। कृपया पुनः प्रयास करें।',
      },
    },
    chatGenerationSettingsSheet: {
      invalidValues: 'अमान्य मान',
      invalidNumericValuesMessage: 'मान्य संख्या होनी चाहिए',
      pleaseCorrect: 'कृपया निम्नलिखित को ठीक करें:',
      ok: 'ठीक है',
      saveChanges: 'परिवर्तन सहेजें',
      saveAsPreset: 'प्रीसेट के रूप में सहेजें',
      title_session: 'चैट जनन सेटिंग्स (सत्र)',
      title_preset: 'चैट जनन सेटिंग्स (प्रीसेट)',
      resetToSystemDefaults: 'सिस्टम डिफ़ॉल्ट पर रीसेट करें',
      resetToPreset: 'प्रीसेट पर रीसेट करें',
      applytoPresetAlert: {
        title: 'सफल',
        message: 'ये सेटिंग्स भविष्य के सभी सत्रों पर लागू होंगी',
      },
    },
    chatHeaderTitle: {
      defaultTitle: 'चैट',
    },
    fileMessage: {
      fileButtonAccessibilityLabel: 'फ़ाइल',
    },
    chatPalModelPickerSheet: {
      modelsTab: 'मॉडल',
      palsTab: 'Ai',
      noPal: 'कोई Ai नहीं',
      disablePal: 'वर्तमान Ai अक्षम करें',
      noDescription: 'कोई विवरण नहीं',
      assistantType: 'Ai',
      roleplayType: 'भूमिका निभाना',
      videoType: 'वीडियो',
      confirmationTitle: 'पुष्टि',
      modelSwitchMessage: 'इस Ai का डिफ़ॉल्ट मॉडल अलग है ({{modelName}}), क्या आप Ai के डिफ़ॉल्ट मॉडल पर स्विच करना चाहते हैं?',
      keepButton: 'रखें',
      switchButton: 'स्विच',
    },
    downloadErrorDialog: {
      downloadFailedTitle: 'डाउनलोड विफल',
      downloadFailedMessage: 'मॉडल डाउनलोड विफल: {message}',
      unauthorizedTitle: 'प्रमाणीकरण विफल',
      unauthorizedMessage: 'आपका हगिंग फेस टोकन अमान्य या समाप्त प्रतीत होता है, कृपया सेटिंग्स में अपना टोकन अपडेट करें',
      forbiddenTitle: 'पहुंच निषिद्ध',
      forbiddenMessage: 'आपको इस मॉडल तक पहुंचने की अनुमति नहीं है, कृपया सुनिश्चित करें:',
      forbiddenSteps: [
        'आपके टोकन में "पढ़ने" की अनुमति है',
        'आपने इस मॉडल तक पहुंच का अनुरोध किया है',
        'मॉडल मालिक ने आपके पहुंच अनुरोध को मंजूरी दी है',
      ],
      getTokenTitle: 'हगिंग फेस टोकन प्राप्त करें',
      getTokenMessage: 'इस मॉडल को डाउनलोड करने के लिए हगिंग फेस टोकन की आवश्यकता है',
      getTokenSteps: [
        'huggingface पर जाएं और लॉग इन करें',
        'सेटिंग्स > एक्सेस टोकन पर नेविगेट करें',
        '"पढ़ने" की अनुमति के साथ नया टोकन बनाएं',
        'टोकन कॉपी करें और टोकन फ़ील्ड में पेस्ट करें',
      ],
      tokenDisabledTitle: 'टोकन अक्षम है',
      tokenDisabledMessage: 'आपके पास हगिंग फेस टोकन सेट है, लेकिन यह वर्तमान में अक्षम है; इस मॉडल को डाउनलोड करने के लिए टोकन की आवश्यकता है; कृपया जारी रखने के लिए अपना टोकन सक्षम करें',
      enableAndRetry: 'सक्षम करें और पुनः प्रयास करें',
      goToSettings: 'सेटिंग्स पर जाएं',
      tryAgain: 'पुनः प्रयास करें',
      viewOnHuggingFace: 'HF पर मॉडल देखें ↗',
    },
    headerRight: {
      deleteChatTitle: 'चैट हटाएं',
      deleteChatMessage: 'क्या आप इस चैट रिकॉर्ड को हटाने के लिए निश्चित हैं?',
      generationSettings: 'जनन सेटिंग्स',
      model: 'मॉडल',
      duplicateChatHistory: 'चैट इतिहास डुप्लिकेट करें',
      makeChatTemporary: 'चैट को अस्थायी बनाएं',
      export: 'निर्यात/आयात',
      exportCurrentSession: 'वर्तमान सत्र निर्यात करें',
      exportAllSessions: 'सभी सत्र निर्यात करें',
      exportChatSession: 'चैट सत्र निर्यात करें',
      importSessions: 'सत्र आयात करें',
    },
    hfTokenSheet: {
      title: 'हगिंग फेस टोकन',
      description: 'प्रतिबंधित मॉडल तक पहुंचने के लिए आवश्यक',
      inputLabel: 'व्यक्तिगत एक्सेस टोकन',
      inputPlaceholder: 'यहाँ अपना टोकन पेस्ट करें',
      save: 'टोकन सहेजें',
      saved: 'टोकन सफलतापूर्वक सहेजा गया',
      reset: 'टोकन रीसेट करें',
      resetSuccess: 'टोकन सफलतापूर्वक हटाया गया',
      instructions: 'टोकन कैसे प्राप्त करें:',
      instructionsSteps: [
        'huggingface पर लॉग इन करें',
        'सेटिंग्स > एक्सेस टोकन पर नेविगेट करें',
        '"पढ़ने" की अनुमति के साथ नया टोकन बनाएं',
        'टोकन कॉपी करें और नीचे पेस्ट करें',
      ],
      getTokenLink: 'huggingface से टोकन प्राप्त करें ↗',
      error: {
        saving: 'टोकन सहेजने में त्रुटि',
        missing: 'हगिंग फेस टोकन आवश्यक है',
        invalid: 'अमान्य या समाप्त टोकन',
        gatedModelAccess: 'इस प्रतिबंधित मॉडल तक पहुंच निषिद्ध है',
      },
      gatedModelIndicator: 'टोकन आवश्यक',
      tokenRequired: 'इस मॉडल के लिए हगिंग फेस एक्सेस टोकन आवश्यक है',
      searchErrorHint: 'आपका हगिंग फेस API टोकन अमान्य या समाप्त है; यदि आप खोज जारी रखना चाहते हैं, तो कृपया सेटिंग्स में टोकन हटाएं या टोकन सत्यापन अक्षम करें',
      disableAndRetry: 'टोकन अक्षम करें और पुनः प्रयास करें',
    },
    modelSettingsSheet: {
      modelSettings: 'मॉडल सेटिंग्स',
      saveChanges: 'परिवर्तन सहेजें',
    },
    modelsHeaderRight: {
      menuTitleHf: 'हगिंग फेस मॉडल',
      menuTitleDownloaded: 'डाउनलोड किए गए मॉडल',
      menuTitleGrouped: 'मॉडल प्रकार के अनुसार समूहीकृत',
      menuTitleReset: 'मॉडल सूची रीसेट करें',
    },
    modelsResetDialog: {
      proceedWithReset: 'रीसेट के साथ आगे बढ़ें',
      confirmReset: 'रीसेट की पुष्टि करें',
    },
    assistantPalSheet: {
      title: {
        create: 'सहायक Ai बनाएं',
        edit: 'सहायक Ai संपादित करें',
      },
      palName: 'Ai नाम',
      palNamePlaceholder: 'नाम',
      defaultModel: 'डिफ़ॉल्ट मॉडल',
      defaultModelPlaceholder: 'मॉडल चुनें',
      validation: {
        generatingPromptRequired: 'जनन प्रॉम्प्ट आवश्यक है',
        promptModelRequired: 'प्रॉम्प्ट जनन मॉडल आवश्यक है',
      },
      create: 'बनाएं',
    },
    modelNotAvailable: {
      noModelsDownloaded: 'आपने अभी तक कोई मॉडल डाउनलोड नहीं किया है, कृपया पहले मॉडल डाउनलोड करें',
      downloadAModel: 'मॉडल डाउनलोड करें',
      defaultModelNotDownloaded: 'डिफ़ॉल्ट मॉडल अभी तक डाउनलोड नहीं हुआ है, कृपया पहले इसे डाउनलोड करें',
      cancelDownload: 'डाउनलोड रद्द करें',
      download: 'डाउनलोड',
    },
    roleplayPalSheet: {
      title: {
        create: 'भूमिका निभाना Ai बनाएं',
        edit: 'भूमिका निभाना Ai संपादित करें',
      },
      palName: 'Ai नाम',
      palNamePlaceholder: 'नाम',
      defaultModel: 'डिफ़ॉल्ट मॉडल',
      defaultModelPlaceholder: 'मॉडल चुनें',
      descriptionSection: 'विवरण',
      world: 'विश्व',
      worldPlaceholder: 'काल्पनिक',
      location: 'स्थान',
      locationPlaceholder: 'जादुई जंगल',
      locationSublabel: 'कहानी कहाँ घटित होती है?',
      aiRole: 'AI की भूमिका',
      aiRolePlaceholder: 'एल्डारा, एक शरारती जंगल परी',
      aiRoleSublabel: 'भूमिका सेट करें',
      userRole: 'उपयोगकर्ता की भूमिका',
      userRolePlaceholder: 'सर एलरेड, एक बहादुर शूरवीर',
      userRoleSublabel: 'आप कौन हैं?',
      situation: 'स्थिति',
      situationPlaceholder: 'बचाव मिशन, रहस्य सुलझाना',
      toneStyle: 'लहजा/शैली',
      toneStylePlaceholder: 'गंभीर',
      validation: {
        promptModelRequired: 'प्रॉम्प्ट जनन मॉडल आवश्यक है',
      },
      create: 'बनाएं',
    },
    lookiePalSheet: {
      title: {
        create: 'लूकी Ai बनाएं',
        edit: 'लूकी Ai संपादित करें',
      },
      palName: 'Ai नाम',
      palNamePlaceholder: 'अपने लूकी Ai का नाम दर्ज करें',
      visionModel: 'दृष्टि मॉडल',
      visionModelPlaceholder: 'दृष्टि मॉडल चुनें',
      requiredModelsSection: 'आवश्यक मॉडल',
      captureInterval: 'कैप्चर अंतराल',
      captureIntervalHelper: 'स्वचालित कैप्चर के बीच का समय (मिलीसेकंड में)',
      create: 'बनाएं',
    },
    sendButton: {
      accessibilityLabel: 'भेजें',
    },
    systemPromptSection: {
      sectionTitle: 'सिस्टम प्रॉम्प्ट',
      useAIPrompt: 'AI जनन सिस्टम प्रॉम्प्ट का उपयोग करें',
      modelSelector: {
        label: 'जनन के लिए मॉडल चुनें*',
        sublabel: 'अनुशंसित: Llama 3.2 3B या Qwen3 4B.',
        placeholder: 'मॉडल चुनें',
      },
      generatingPrompt: {
        label: 'प्रॉम्प्ट जनन',
        placeholder: 'प्रॉम्प्ट जनन दर्ज करें',
      },
      buttons: {
        loadingModel: 'मॉडल लोड हो रहा है...',
        stopGenerating: 'जनन रोकें',
        generatePrompt: 'सिस्टम प्रॉम्प्ट जनन करें',
      },
      systemPrompt: {
        label: 'सिस्टम प्रॉम्प्ट',
        sublabel: 'सर्वश्रेष्ठ प्रॉम्प्ट खोजने के लिए सामग्री को स्वतंत्र रूप से संपादित करें',
        placeholder: 'आप एक सहायक सहायक हैं',
      },
      warnings: {
        promptChanged: 'सिस्टम प्रॉम्प्ट को मैन्युअल रूप से बदला गया है',
      },
    },
    sidebarContent: {
      menuItems: {
        chat: 'चैट',
        models: 'मॉडल',
        pals: 'Ai',
        benchmark: 'बेंचमार्क',
        shareApp: 'ऐप साझा करें',
        settings: 'सेटिंग्स',
        appInfo: 'के बारे में',
        testCompletion: 'पूरा करने का परीक्षण',
      },
      deleteChatTitle: 'चैट हटाएं',
      deleteChatMessage: 'क्या आप इस चैट रिकॉर्ड को हटाने के लिए निश्चित हैं?',
      dateGroups: {
        today: 'आज',
        yesterday: 'कल',
        thisWeek: 'इस सप्ताह',
        lastWeek: 'पिछले सप्ताह',
        twoWeeksAgo: '2 सप्ताह पहले',
        threeWeeksAgo: '3 सप्ताह पहले',
        fourWeeksAgo: '4 सप्ताह पहले',
        lastMonth: 'पिछला महीना',
        older: 'पुराने',
      },
    },
    usageStats: {
      tooltip: {
        title: 'मेमोरी उपयोग',
        used: 'उपयोग में: ',
        total: 'कुल: ',
        usage: 'उपयोग: ',
      },
      byteSizes: ['बाइट्स', 'KB', 'MB', 'GB'],
    },
    chatView: {
      menuItems: {
        copy: 'कॉपी',
        regenerate: 'पुनर्जनन',
        regenerateWith: 'पुनर्जनन (मॉडल पुनः चयन)',
        edit: 'संपादन',
        reportContent: 'सामग्री की शिकायत करें',
      },
    },
    palHeaderRight: {
      exportAllPals: 'सभी Ai निर्यात करें',
      importPals: 'Ai आयात करें',
      importSuccess: '{{count}} Ai सफलतापूर्वक आयात किए गए',
      importError: 'Ai आयात करने में विफल, कृपया फ़ाइल प्रारूप जांचें',
    },
  },
  palsScreen: {
    systemPrompt: 'सिस्टम प्रॉम्प्ट',
    videoAnalysis: 'वीडियो विश्लेषण',
    videoAnalysisDescription: 'यह एक वीडियो-आधारित AI सहायक है, जो डिवाइस कैमरे से वीडियो स्ट्रीम पर वास्तविक समय में टिप्पणी प्रदान कर सकता है',
    captureInterval: 'कैप्चर अंतराल',
    captureIntervalUnit: 'मिलीसेकंड',
    world: 'विश्व',
    toneStyle: 'लहजा/शैली',
    aiRole: 'AI की भूमिका',
    userRole: 'उपयोगकर्ता की भूमिका',
    prompt: 'प्रॉम्प्ट',
    assistant: 'सहायक',
    roleplay: 'भूमिका निभाना',
    video: 'वीडियो',
    deletePal: 'Ai हटाएं',
    deletePalMessage: 'क्या आप इस Ai को हटाने के लिए निश्चित हैं?',
    missingModel: 'मॉडल अनुपस्थित',
    missingModelMessage: 'इस Ai का डिफ़ॉल्ट मॉडल "{{modelName}}" उपलब्ध नहीं है, कृपया संपादन पत्रक में इसे डाउनलोड करें या दूसरा मॉडल चुनें',
  },
  validation: {
    nameRequired: 'नाम आवश्यक है',
    systemPromptRequired: 'सिस्टम प्रॉम्प्ट आवश्यक है',
    worldRequired: 'विश्व सेटिंग आवश्यक है',
    locationRequired: 'स्थान आवश्यक है',
    aiRoleRequired: 'AI की भूमिका आवश्यक है',
    userRoleRequired: 'उपयोगकर्ता की भूमिका आवश्यक है',
    situationRequired: 'स्थिति आवश्यक है',
    toneStyleRequired: 'लहजा/शैली आवश्यक है',
  },
  camera: {
    permissionTitle: 'कैमरा अनुमति आवश्यक',
    permissionMessage: 'Pocket Ai को छवियों का विश्लेषण करने के लिए कैमरे तक पहुंच की आवश्यकता है',
    requestingPermission: 'कैमरा अनुमति का अनुरोध कर रहा है...',
    noDevice: 'कोई कैमरा डिवाइस नहीं मिला',
    errorTitle: 'कैमरा त्रुटि',
    errorMessage: 'फोटो लेने में त्रुटि',
    flip: 'पलटें',
    analyzing: 'छवि का विश्लेषण कर रहा है...',
    startCamera: 'कैमरा शुरू करें',
    stopCamera: 'कैमरा बंद करें',
    promptPlaceholder: 'आप इस छवि के बारे में क्या जानना चाहते हैं?',
    takePhoto: 'कैमरा',
  },
  video: {
    permissionTitle: 'कैमरा अनुमति आवश्यक',
    permissionMessage: 'PocketAi को वीडियो का विश्लेषण करने के लिए कैमरे तक पहुंच की आवश्यकता है',
    requestingPermission: 'कैमरा अनुमति का अनुरोध कर रहा है...',
    noDevice: 'कोई कैमरा डिवाइस नहीं मिला',
    errorTitle: 'कैमरा त्रुटि',
    errorMessage: 'कैमरे में त्रुटि',
    flip: 'पलटें',
    analyzing: 'वीडियो का विश्लेषण कर रहा है...',
    startCamera: 'कैमरा शुरू करें',
    stopCamera: 'कैमरा बंद करें',
    promptPlaceholder: 'आप इस वीडियो के बारे में क्या जानना चाहते हैं?',
    captureInterval: 'कैप्चर अंतराल',
    captureIntervalUnit: 'मिलीसेकंड',
    liveCommentary: 'वास्तविक समय में टिप्पणी',
    emptyPlaceholder: {
      title: 'लूकी में आपका स्वागत है',
      subtitle: 'निजी डिवाइस पर वास्तविक समय वीडियो विश्लेषण',
      experimentalNotice: 'यह एक प्रायोगिक सुविधा है, सटीकता चयनित मॉडल पर निर्भर करती है, गति आपके डिवाइस के प्रदर्शन पर निर्भर करती है; कुछ मॉडल विफल हो सकते हैं',
      howToUse: 'उपयोग कैसे करें:',
      step1: '• विश्लेषण को निर्देशित करने के लिए प्रॉम्प्ट संपादित करें (वैकल्पिक)',
      step2: '• वास्तविक समय वीडियो विश्लेषण शुरू करने के लिए कैमरा बटन पर क्लिक करें',
      step3: '• कैमरा सक्रिय होने पर स्नैपशॉट आवृत्ति समायोजित करें',
      step4: '• सामान्य पाठ चैट के लिए अन्य सहायक पर स्विच करें',
    },
  },
  screenTitles: {
    chat: 'चैट',
    models: 'मॉडल',
    pals: 'Ais (प्रायोगिक)',
    benchmark: 'बेंचमार्क',
    settings: 'सेटिंग्स',
    appInfo: 'के बारे में',
    testCompletion: 'पूरा करने का परीक्षण',
  },
  chat: {
    conversationReset: 'वार्तालाप रीसेट हो गया!',
    modelNotLoaded: 'मॉडल लोड नहीं हुआ, कृपया मॉडल प्रारंभ करें',
    completionFailed: 'जनन विफल: ',
    loadingModel: 'मॉडल लोड हो रहा है...',
    typeYourMessage: 'अपना संदेश टाइप करें',
    load: 'लोड',
    goToModels: 'मॉडल पर जाएं',
    readyToChat: 'चैट के लिए तैयार हैं? अंतिम उपयोग किया गया मॉडल लोड करें',
    pleaseLoadModel: 'चैट करने से पहले, कृपया मॉडल लोड करें',
    multimodalNotEnabled: 'इस मॉडल में मल्टीमॉडल सुविधाएँ सक्षम नहीं हैं, चित्र दिखाए जाएंगे लेकिन AI द्वारा संसाधित नहीं होंगे',
  },
  benchmark: {
    title: 'बेंचमार्क',
    modelSelector: {
      prompt: 'मॉडल चुनें',
    },
    buttons: {
      advancedSettings: 'उन्नत सेटिंग्स',
      startTest: 'परीक्षण शुरू करें',
      runningTest: 'परीक्षण चल रहा है...',
      clearAll: 'सब हटाएं',
      done: 'पूरा',
      cancel: 'रद्द करें',
      delete: 'हटाएं',
      share: 'साझा करें',
      sharing: 'साझा कर रहा है...',
      viewRawData: 'कच्चा डेटा देखें',
      hideRawData: 'कच्चा डेटा छिपाएं',
    },
    messages: {
      pleaseSelectModel: 'कृपया पहले एक मॉडल चुनें और प्रारंभ करें',
      testWarning: 'नोट: बड़े मॉडल को परीक्षण के लिए 2-5 मिनट की आवश्यकता हो सकती है, एक बार शुरू होने के बाद इसे रोका नहीं जा सकता',
      keepScreenOpen: 'कृपया इस स्क्रीन को खुला रखें!',
      initializingModel: 'मॉडल प्रारंभ कर रहा है...',
      modelMaxValue: '(अधिकतम मान: {{maxValue}})',
    },
    dialogs: {
      advancedSettings: {
        title: 'उन्नत सेटिंग्स',
        testProfile: 'परीक्षण प्रोफ़ाइल',
        customParameters: 'कस्टम पैरामीटर',
        description: 'विशिष्ट परीक्षण परिदृश्यों के लिए बेंचमार्क पैरामीटर को ठीक करें',
      },
      deleteResult: {
        title: 'परिणाम हटाएं',
        message: 'क्या आप इस बेंचमार्क परिणाम को हटाने के लिए निश्चित हैं?',
      },
      clearAllResults: {
        title: 'सभी परिणाम हटाएं',
        message: 'क्या आप सभी बेंचमार्क परिणामों को हटाने के लिए निश्चित हैं?',
      },
      shareResults: {
        title: 'बेंचमार्क परिणाम साझा करें',
        sharedDataTitle: 'साझा डेटा में शामिल है:',
        deviceAndModelInfo: '• डिवाइस विनिर्देश और मॉडल जानकारी',
        performanceMetrics: '• प्रदर्शन मेट्रिक्स',
        dontShowAgain: 'इस संदेश को फिर से न दिखाएं',
      },
    },
    sections: {
      testResults: 'परीक्षण परिणाम',
    },
    benchmarkResultCard: {
      modelMeta: {
        params: 'पैरामीटर',
      },
      config: {
        title: 'बेंचमार्क सेटिंग्स',
        format: 'PP: {{pp}} • TG: {{tg}} • PL: {{pl}} • Rep: {{nr}}',
      },
      modelSettings: {
        title: 'मॉडल सेटिंग्स',
        context: 'संदर्भ लंबाई: {{context}}',
        batch: 'बैच: {{batch}}',
        ubatch: 'Uबैच: {{ubatch}}',
        cpuThreads: 'CPU थ्रेड्स: {{threads}}',
        gpuLayers: 'GPU परतें: {{layers}}',
        flashAttentionEnabled: 'फ्लैश अटेंशन सक्षम',
        flashAttentionDisabled: 'फ्लैश अटेंशन अक्षम',
        cacheTypes: 'कैश प्रकार: {{cacheK}}/{{cacheV}}',
      },
      results: {
        promptProcessing: 'प्रॉम्प्ट प्रसंस्करण',
        tokenGeneration: 'टोकन जनन',
        totalTime: 'कुल समय',
        peakMemory: 'पीक मेमोरी',
        tokensPerSecond: 'टोकन/सेकंड',
      },
      actions: {
        deleteButton: '',
        submittedText: '✓ को सबमिट किया गया',
        leaderboardLink: 'AI फोन रैंकिंग ↗',
        cannotShare: 'साझा नहीं कर सकते',
        cannotShareTooltip: 'स्थानीय मॉडल परिणाम साझा नहीं किए जा सकते',
        submitButton: 'रैंकिंग में सबमिट करें',
        viewLeaderboard: 'रैंकिंग देखें ↗',
      },
      errors: {
        networkRetry: 'कनेक्शन जांचें और पुनः प्रयास करें',
        appCheckRetry: 'सबमिशन पुनः प्रयास करें',
        serverRetry: 'बाद में पुनः प्रयास करें',
        genericRetry: 'पुनः प्रयास करें',
        failedToSubmit: 'बेंचमार्क सबमिशन विफल',
      },
    },
    deviceInfoCard: {
      title: 'डिवाइस जानकारी',
      deviceSummary: '{{brand}} {{model}} • {{systemName}} {{systemVersion}}',
      coreSummary: '{{cores}} कोर • {{memory}}',
      sections: {
        basicInfo: 'मूल जानकारी',
        cpuDetails: 'CPU विवरण',
        appInfo: 'ऐप जानकारी',
      },
      fields: {
        architecture: 'आर्किटेक्चर',
        totalMemory: 'कुल मेमोरी',
        deviceId: 'डिवाइस ID',
        cpuCores: 'CPU कोर',
        cpuModel: 'CPU मॉडल',
        chipset: 'चिपसेट',
        instructions: 'निर्देश सेट',
        version: 'संस्करण',
      },
      instructions: {
        format: 'FP16: {{fp16}}, DotProd: {{dotProd}}, SVE: {{sve}}, I8MM: {{i8mm}}',
        yes: '✓',
        no: '✗',
      },
      versionFormat: '{{version}} ({{buildNumber}})',
    },
  },
  errors: {
    unexpectedError: 'अप्रत्याशित त्रुटि हुई',
    hfAuthenticationError: 'हगिंग फेस प्रमाणीकरण त्रुटि: टोकन अनुपस्थित या अमान्य',
    hfAuthenticationErrorSearch: 'हगिंग फेस प्रमाणीकरण त्रुटि: टोकन अनुपस्थित या अमान्य',
    authenticationError: 'प्रमाणीकरण त्रुटि: टोकन अनुपस्थित या अमान्य',
    hfAuthorizationError: 'हगिंग फेस प्राधिकरण त्रुटि: इस संसाधन तक पहुंच की अनुमति नहीं है',
    authorizationError: 'प्राधिकरण त्रुटि: इस संसाधन तक पहुंच की अनुमति नहीं है',
    hfServerError: 'हगिंग फेस सर्वर त्रुटि: API सर्वर समस्या',
    serverError: 'सर्वर त्रुटि: API सर्वर समस्या',
    hfNetworkTimeout: 'नेटवर्क टाइमआउट: हगिंग फेस के लिए अनुरोध में बहुत समय लगा',
    networkTimeout: 'नेटवर्क टाइमआउट: अनुरोध में बहुत समय लगा',
    hfNetworkError: 'नेटवर्क त्रुटि: हगिंग फेस API से कनेक्ट करने में असमर्थ',
    networkError: 'नेटवर्क त्रुटि: API से कनेक्ट करने में असमर्थ',
    downloadSetupFailedTitle: 'डाउनलोड सेटअप विफल',
    downloadSetupFailedMessage: 'मॉडल डाउनलोड तैयार करने में असमर्थ: {message}',
    cameraErrorTitle: 'कैमरा त्रुटि',
    cameraErrorMessage: 'फोटो लेने में विफल',
    galleryErrorTitle: 'गैलरी त्रुटि',
    galleryErrorMessage: 'छवि चयन में विफल',
  },
  simulator: {
    cameraNotAvailable: 'वर्तमान वर्चुअल मशीन में कैमरा उपलब्ध नहीं है, कृपया भौतिक मशीन का उपयोग करें!!',
  },
}}