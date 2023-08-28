'use client'
// ControlButtons (React Component)
import { MdReplay } from "react-icons/md";
import { HiMiniPlay } from "react-icons/hi2";
import { FaPause } from "react-icons/fa";
import Button from "@/components/ui/Button";
import useAppStore from '@/lib/store/useAppStore';

export default function ControlButtons() {
    const { reset, handleControlClick, isBreak, isActive } = useAppStore();

    return (
        <div className="space-x-20">
            <Button variant="primary" onClick={handleControlClick} disabled={isBreak}>
                {isBreak || !isActive ? <HiMiniPlay size={40} /> : <FaPause size={40} />}
            </Button>
            <Button variant="secondary" onClick={reset}>
                <MdReplay size={40} />
            </Button>
        </div>
    );
}
