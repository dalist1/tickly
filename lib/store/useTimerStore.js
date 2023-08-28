import { create } from 'zustand';
import { strats } from '../strategies';

export const useTimerStore = create(set => ({
    taskTimeSeconds: strats[0].taskTimeSeconds,
    isActive: false,
    isTimerEnded: false,
    intervalId: null,
    setIsTimerEnded: value => set(st => ({ ...st, isTimerEnded: value })),
    setStrategyTimes: (taskTimeSeconds) => set((st) => ({
        ...st,
        taskTimeSeconds: taskTimeSeconds,
    })),
    pause: () => set(st => {
        clearInterval(st.intervalId);
        return {...st, isActive: false, intervalId: null};
    }),
    reset: () => set(st => {
        clearInterval(st.intervalId);
        return {...st, taskTimeSeconds: activeStrategy, isActive: false, isTimerEnded: false, intervalId: null};
    }),
    toggleTask: () => {
        set(st => {
            let newTaskTimeSeconds = st.taskTimeSeconds;
            let id = st.intervalId;
            if (!st.isActive) {
                id = setInterval(() => {
                    set(st => {
                        newTaskTimeSeconds = st.taskTimeSeconds - 1;
                        if (newTaskTimeSeconds === 0) {
                            clearInterval(id);
                            return { ...st, taskTimeSeconds: newTaskTimeSeconds, intervalId: null, isActive: false, isTimerEnded: true };
                        }
                        return { ...st, taskTimeSeconds: newTaskTimeSeconds };
                    });
                }, 1000);
                newTaskTimeSeconds -= 1;
            } else {
                clearInterval(id);
                id = null;
            }
            return { ...st, taskTimeSeconds: newTaskTimeSeconds, intervalId: id, isActive: !st.isActive };
        });
    },
}));