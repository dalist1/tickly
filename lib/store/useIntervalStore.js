import { create } from 'zustand'
import { clearIntervalAndReturnNull } from '../utils';

export const useIntervalStore = create((set) => ({
    intervalId: null,
    setIntervalId: (id) => set((st) => ({ ...st, intervalId: id })),
    clearIntervalId: () => set((st) => ({ ...st, intervalId: clearIntervalAndReturnNull(st.intervalId) })),
}));