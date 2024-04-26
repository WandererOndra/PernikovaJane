import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-white">
        <div className="mx-auto px-4 py-2 sm:py-4 sm:px-6 lg:mx-8 flex justify-between items-center">
            
                <div className="flex-none w-1/3">
                    <p className=" text-xs xs:text-base">&copy; K.O.T.V.A. 2024 </p>
                </div>
                <div className="w-1/3 text-center">
                    <Link href="/pages/Gdpr" className="text-sm xs:text-base md:hidden">GDPR</Link>
                    <Link href="/pages/Gdpr" className="text-sm xs:text-base hidden md:block">Ochrana osobních údajů</Link>
                </div>
                <div className="w-1/3">
                    <div className="flex justify-end gap-4">
                        <div className="transform hover:scale-150 transition ease-out duration-300">
                            <Link className="yt-icon" href="https://www.youtube.com/channel/UCydWrtge3BA2qUO8egKatng" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-youtube" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className="transform hover:scale-150 transition ease-out duration-300">
                            <Link className="fb-icon" href="https://www.facebook.com/people/KOTVA/100064559447826/?fref=ts" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" fill="#93c5fd" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            
        </div>
    </footer>
  )
}
