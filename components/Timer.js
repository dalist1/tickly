import { FaPlus } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ControlButtons from "@/components/timerComps/ControlButtons";
import StratsModal from "./StratsModal";
import Display from "@/components/timerComps/Display";
import RoundIndicator from "./timerComps/RoundIndicator";

export default function Timer() {

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex max-w-md flex-col items-center justify-center gap-y-14 rounded-3xl bg-slate-900 px-10 py-10 text-center">
        <Display />
        <ControlButtons />
        <RoundIndicator />
      </div>
      <div className="mt-12 flex gap-x-6">
        <Dialog>
          <DialogTrigger asChild >
            <span className="group relative flex h-16 w-16 cursor-pointer">
              <span className="opacity-55 absolute inline-flex h-full w-full rounded-full bg-sky-400 duration-1000 group-hover:animate-ping"></span>
              <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400">
                {" "}
                <FaPlus size={25} />
              </span>
            </span>
          </DialogTrigger>
          <DialogContent>
            <StratsModal />
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
}
