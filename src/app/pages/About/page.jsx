//About.js

import Image from "next/image";

export default function About() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full">
          <Image
            src="/portrait.jpeg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: 'auto' }}
            alt="muj portret"
            priority={true}
          />
        </div>
        <div className="mx-auto my-0 md:my-8 px-4 py-4 md:pb-10 sm:px-6 lg:mx-8">
          <div className="text-center my-8 md:px-32">
            <div className="text-4xl sm:text-6xl md:text-8xl my-9 tracking-tighter">
              <h2>Něco málo o mně</h2>
            </div>
            <div className="text-lg sm:text-2xl">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
