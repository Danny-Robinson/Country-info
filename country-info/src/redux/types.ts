export const CLEAR_STORE = "CLEAR_STORE";
export interface ClearStoreAction {
  type: typeof CLEAR_STORE;
}

export type GeneralStoreActions = ClearStoreAction;

export type AppActions = GeneralStoreActions;
