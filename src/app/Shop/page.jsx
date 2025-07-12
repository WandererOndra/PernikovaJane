// src/app/shop/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Product from './product';
import { products } from './products';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Shop() {
  const [sortBy, setSortBy] = useState('newest');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        console.log('Načtený košík z localStorage:', JSON.parse(savedCart));
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Chyba při načítání košíku:', error);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Košík aktualizován:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.salePrice || a.price) - (b.salePrice || b.price);
    if (sortBy === 'price-desc') return (b.salePrice || b.price) - (a.salePrice || a.price);
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    return 0;
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
    toast.success(`${product.title} (x${product.quantity}) přidáno do košíku!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Naše produkty</h1>
        <Link
          href="/Cart"
          className="text-blue-600 hover:underline"
          aria-label="Zobrazit košík"
        >
          Košík ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      </div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <label htmlFor="sort" className="text-sm font-medium text-gray-600">
          Seřaď:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md bg-white"
          aria-label="Seřadit produkty"
        >
          <option value="newest">Nejnovější</option>
          <option value="oldest">Nejstarší</option>
          <option value="price-asc">Cena: Vzestupně</option>
          <option value="price-desc">Cena: Sestupně</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}