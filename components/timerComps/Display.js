import { formatSeconds } from "@/lib/utils/formatSeconds";
import useAppStore from '@/lib/store/useAppStore';

export default function Display() {
  const { isBreak, seconds, breakSeconds } = useAppStore();

  return isBreak ? (
    <span className="text-3xl text-red-500">
      Break: {formatSeconds(breakSeconds)}
    </span>
  ) : (
    <span className="text-3xl text-white">{formatSeconds(seconds)}</span>
  );
}
