// useBreakStore

import { create } from 'zustand';
import { produce } from 'immer';
import { strats } from "@/lib/strategies";
import { clearIntervalAndReturnNull } from '../utils';

export const useBreakStore = create((set) => ({
    breakSeconds: strats[0].breakTimeSeconds,
    isBreak: false,
    initialBreakSeconds: strats[0].breakTimeSeconds,
    round: 1,
    setBreakTimeInSeconds: (breakSeconds) => set(produce((state) => { state.breakSeconds = breakSeconds })),
    startBreak: () => {
        set(produce((state) => {
            const newBreakSeconds = state.breakSeconds - 1;
            const id = setInterval(() => {
                set(produce((state) => {
                    const newBreakSeconds = state.breakSeconds > 1 ? state.breakSeconds - 1 : state.initialBreakSeconds;
                    if (newBreakSeconds === state.initialBreakSeconds) {
                        state.intervalId = clearIntervalAndReturnNull(state.intervalId);
                        state.isBreak = false;
                        state.round += 1;
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

export default useBreakStore;