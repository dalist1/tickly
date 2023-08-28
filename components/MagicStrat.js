"use client"

import { BiSolidMagicWand } from "react-icons/bi";
import useStrategyStore from "@/lib/store/useStrategyStore";
import Loading from './Loading';

export default function MagicStrat() {
    const { loading } = useStrategyStore.getState();

    const handleAiStrat = () => {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await fetch('/api/openai');
            const data = await response.json();
            updateTimerSettings(data.taskTimeSeconds, data.breakTimeSeconds, data.name);
            resolve();
          } catch (error) {
            reject(error);
          }
        });
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
