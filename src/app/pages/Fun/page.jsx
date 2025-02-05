"use client";
import { useState } from "react";

export default function Fun() {
  const openFormUrl = () => {
    window.open("https://kotva.wufoo.com/forms/zwaq9x71kve9rt/", "_blank");
  };

  // Array of images for the carousel, with the latest event as the first image
  const images = [
    "/museum.jpg", // Current event
    "/kviz.PNG", 
    "/vanoce.png",  
    "/stopovacka.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const swipeDistance = touchStart - touchEnd;

    // Only trigger if swipe is significant
    if (swipeDistance > 50) {
      nextImage();
    } else if (swipeDistance < -50) {
      prevImage();
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <main>
      {/* Carousel */}
      <div className="flex flex-col items-center py-5 gap-5 lg:pt-10 lg:px-32">
        <div
          className="relative w-72 h-96 bg-cover bg-center cursor-pointer rounded-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            style={{ backgroundImage: `url('${images[currentIndex]}')` }}
            className="relative w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-110 rounded-lg"
            onClick={currentIndex === 0 ? openFormUrl : undefined} // Only clickable for current event
          >
            {/* Conditionally render sign-up overlay for the current event */}
            {currentIndex === 0 && (
              <div className="absolute inset-0 bg-blue-600 bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100 rounded-lg">
                <span className="text-white text-2xl font-bold">Přihlásit se</span>
              </div>
            )}
          </div>

          {/* Navigation Arrows for desktop */}
          <button
            onClick={prevImage}
            className="hidden sm:block absolute top-1/2 -left-10 transform -translate-y-1/2 text-blue-600 bg-white rounded-full p-2 opacity-75 hover:opacity-100"
          >
            &lt;
          </button>
          <button
            onClick={nextImage}
            className="hidden sm:block absolute top-1/2 -right-10 transform -translate-y-1/2 text-blue-600 bg-white rounded-full p-2 opacity-75 hover:opacity-100"
          >
            &gt;
          </button>
        </div>
      </div>
    </main>
  );
}
