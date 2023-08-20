import Link from "next/link"
import { BiChevronLeftCircle } from "react-icons/bi"

export default function NavLayout({ children }) {
    return (
            <div className="flex flex-col gap-y-4 my-10 w-screen h-screen">
                <Link href="/" className="flex items-center gap-x-3 p-4 border rounded-3xl hover:text-sky-400 text-xl fixed top-2 left-2">
                    <BiChevronLeftCircle />
                    <span>Home</span>
                </Link >
                {children}
            </div>
    )
}