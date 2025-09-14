// src/app/gallery/page.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Review from './review';
import reviews from './reviews';
import images from './images';

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel navigation
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="bg-amber-100 px-4 py-8 sm:px-6">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-700 mb-8 animate-fade-in">
            Galerie a recenze
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            Prohlédněte si ukázky mých sladkých workshopů a přečtěte si, co o mně
            říkají moji spokojení klienti.
          </p>
        </div>
      </section>

      {/* Gallery and Reviews Section */}
      <section className="py-16 flex items-center justify-center">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 md:mx-8 lg:mx-16">
          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((image) => (
                  <div key={image.id} className="min-w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover rounded-lg"
                      priority={image.id === 1}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-rose-600 text-white p-2 rounded-full hover:bg-rose-500 transition-colors duration-300"
              aria-label="Předchozí obrázek"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-rose-600 text-white p-2 rounded-full hover:bg-rose-500 transition-colors duration-300"
              aria-label="Další obrázek"
            >
              →
            </button>
            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-rose-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Přejít na obrázek ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Reviews */}
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
