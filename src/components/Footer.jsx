import React from 'react'

const Footer = () => {
    return (
        <footer
            className="
                w-full 
                mt-16 
                min-h-[12vh]
                py-6 
                bg-[#1A1D27]/95 
                text-gray-400 
                shadow-[0_-4px_20px_rgba(0,140,255,0.12)]
                flex flex-col justify-center
            "
        >
            <div className="flex flex-col items-center justify-center space-y-2 px-4 text-center">

                <div className="flex items-center text-xl font-semibold tracking-wide">
                    <span className="text-gray-100">Pass</span>
                    <span className="text-blue-400 ml-1">Guard</span>
                </div>

                <p className="text-sm text-gray-400">
                    Built with <span className="text-red-500 font-semibold">♥</span> by 
                    <span className="text-blue-400 font-medium"> You</span>.
                </p>

                <p className="text-xs text-gray-500 tracking-wide">
                    Powered by React ⚛️ & Tailwind CSS
                </p>
            </div>
        </footer>
    )
}

export default Footer