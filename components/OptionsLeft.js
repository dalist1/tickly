import { TiChartLine } from "react-icons/ti"
import { TiInfoLarge } from "react-icons/ti"
import Link from "next/link"

export default function OptionsLeft() {
    return (
        <div className="flex gap-x-4 rounded-3xl p-4">
            <Link className="bg-sky-500/20 rounded-full p-3" href="/navs/about" alt="About page">
                <TiInfoLarge size={25} className='text-sky-400' />
            </Link>
            <Link className="bg-sky-500/20 rounded-full p-3" href="/navs/dashboard" alt="Dashboard Page">
                <TiChartLine size={25} className='text-sky-400' />
            </Link>
        </div>
    )
}