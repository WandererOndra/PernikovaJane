//Home

import Image from "next/image";

export default function Home() {
  return (
   <main>
    <div className="max-w-7xl mx-auto px-4 py-0 xs:pt-4 sm:px-6 lg:mx-40 sm:py-40">
      <div className="flex items-center flex-col sm:flex-row justify-between gap-5 pt-5">
        <div className="flex flex-none sm:w-2/3 lg:w-1/2 text-center">
          <h1 className="text-5xl sm:text-6xl leading-tight md:text-8xl font-bold">
            Vítejte na našich nových stránkách!
          </h1>
        </div>
        <div className="flex">
          <Image 
            src="/kotva.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '200px', height: 'auto' }}
            alt="Obrázek kotvy"
            priority={true}
          />
        </div>
      </div>
    </div>
   </main>
  );
}
