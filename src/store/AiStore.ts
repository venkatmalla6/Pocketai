import {palStore, Pal, AssistantPal, RoleplayPal, VideoPal} from './PalStore';
import {
  AssistantFormData,
  RoleplayFormData,
  VideoPalFormData,
} from '../components/PalsSheets/types';

// Type aliases for AI terminology with extended properties
export type Ai = Pal & {
  aiType: any; // Maps to palType
};
export type AssistantAi = AssistantPal & {
  aiType: any;
};
export type RoleplayAi = RoleplayPal & {
  aiType: any;
};
export type VideoAi = VideoPal & {
  aiType: any;
};

// AI Store wrapper around PalStore
class AiStore {
  // Getter that delegates to palStore and maps properties
  get ais(): Ai[] {
    return palStore.pals.map(pal => ({
      ...pal,
      aiType: pal.palType, // Map palType to aiType
    })) as Ai[];
  }

  addAi = (data: AssistantFormData | RoleplayFormData | VideoPalFormData) => {
    return palStore.addPal(data);
  };

  updateAi = (
    id: string,
    data: Partial<AssistantFormData | RoleplayFormData | VideoPalFormData>,
  ) => {
    return palStore.updatePal(id, data);
  };

  deleteAi = (id: string) => {
    return palStore.deletePal(id);
  };

  getAis = () => {
    return palStore.getPals();
  };
}

export const aiStore = new AiStore();

// Re-export initialization function
export {initializeDefaultAssistants} from './PalStore';
