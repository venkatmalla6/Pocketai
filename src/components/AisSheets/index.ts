// AisSheets compatibility layer - re-exports from PalsSheets
export { AiType } from './types';
export type {
  AssistantFormData,
  RoleplayFormData,
  VideoPalFormData,
  PalFormData,
} from './types';

// Re-export components from PalsSheets with Ai naming for compatibility
export {
  AssistantPalSheet as AssistantAiSheet,
  RoleplayPalSheet as RoleplayAiSheet,
  VideoPalSheet as VideoAiSheet,
} from '../PalsSheets';
