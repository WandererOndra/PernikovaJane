// pages/index.js
"use client";

import Image from "next/image";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin", "latin-ext"] });

export default function Home() {
const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Perníková Jane",
    image: "https://www.pernikovajane.cz/logo.png",
    url: "https://www.pernikovajane.cz/",
    telephone: "+420123456789",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vaše ulice 123",
      addressLocality: "Praha",
      postalCode: "11000",
      addressCountry: "CZ",
    },
    sameAs: [
      "https://www.facebook.com/pernikovajane",
      "https://www.instagram.com/pernikovajane",
    ],
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className={dancingScript.className}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-700 mb-8 mt-10 animate-fade-in">
            Vítejte ve světě Perníkové Jane!
          </h1>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:py-20">
          <Image
            src="/Logo.png"
            alt="Logo Perníková Jane"
            width={400}
            height={400}
            className="rounded-full object-contain w-[60vw] sm:w-[40vw] md:w-[25vw] max-w-[300px] aspect-square"
            priority
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 flex items-center justify-center">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 md:mx-8 lg:mx-16 justify-center">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700 mb-6">
              Co u nás najdete:
            </h2>
            <div className="space-y-6 text-gray-700 text-lg sm:text-xl leading-relaxed">
              <div>
                <p className="font-semibold">🎨 Perníkové omalovánky</p>
                <p>Zábava pro malé i velké!</p>
                <p className="mt-2">
                  Ručně vyráběné dekrativní perníčky ze žitné mouky a medu.
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
