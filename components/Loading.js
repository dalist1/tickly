export default function Loading() {
    return (
        <span
            className="inline-flex justify-center items-center cursor-pointer rounded-full h-16 w-16 bg-transparent hover:bg-white/10 border border-sky-400 drop-shadow-md shadow-sky-400">
            <div className="flex items-center justify-center space-x-1">
                <div className="w-1 h-1 bg-sky-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-sky-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-1 h-1 bg-sky-400 rounded-full animate-bounce delay-150"></div>
            </div>
        </span>
    )
}