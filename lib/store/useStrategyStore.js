import { create } from 'zustand';
import { strats } from "@/lib/strategies";

export const useStrategyStore = create((set) => ({
    strats,
    activeStrategy: strats[0],
    setActiveStrategy: (strategy) => set({ activeStrategy: strategy }),
}));