import { create } from 'zustand';
import { produce } from 'immer';
import { strats } from "@/lib/strategies";

const clearIntervalAndReturnNull = (id) => {
    clearInterval(id);
    return null;
};

export const useTimerStore = create((set) => ({
    taskTimeSeconds: strats[0].taskTimeSeconds,
    breakTimeSeconds: strats[0].breakTimeSeconds,
    seconds: strats[0].taskTimeSeconds,
    isActive: false,
    intervalId: null,
    isTimerEnded: false,
    setIsTimerEnded: (value) => set(produce((state) => { state.isTimerEnded = value })),
    setTimeInSeconds: (seconds) => set(produce((state) => { state.seconds = seconds })),
    toggle: () => {
        set(produce((state) => {
            if (!state.isActive) {
                const newSeconds = state.seconds - 1;
                const id = setInterval(() => {
                    set(produce((state) => {
                        const newSeconds = state.seconds > 1 ? state.seconds - 1 : 0;
                        state.seconds = newSeconds;
                    }));
                }, 1000);
                state.seconds = newSeconds;
                state.intervalId = id;
                state.isActive = true;
            } else {
                state.intervalId = clearIntervalAndReturnNull(state.intervalId);
                state.isActive = false;
            }
        }));
    },
    reset: (taskTimeInSeconds, breakTimeInSeconds) => {
        set(produce((state) => {
            state.seconds = taskTimeInSeconds;
            state.breakTime = breakTimeInSeconds;
            state.taskTimeSeconds = taskTimeInSeconds;
            state.breakTimeSeconds = breakTimeInSeconds;
            state.isActive = false;
            state.isTimerEnded = false;
            state.intervalId = clearIntervalAndReturnNull(state.intervalId);
        }));
    },
    setStrategyTimes: (taskTimeInSeconds, breakTimeInSeconds) => set(produce((state) => {
        state.taskTimeSeconds = taskTimeInSeconds;
        state.breakTimeSeconds = breakTimeInSeconds;
    }))

}));

export default useTimerStore;
