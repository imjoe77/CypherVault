import React from 'react'

const Navbar = () => {
    return (
        // FIXED: Changed 'flex-col' back to 'flex-row' so it stays horizontal on mobile
        <nav className="bg-[#1E212E] w-full min-h-[10vh] flex flex-row items-center justify-between px-4 md:px-10 lg:px-18 py-4 md:py-0 text-white">

            {/* LEFT Side - Logo */}
            <div className="flex items-center gap-2 md:gap-4">
                <img
                    src={`${import.meta.env.BASE_URL}logo.png`}
                    alt="PassGuard Logo"
                    // Adjusted logo size slightly for mobile safety
                    className="h-10 w-10 md:h-16 md:w-16 object-contain md:mx-10"
                />
                <h1 className="text-2xl md:text-4xl font-semibold text-blue-400 tracking-wide">
                    PassGuard
                </h1>
            </div>

            {/* RIGHT Side - Links */}
            {/* FIXED: 
                1. kept 'flex-row' to avoid stacking.
                2. 'gap-3' on mobile, 'gap-9' on desktop.
            */}
            <ul className="flex flex-row items-center gap-3 md:gap-9 md:mr-15 text-lg md:text-2xl">

                {/* --- LINKS TO HIDE ON MOBILE --- */}
                
                {/* 1. Dashboard: Hidden on mobile (hidden), visible on desktop (md:block) */}
                <li className="hidden md:block">
                    <a className="hover:text-blue-300 transition-all duration-200" href="#">
                        Dashboard
                    </a>
                </li>

                {/* 2. Sharing: Hidden on mobile */}
                <li className="hidden md:flex items-center gap-3">
                    <span className="text-gray-400">|</span>
                    <a className="hover:text-blue-300 transition-all duration-200" href="#">
                        Sharing
                    </a>
                </li>

                {/* 3. Security: Hidden on mobile */}
                <li className="hidden md:flex items-center gap-3">
                    <span className="text-gray-400">|</span>
                    <a className="hover:text-blue-300 transition-all duration-200" href="#">
                        Security
                    </a>
                </li>

                {/* --- LINKS VISIBLE ON MOBILE --- */}

                {/* 4. Account: VISIBLE on mobile (flex) */}
                <li className="flex items-center gap-3">
                    {/* Pipe only visible on desktop to separate from hidden links */}
                    <span className="text-gray-400 hidden md:block">|</span>
                    <a className="hover:text-blue-300 transition-all duration-200" href="#">
                        Account
                    </a>
                </li>

                {/* 5. Icon: VISIBLE on mobile */}
                <li className="flex items-center gap-3">
                    <span className="text-gray-400 hidden md:block">|</span>
                    <a href="#">
                        <img 
                            src={`${import.meta.env.BASE_URL}thumb.png`}
                            alt="Thumb Icon"
                            className="
                                h-8 w-8 md:h-10 md:w-10 object-contain border-2 border-white rounded-full p-1 
                                transition-all duration-300 
                                hover:scale-110 hover:border-blue-400 hover:shadow-[0_0_10px_#3b82f6]
                            "
                        />
                    </a>
                </li>

            </ul>
        </nav>
    )
}

export default Navbar