// This file provides AiType enum for compatibility with existing imports
// It maps to the same values as PalType from PalsSheets

export enum AiType {
  ROLEPLAY = 'roleplay',
  ASSISTANT = 'assistant',
  VIDEO = 'video',
}

// Re-export from PalsSheets for compatibility
export { PalType } from '../PalsSheets/types';
export type {
  AssistantFormData,
  RoleplayFormData,
  VideoPalFormData,
  PalFormData,
} from '../PalsSheets/types';
