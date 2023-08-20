'use client'

import useTimerStore from './useTimerStore';
import useStrategyStore from './useStrategyStore';
import useBreakStore from './useBreakStore';

export default function useAppStore() {
    const timer = useTimerStore();
    const strategy = useStrategyStore();
    const breakStore = useBreakStore();

    const handleControlClick = (taskTimeInSeconds, breakTimeInSeconds, name) => {
        timer.reset(taskTimeInSeconds, breakTimeInSeconds);
        timer.setStrategyTimes(taskTimeInSeconds, breakTimeInSeconds);
        strategy.setActiveStrategy(name);
    };

    return {
        ...timer,
        ...strategy,
        ...breakStore,
        handleControlClick,
    };
}