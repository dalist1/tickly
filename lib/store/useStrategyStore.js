import { create } from 'zustand';
import { strats } from "@/lib/strategies";

export const useStrategyStore = create((set) => ({
    strats: strats,
    activeStrategy: strats[0].name,
    setActiveStrategy: (activeStrategy) => set((state) => { 
        return { ...state, activeStrategy: activeStrategy }; 
    }),
    handleControlClick: (taskTimeInSeconds, breakTimeInSeconds, name) => {
        set((state) => {
            return { ...state, activeStrategy: name };
        });
        useTimerStore.getState().reset(taskTimeInSeconds, breakTimeInSeconds);
    },
}));

export default useStrategyStore;