import { useTimerStore } from './useTimerStore';
import { useStrategyStore } from './useStrategyStore';
import { useBreakStore } from './useBreakStore';
import { useTrackingStore } from './useTrackingStore';

export default function useAppStore() {
    const timer = useTimerStore();
    const strategy = useStrategyStore();
    const breakStore = useBreakStore();
    const tracking = useTrackingStore();

    const setTimes = (strategyName) => {
        const activeStrategyData = strategy.strats.find(strat => strat.name === strategyName);
        timer.setStrategyTimes(activeStrategyData.taskTimeSeconds);
        breakStore.reset(activeStrategyData.breakTimeSeconds);
    };
    return {
        ...timer,
        ...strategy,
        ...breakStore,
        ...tracking,
        updateStrategyAndTimer: (newStrategy) => {
            const activeStrategyData = strategy.strats.find(strat => strat.name === newStrategy.name);
            if (activeStrategyData) {
                strategy.setActiveStrategy(activeStrategyData.name);
                timer.setStrategyTimes(activeStrategyData.taskTimeSeconds);
                breakStore.reset(activeStrategyData.breakTimeSeconds);
            }
        },
        handleControlClick: () => {
            const { isActive } = timer;

            if (!isActive) {
                timer.toggleTask();
            } else {
                timer.pause();
            }
        },
        reset: () => {
            setTimes(strategy.activeStrategy);
        },
    };
}
