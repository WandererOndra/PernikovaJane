// pages/index.js
"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      {/* Hero Section */}
      <section className="flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-8 animate-fade-in">
            VÍTEJTE VE SVĚTĚ PERNÍKOVÉ JANE!
          </h1>
        </div>
      </section>

      <section className=" flex items-center justify-center">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 md:mx-8 lg:mx-16 bg-[url('/bgmain.jpg')] bg-center bg-cover">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-in">
              VÍTEJTE VE SVĚTĚ PERNÍKOVÉ JANE!
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 flex items-center justify-center">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 md:mx-8 lg:mx-16 justify-center">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-600 mb-6">
              Co u nás najdete:
            </h2>
            <div className="space-y-6 text-gray-700 text-lg sm:text-xl leading-relaxed">
              <div>
                <p className="font-semibold">🎨 Perníkové omalovánky</p>
                <p>Zábava pro malé i velké!</p>
                <p className="mt-2">
                  Ručně vyráběné perníčky za žitné mouky a medu.
                </p>
                <p>
                  Vymalujte si vlastní perníček nebo si nechte připravit sadu pro
                  tvořivé chvíle s dětmi.
                </p>
              </div>
              <div>
                <p className="font-semibold">🚐 Sladké mobilní workshopy</p>
                <p>Přijedeme za vámi!</p>
                <p className="mt-2">
                  Naučte se sladké dobroty pod vedením zkušených cukrářek a
                  perníkářek – ideální program do škol, na dětské oslavy, firemní
                  i rodinné akce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}