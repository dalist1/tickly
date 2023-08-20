    // useTimerStore

    import { create } from 'zustand';
    import { produce } from 'immer';
    import { strats } from "@/lib/strategies";
    import { useTrackingStore } from './useTrackingStore';
    import { useStrategyStore } from './useStrategyStore';
    import { clearIntervalAndReturnNull } from '../utils';

    export const useTimerStore = create((set) => ({
        taskTimeSeconds: strats[0].taskTimeSeconds,
        breakTimeSeconds: strats[0].breakTimeSeconds,
        seconds: strats[0].taskTimeSeconds,
        isActive: false,
        isBreak: false,
        intervalId: null,
        isTimerEnded: false,
        setIsTimerEnded: (value) => set(produce((state) => { state.isTimerEnded = value })),
        setTimeInSeconds: (seconds) => set(produce((state) => { state.seconds = seconds })),
        toggle: () => {
            set(produce((state) => {
                const activeStrategy = useStrategyStore.getState().activeStrategy;
                const trackingData = useTrackingStore.getState().trackingData;
                if (!state.isActive && !state.isBreak) {
                    useTrackingStore.getState().storeTrackingData(activeStrategy, trackingData);
                    const id = setInterval(() => {
                        set(produce((state) => {
                            const newSeconds = state.seconds > 1 ? state.seconds - 1 : 0;
                            state.seconds = newSeconds;
                        }));
                    }, 1000);
                    if (state.seconds > 0) {
                        state.seconds -= 1;
                    }
                    state.intervalId = id;
                    state.isActive = true;

                } else if (state.isActive && !state.isBreak) {
                    useTrackingStore.getState().stopTracking(activeStrategy);
                    useTrackingStore.getState().storeTrackingData(activeStrategy, trackingData); // Store data immediately after stopping tracking
                    useTrackingStore.getState().startTracking(activeStrategy, true);
                    state.intervalId = clearIntervalAndReturnNull(state.intervalId);
                    state.isActive = false;
                    state.isBreak = true;
                } else if (state.isBreak) {
                    useTrackingStore.getState().stopTracking(activeStrategy);
                    useTrackingStore.getState().storeTrackingData(activeStrategy, trackingData); // Store data immediately after stopping tracking
                    state.intervalId = clearIntervalAndReturnNull(state.intervalId);
                    state.isBreak = false;
                    state.isActive = true;

                    const id = setInterval(() => {
                        set(produce((state) => {
                            const newSeconds = state.seconds > 1 ? state.seconds - 1 : 0;
                            state.seconds = newSeconds;
                        }));
                    }, 1000);
                    state.intervalId = id;
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
                state.isBreak = false;
                state.intervalId = clearIntervalAndReturnNull(state.intervalId);
            }));
        },
        setStrategyTimes: (taskTimeInSeconds, breakTimeInSeconds) => set(produce((state) => {
            state.taskTimeSeconds = taskTimeInSeconds;
            state.breakTimeSeconds = breakTimeInSeconds;
        }))

    }));

    export default useTimerStore;