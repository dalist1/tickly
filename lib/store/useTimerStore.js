import { create } from 'zustand';
import { strats } from '../strategies';
import { stopInterval, startInterval } from '@/lib/utils';

export const useTimerStore = create((set) => ({
    round: 1,
    taskTimeSeconds: strats[0].taskTimeSeconds,
    isActive: false,
    isTimerEnded: false,
    intervalId: null,
    setIsTimerEnded: (value) => set({ isTimerEnded: value }),
    incrementRound: () => set((st) => ({ round: st.round + 1 })),
    start: () => {
        const id = startInterval(() => {
            set((st) => {
                if (st.taskTimeSeconds === 0) {
                    stopInterval(id);
                    return { ...st, isActive: false, isTimerEnded: true };
                }
                return { ...st, taskTimeSeconds: st.taskTimeSeconds - 1 };
            });
        }, 1000);
        set({ isActive: true, intervalId: id });
        return () => stopInterval(id);
    },
    pause: () => {
        set((st) => {
            stopInterval(st.intervalId);
            return { ...st, isActive: false, intervalId: null };
        });
    },
    reset: (taskTimeSeconds) => {
        set((st) => {
            stopInterval(st.intervalId);
            return { taskTimeSeconds, isActive: false, isTimerEnded: false, intervalId: null };
        });
    }
}));