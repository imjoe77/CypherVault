import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-[#1E212E] w-full min-h-[10vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-10 lg:px-18 py-4 md:py-0 text-white">

            {/* LEFT Side - Logo */}
            <div className="flex items-center gap-4 md:gap-0">
              <img
  src={`${import.meta.env.BASE_URL}logo.png`}
  alt="PassGuard Logo"
  className="h-12 w-12 md:h-16 md:w-16 object-contain md:mx-10"
/>
                <h1 className="text-3xl md:text-4xl font-semibold text-blue-400 tracking-wide">
                    PassGuard
                </h1>
            </div>

            {/* RIGHT Side - Links */}
            {/* Mobile: Wrapped & centered. Desktop: Original layout */}
            <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-9 mt-4 md:mt-0 md:mr-15 text-lg md:text-2xl">

                {/* Normal Links */}
                <li>
                    <a className="hover:text-blue-300 transition-all duration-200" href="#">
                        Dashboard
                    </a>
                </li>

                <li className="flex items-center gap-3">
                    <span className="text-gray-400 hidden md:block">|</span>
                    <a className="hover:text-blue-300 transition-all duration-200" href="#">
                        Sharing
                    </a>
                </li>

                <li className="flex items-center gap-3">
                    <span className="text-gray-400 hidden md:block">|</span>
                    <a className="hover:text-blue-300 transition-all duration-200" href="#">
                        Security
                    </a>
                </li>

                <li className="flex items-center gap-3">
                    <span className="text-gray-400 hidden md:block">|</span>
                    <a className="hover:text-blue-300 transition-all duration-200" href="#">
                        Account
                    </a>
                </li>

                {/* Icon Hover */}
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