// pages/index.js
"use client";

import Image from "next/image";

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-700 mb-10 mt-8 animate-fade-in">
            VÍTEJTE VE SVĚTĚ PERNÍKOVÉ JANE!
          </h1>
        </div>
      </section>

      <section className="flex items-center justify-center">
  <div className="max-w-5xl w-full mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 md:mx-8 lg:mx-16 bg-[url('/bgmain.jpg')] bg-center bg-cover min-h-[100px] sm:min-h-[200px] md:min-h-[300px]">
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
                  Ručně vyráběné perníčky ze žitné mouky a medu.
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
