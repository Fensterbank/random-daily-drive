import { create } from "zustand";
import { PROGRESS } from "./const";

interface Action {
  status: 'running' | 'completed' | 'failed' | 'skipped';
  error: any | null;
  meta?: string;
}

interface AppState {
  processing: string;
  setProcessing: (processing: string) => void;
  setActionStart: (actionKey: string) => void;
  setActionSkipped: (actionKey: string) => void;
  setActionCompleted: (actionKey: string, meta?: string) => void;
  setActionFailed: (actionKey: string, url: string, error: any) => void
  actions: Record<string, Action>;
  resetActions: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  processing: PROGRESS.unset,
  actions: {},
  setProcessing: (processing) => set({ processing }),
  setActionStart: (actionKey: string) => set(state => {
    return {
      actions: {
        ...state.actions,
        [actionKey]: {
          status: 'running',
          error: null,
        }
      }
    }
  }),
  setActionSkipped: (actionKey: string) => set(state => {
    return {
      actions: {
        ...state.actions,
        [actionKey]: {
          status: 'skipped',
          error: null,
        }
      }
    }
  }),
  setActionCompleted: (actionKey: string, meta?: string) => set(state => {
    return {
      actions: {
        ...state.actions,
        [actionKey]: {
          status: 'completed',
          error: null,
          meta
        }
      }
    }
  }),
  setActionFailed: (actionKey: string, url: string, error: any) => set(state => {
    console.log('Action failed', actionKey, url, error)
    return {
      actions: {
        ...state.actions,
        ...state.actions,
        [actionKey]: {
          status: 'failed',
          error,
        }
      }
    }
  }),
  resetActions: () => set({ actions: {} })
}))
