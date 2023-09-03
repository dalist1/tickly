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
    incrementRound: () => set((state) => ({ round: state.round + 1 })),
    start: () => {
        const id = startInterval(() => {
            set((state) => {
                if (state.taskTimeSeconds === 0) {
                    stopInterval(id);
                    return { ...state, isActive: false, isTimerEnded: true };
                }
                return { ...state, taskTimeSeconds: state.taskTimeSeconds - 1 };
            });
        }, 1000);
        set({ isActive: true, intervalId: id });
        return () => stopInterval(id);
    },
    pause: () => {
        set((state) => {
            stopInterval(state.intervalId);
            return { ...state, isActive: false, intervalId: null };
        });
    },
    reset: (taskTimeSeconds) => {
        set((state) => {
            stopInterval(state.intervalId);
            return { taskTimeSeconds, isActive: false, isTimerEnded: false, intervalId: null };
        });
    }
}));