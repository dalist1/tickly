import { create } from 'zustand';
import { strats } from "@/lib/strategies";
import { stopInterval, startInterval } from '@/lib/utils';

export const useBreakStore = create((set) => ({
    breakSeconds: strats[0].breakTimeSeconds,
    isBreak: false,
    intervalId: null,
    start: () => {
        const id = startInterval(() => {
          set((st) => {
            if (st.breakSeconds === 0) {
              stopInterval(id);
              return { ...st, isBreak: false };
            }
            return { ...st, breakSeconds: st.breakSeconds - 1, isBreak: true };
          });
        }, 1000);
        set({ intervalId: id });
        return () => stopInterval(id);
      },
    reset: (breakTimeSeconds) => {
        set((st) => {
            stopInterval(st.intervalId);
            return { breakSeconds: breakTimeSeconds, isBreak: false, intervalId: null };
        });
    },
}));