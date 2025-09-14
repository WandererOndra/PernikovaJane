import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-300">
      <div className="mx-auto px-4 py-2 sm:py-4 sm:px-6 lg:mx-8 flex justify-between items-center">
        <div className="flex-none w-1/3"></div>

        {/* Odkazy na právní dokumenty */}
        <div className="w-1/3 text-center flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
          <Link
            href="/Gdpr"
            className="text-sm xs:text-base hover:text-yellow-700"
          >
            Ochrana osobních údajů
          </Link>
          <Link
            href="/OP"
            className="text-sm xs:text-base hover:text-yellow-700"
          >
            Obchodní podmínky
          </Link>
          <Link
            href="/RMA"
            className="text-sm xs:text-base hover:text-yellow-700"
          >
            Reklamační řád
          </Link>
          <Link
            href="/Contact"
            className="text-sm xs:text-base hover:text-yellow-700"
          >
            Kontakt
          </Link>
        </div>

        {/* Ikony sociálních sítí */}
        <div className="w-1/3">
          <div className="flex justify-end gap-4">
            <div className="transform hover:scale-150 transition ease-out duration-300">
  <Link
    className="ig-icon"
    href="https://www.instagram.com/pernikovajane"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="white" stroke-width="null" class="my-path"></path>
<path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="white" stroke-width="null" class="my-path"></path>
<path d="M17 7V7.05" stroke="white" stroke-width="null" stroke-linecap="round" class="my-path"></path>
</svg>  
  </Link>
</div>

            <div className="transform hover:scale-150 transition ease-out duration-300">
              <Link
                className="yt-icon"
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="red"
                  className="bi bi-youtube"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
              </Link>
            </div>
            <div className="transform hover:scale-150 transition ease-out duration-300">
              <Link
                className="fb-icon"
                href="https://www.facebook.com/p/Voňavé-perníčky-100066577073259/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="19"
                  fill="#93c5fd"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
