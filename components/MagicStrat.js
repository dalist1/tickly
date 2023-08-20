import { useState } from 'react';
import { BiSolidMagicWand } from "react-icons/bi";
import useAppStore from "@/lib/store/useAppStore";
import Loading from './Loading';

export default function MagicStrat() {
    const { handleControlClick } = useAppStore()
    const [loading, setLoading] = useState(false);

    const handleAiStrat = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/openai');
            const data = await response.json();
            handleControlClick(data.taskTimeSeconds, data.breakTimeSeconds, data.name);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        loading ? <Loading /> :
            <span
                className="inline-flex justify-center items-center cursor-pointer rounded-full h-16 w-16 bg-transparent hover:bg-sky-400/10 border border-sky-400 hover:shadow hover:shadow-sky-400"
                onClick={handleAiStrat}>
                <BiSolidMagicWand size={25} />
            </span>
    )
}
