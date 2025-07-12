// src/app/shop/product.jsx
'use client';

import { useState } from 'react';

export default function Product({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[1.02]">
      <div className="w-full aspect-square overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          aria-label={`Image of ${product.title}`}
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{product.title}</h3>
      <div className="mt-2 flex items-center gap-2">
        {product.salePrice ? (
          <>
            <span className="text-lg font-bold text-red-600">{product.salePrice.toFixed(2)}Kč</span>
            <span className="text-sm text-gray-500 line-through">{product.price.toFixed(2)}Kč</span>
          </>
        ) : (
          <span className="text-lg font-bold text-gray-800">{product.price.toFixed(2)}Kč</span>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <label
          htmlFor={`quantity-${product.id}`}
          className="text-sm text-gray-600"
          aria-label={`Select quantity for ${product.title}`}
        >
          Množství:
        </label>
        <input
          id={`quantity-${product.id}`}
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 p-1 border rounded-md text-center"
          aria-describedby={`quantity-${product.id}-desc`}
        />
        <span id={`quantity-${product.id}-desc`} className="sr-only">
          Zadejte množství {product.title} k přídání do košíku
        </span>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        aria-label={`Add ${product.title} to cart`}
      >
        Přidat do košíku
      </button>
    </div>
  );
}