'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // pokud máš lucide-react, jinak nahradit

export default function Product({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

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
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative w-full aspect-square overflow-hidden rounded-md group">
        <img
          src={product.images[currentImage]}
          alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* šipky jen při hoveru */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
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
  );
}
