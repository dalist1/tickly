// useBreakStore
import { create } from 'zustand';
import { strats } from "@/lib/strategies";
import { useIntervalStore } from './useIntervalStore';

export const useBreakStore = () => {
    const breakInterval = useIntervalStore();

    return create((set) => ({
        breakSeconds: strats[0].breakTimeSeconds,
        isBreak: false,
        setBreakTimeInSeconds: (breakSeconds) => set({ breakSeconds }),
        toggleBreak: () => {
            set(({ isBreak }) => {
                if (!isBreak) {
                    breakInterval.setIntervalId(setInterval(() => {
                        set(state => {
                            if (state.breakSeconds === 0) {
                                breakInterval.clearIntervalId();
                                return { breakSeconds: state.breakSeconds, isBreak: false };
                            }
                            return { breakSeconds: state.breakSeconds - 1, isBreak: state.isBreak };
                        });
                    }, 1000));
                } else {
                    breakInterval.clearIntervalId();
                }
                return { isBreak: !isBreak };
            });
        },
        reset: (breakSeconds) => {
            breakInterval.clearIntervalId();
            set({ breakSeconds: breakSeconds, isBreak: false });
        },
    }));
};
