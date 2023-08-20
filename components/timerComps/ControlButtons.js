import { MdReplay } from "react-icons/md";
import { HiMiniPlay } from "react-icons/hi2";
import { FaPause } from "react-icons/fa";
import Button from "@/components/ui/Button";
import useAppStore from '@/lib/store/useAppStore';

export default function ControlButtons() {
    const { taskTimeSeconds, breakTimeInSeconds, toggle, isBreak, isActive, reset } = useAppStore(state => ({
        taskTimeSeconds: state.taskTimeSeconds,
        breakTimeInSeconds: state.breakTimeInSeconds,
        reset: state.reset
    }));


    return (
        <div className="space-x-20">
            <Button variant="primary" onClick={toggle} disabled={isBreak}>
                {isBreak || !isActive ? <HiMiniPlay size={40} /> : <FaPause size={40} />}
            </Button>
            <Button variant="secondary" onClick={() => reset(taskTimeSeconds, breakTimeInSeconds)}>
                <MdReplay size={40} />
            </Button>

        </div>
    );
}