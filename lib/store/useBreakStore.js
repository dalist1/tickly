import { create } from 'zustand';
import { strats } from "@/lib/strategies";
import { stopInterval, startInterval } from '@/lib/utils';

export const useBreakStore = create((set) => ({
    breakSeconds: strats[0].breakTimeSeconds,
    isBreak: false,
    intervalId: null,
    start: () => {
        const id = startInterval(() => {
            set((state) => {
                if (state.breakSeconds === 0) {
                    stopInterval(id);
                    return { ...state, isBreak: false };
                }
                return { ...state, breakSeconds: state.breakSeconds - 1, isBreak: true };
            });
        }, 1000);
        set({ intervalId: id });
        return () => stopInterval(id);
    },
    reset: (breakTimeSeconds) => {
        set((state) => {
            stopInterval(state.intervalId);
            return { breakSeconds: breakTimeSeconds, isBreak: false, intervalId: null };
        });
    },
}));