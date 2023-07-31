import { create } from 'zustand';
import { produce } from 'immer';
import { strats } from "@/lib/strategies";

export const useStrategyStore = create((set) => ({
    strats: strats,
    activeStrategy: strats[0].name,
    setActiveStrategy: (activeStrategy) => set(produce((state) => { state.activeStrategy = activeStrategy })),
    handleControlClick: (taskTimeInSeconds, breakTimeInSeconds, name) => {
        set(produce((state) => {
            state.activeStrategy = name;
        }));
        useTimerStore.getState().reset(taskTimeInSeconds, breakTimeInSeconds);
    },
}));

export default useStrategyStore;