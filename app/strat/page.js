import { strats } from "@/lib/strategies";
import { convertSecondsToMinutes } from "@/components/ActionButton";

export default function Page() {
  return (
    <div className="overflow-y-hidden py-10">
      <div className="mx-auto max-w-sm space-y-4 overflow-y-scroll rounded-lg bg-gray-200 p-4">
        {strats.map((strat) => (
          <div
            className="flex cursor-pointer justify-between rounded-lg bg-white px-4 py-4 text-gray-900 shadow hover:drop-shadow-lg"
            key={strat?.name}
          >
            <div className="space-y-3">
              <p>{strat?.name}</p>
              <p className="text-sm text-gray-500">{strat?.description}</p>
              <div className="inline-flex space-x-1 text-xs text-gray-500">
                <p>{convertSecondsToMinutes(strat?.taskTimeSeconds)}</p>
                <p>•</p>
                <p>{convertSecondsToMinutes(strat?.breakTimeSeconds)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}