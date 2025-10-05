'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Product({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Klávesnice: ← → Escape
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImage((prev) =>
          prev === 0 ? product.images.length - 1 : prev - 1
        );
      }
      if (e.key === 'ArrowRight') {
        setCurrentImage((prev) => (prev + 1) % product.images.length);
      }
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, product.images.length]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(Math.max(1, isNaN(value) ? 1 : value));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setQuantity(1);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[1.02]">
        <div
          className="relative w-full aspect-square overflow-hidden rounded-md group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {isClient && (
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          )}

          {isClient && product.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-bold text-red-600">
                {product.salePrice.toFixed(2)} Kč
              </span>
              <span className="text-sm text-gray-500 line-through">
                {product.price.toFixed(2)} Kč
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-800">
              {product.price.toFixed(2)} Kč
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <label
            htmlFor={`quantity-${product.id}`}
            className="text-sm text-gray-600"
          >
            Množství:
          </label>
          <input
            id={`quantity-${product.id}`}
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 p-1 border rounded-md text-center"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-yellow-700 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Přidat do košíku
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && isClient && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative">
              <img
                src={product.images[currentImage]}
                alt={product.title}
                className="w-full aspect-square object-cover rounded-md"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 text-gray-800">
              <h4 className="text-lg font-semibold mb-2">Složení</h4>
              <p className="text-sm">
                {product.ingredients || 'Složení zatím není k dispozici.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
