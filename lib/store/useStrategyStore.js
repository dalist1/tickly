// useStrategyStore
import { create } from 'zustand';
import { strats } from "@/lib/strategies";

export const useStrategyStore = create(set => ({
    strats: strats,
    activeStrategy: strats[0].name,
    setActiveStrategy: activeStrategy => set(st => ({ ...st, activeStrategy })),
}));
