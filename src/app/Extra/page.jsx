// src/app/extra/page.jsx
'use client';

import Link from 'next/link';
import Poster from './poster';
import posters from './posters';
import Review from './review';
import reviews from './reviews';

export default function Extra() {
  return (
    <main className="bg-amber-100 px-4 py-8 sm:px-6">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-700 mb-8 animate-fade-in">
            Mobilní sladké workshopy
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            Sladká radost až k vám! Zábavné a edukativní aktivity, při kterých si
            (nejen) děti mohou vytvořit vlastní sladké dobroty.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 flex items-center justify-center">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 md:mx-8 lg:mx-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700 mb-6 text-center">
            Co nabízíme?
          </h2>
          <div className="text-gray-700 text-lg sm:text-xl leading-relaxed space-y-4 mb-8">
            <ul className="list-disc list-inside space-y-2">
              <li>Tvořivé dílny s profesionálním vedením</li>
              <li>Kvalitní a bezpečné suroviny</li>
              <li>Vhodné pro MŠ, ZŠ, tábory i družiny</li>
              <li>Variabilní program podle věku a počtu dětí</li>
              <li>Možnost tematických workshopů (Vánoce, Velikonoce, Halloween…)</li>
              <li>
                Přijedeme za vámi kamkoliv! Vše si přivezeme s sebou – stačí nám
                jen prostor ve školní kuchyňce nebo ve třidě.
              </li>
            </ul>
            <p>
              Děti se naučí něco nového a odnesou si vlastnoručně vytvořenou
              sladkost i spoustu radosti.
            </p>
            <p className="font-semibold">
              Zábava, která voní a chutná! Sladké workshopy jsou ideální jako
              zpestření výuky, školních akcí i projektových dnů.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <Link
              href="/Contact"
              className="inline-block bg-yellow-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors duration-300"
              aria-label="Kontaktujte nás pro více informací o workshopech"
            >
              Poptat workshop
            </Link>
          </div>
        </div>
      </section>

      {/* Posters/Photos Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700 mb-8 text-center">
            Ukázka mých workshopů
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posters.map((poster, i) => (
              <Poster key={i} {...poster} />
            ))}
          </div>
        </div>
      </section>
      {/* Reviews */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700 mt-12 mb-6 text-center">
                  Recenze
                </h2>
                <div className="flex flex-wrap gap-4 md:gap-6 items-start">
                  {reviews.map((review, i) => (
                    <div key={i} className="w-full md:w-[calc(50%-0.75rem)]">
                      <Review {...review} />
                    </div>
                  ))}
                </div>
          </div>
       </section>
    </main>
  );
}
