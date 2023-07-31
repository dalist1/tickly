import useAppStore from '@/lib/store/useAppStore';

export default function RoundIndicator() {
  const { round } = useAppStore();

  return round && <div className="mt-2 text-2xl text-sky-400">Round {round}</div>;
}
