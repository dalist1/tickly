import { create } from 'zustand';
import { produce } from 'immer';
import { strats } from "@/lib/strategies";

const clearIntervalAndReturnNull = (id) => {
    clearInterval(id);
    return null;
};

const useTimerStore = create((set) => ({
    strats: strats,
    seconds: strats[0].taskTimeSeconds,
    isActive: false,
    intervalId: null,
    activeStrategy: strats[0].name,
    breakSeconds: strats[0].breakTimeSeconds,
    isBreak: false,
    initialBreakSeconds: strats[0].breakTimeSeconds,
    round: 1,
    isTimerEnded: false,
    setIsTimerEnded: (value) => set(produce((state) => { state.isTimerEnded = value })),
    setTimeInSeconds: (seconds) => set(produce((state) => { state.seconds = seconds })),
    setBreakTimeInSeconds: (breakSeconds) => set(produce((state) => { state.breakSeconds = breakSeconds })),
    setActiveStrategy: (activeStrategy) => set(produce((state) => { state.activeStrategy = activeStrategy })),
    handleControlClick: (taskTimeInSeconds, breakTimeInSeconds, name) => {
        set(produce((state) => {
            if (state.isActive) {
                state.intervalId = clearIntervalAndReturnNull(state.intervalId);
            }
            state.isActive = false;
            state.round = 1;
            state.seconds = taskTimeInSeconds;
            state.breakSeconds = breakTimeInSeconds;
            state.activeStrategy = name;
        }));
    },
    reset: () => {
        set(produce((state) => {
            state.seconds = strats[0].taskTimeSeconds;
            state.isActive = false;
            state.intervalId = clearIntervalAndReturnNull(state.intervalId);
            state.isTimerEnded = false;
            state.breakSeconds = state.initialBreakSeconds;
            state.isBreak = false;
            state.round = 1;
        }));
    },
    toggle: () => {
        set(produce((state) => {
            if (state.isBreak) {
                return;
            }
            if (!state.isActive) {
                const newSeconds = state.seconds - 1;
                const id = setInterval(() => {
                    set(produce((state) => {
                        const newSeconds = state.seconds > 1 ? state.seconds - 1 : 0;
                        if (newSeconds === 0) {
                            state.intervalId = clearIntervalAndReturnNull(state.intervalId);
                            state.startBreak();
                        }
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
    startBreak: () => {
        set(produce((state) => {
            const newBreakSeconds = state.breakSeconds - 1;
            const id = setInterval(() => {
                set(produce((state) => {
                    const newBreakSeconds = state.breakSeconds > 1 ? state.breakSeconds - 1 : state.initialBreakSeconds;
                    if (newBreakSeconds === state.initialBreakSeconds) {
                        state.intervalId = clearIntervalAndReturnNull(state.intervalId);
                        state.isBreak = false;
                        state.isActive = false;
                        state.round += 1;
                        state.seconds = strats[0].taskTimeSeconds;
                    }
                    state.breakSeconds = newBreakSeconds;
                }));
            }, 1000);
            state.breakSeconds = newBreakSeconds;
            state.intervalId = id;
            state.isBreak = true;
        }));
    },
}));

export default useTimerStore;