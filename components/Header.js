import OptionsLeft from "@/components/OptionsLeft";
// import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { BiSolidUserCircle } from "react-icons/bi"
import Clock from "./timerComps/Clock";

export default function Header() {
    return (
        <div className="flex w-full items-center gap-8 justify-center p-4 top-0 fixed mx-auto">
            <OptionsLeft />
            {/* <Clock /> */}
            {/* <Suspense fallback={<BiSolidUserCircle size={25} />}>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </Suspense >
            <Suspense fallback={<BiSolidUserCircle size={25} />}>
                <SignedOut>
                    <SignInButton afterSignInUrl="/" mode="modal">
                        <button className="btn">
                            <BiSolidUserCircle size={25} />
                        </button>
                    </SignInButton>
                </SignedOut>
            </Suspense> */}
        </div>
    )

}