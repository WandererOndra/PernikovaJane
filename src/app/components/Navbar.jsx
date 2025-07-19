//navbar.jsx

"use client"

import { Raleway } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const raleway = Raleway({ subsets: ["latin"] });


export default function Navbar() {

    const [isClicked, setIsClicked] = useState(false);
    const toggleNavbar = () => {
        setIsClicked(!isClicked)
    }

    const handleClick = () => {
        setIsClicked(false);
    }

  return (
    <>
        <nav className="bg-orange-300 sticky top-0 z-50">
            <div className="mx-1 sm:mx-auto px-0 sm:px-4 py-4 md:px-6 lg:mx-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <Image 
                                    src="/Logo.png" 
                                    width={50}
                                    height={50}
                                    alt="logo" 
                                    />                               
                                <div className={raleway.className}>
                                    <div className="flex flex-col pl-4">
                                        <span className="text-2xl xs:text-3xl sm:text-4xl  text-yellow-700">PERNÍKOVÁ JANE</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-4">
                            <Link href="/" className="btnMenu transitionBtn">ŮVOD</Link>
                            <Link href="/Extra" className="btnMenu transitionBtn">Workshopy</Link>
                            <Link href="/Gallery" className="btnMenu transitionBtn">Galerie</Link>
                            <Link href="/Shop" className="btnMenu transitionBtn">E-SHOP</Link>
                            <Link href="/Contact" className="btnMenu transitionBtn">Kontakt</Link>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="inline-flex items-center justify-center p-2 rounded-lg text-yellow-700 hover:text-yellow-700 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-300 transition ease-out duration-300"
                        onClick={toggleNavbar}>
                            {isClicked ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isClicked && (
                <div className="md:hidden bg-orange-300 sm:w-64 py-4 px-4 absolute top-20 right-0 rounded-b-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-end sm:px-3">
                    <Link href="/" className="btnMenu block" onClick={handleClick}>Úvod</Link>
                    <Link href="/Extra" className="btnMenu block" onClick={handleClick}>Workshopy</Link>
                    <Link href="/Gallery" className="btnMenu block" onClick={handleClick}>Galerie</Link>
                    <Link href="/Shop" className="btnMenu block" onClick={handleClick}>E-SHOP</Link>
                    <Link href="/Contact" className="btnMenu block" onClick={handleClick}>Kontakt</Link>
                    </div>
                </div>
            )}
        </nav>
    </>
  )
}


