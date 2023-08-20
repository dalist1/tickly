import pkg from "@/package.json";

export default function Footer() {
    const version = pkg.version;

    return (
        <div className="flex fixed font-medium text-lg bottom-3 gap-x-2 text-gray-400">
            <a
                href="https://github.com/dalist1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
            >
                🚀 Powered by Dalist
            </a>
            <span>•</span>
            <a href="https://github.com/dalist1/tickly"
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white"
            >
                v{version}
            </a>
        </div>
    )
}