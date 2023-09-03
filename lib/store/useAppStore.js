import { useTimerStore } from './useTimerStore';
import { useStrategyStore } from './useStrategyStore';
import { useBreakStore } from './useBreakStore';

export default function useAppStore() {
    const { start: startTimer, pause: pauseTimer, reset: resetTimer, isTimerEnded, isActive, incrementRound } = useTimerStore();
    const { strats, setActiveStrategy, activeStrategy } = useStrategyStore();
    const { start: startBreak, reset: resetBreak, isBreak } = useBreakStore();

    const setTimes = (strategyName) => {
        const stratData = strats.find(strat => strat.name === strategyName);
        resetTimer(stratData.taskTimeSeconds);
        resetBreak(stratData.breakTimeSeconds);
    };

    const updateStrategyAndTimer = (newStrategy) => {
        const stratData = strats.find(strat => strat.name === newStrategy.name);
        setActiveStrategy(stratData.name);
        setTimes(stratData.name);
    };

    const handleControlClick = () => {
        if (!isActive) {
            startTimer();
        } else {
            pauseTimer();
        }
    };

    if (isTimerEnded) {
        resetTimer(activeStrategy.taskTimeSeconds);
        startBreak();
    }

    if (isBreak) {
        resetBreak(activeStrategy.breakTimeSeconds);
        incrementRound();
    }

    return {
        ...useTimerStore(),
        ...useStrategyStore(),
        ...useBreakStore(),
        updateStrategyAndTimer,
        handleControlClick,
        resetAll: () => {
            resetTimer(activeStrategy.taskTimeSeconds);
            resetBreak(activeStrategy.breakTimeSeconds);
        },
    };
}