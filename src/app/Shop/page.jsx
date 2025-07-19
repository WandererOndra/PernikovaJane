// src/app/shop/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Product from './product';
import { products } from './products';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Shop() {
  const [sortBy, setSortBy] = useState('all'); // Default to 'all' to show all products initially
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

  const sortedProducts = [...products].filter((product) => {
    if (sortBy === 'all') return true; // Show all products when 'all' is selected
    if (sortBy === 'girls') return product.category === 'girls';
    if (sortBy === 'boys') return product.category === 'boys';
    if (sortBy === 'easter') return product.category === 'easter';
    if (sortBy === 'christmas') return product.category === 'christmas';
    if (sortBy === 'halloween') return product.category === 'halloween';
    if (sortBy === 'mikulas') return product.category === 'mikulas';
    if (sortBy === 'prague') return product.category === 'prague';
    if (sortBy === 'other') return product.category === 'other';
    return true; // Fallback (should not occur)
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
    <div className="bg-amber-100">
      <div className="container mx-auto px-4 py-8">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Vítejte v mém perníkovém obchůdku
          </h1>
          <Link
            href="/Cart"
            className="inline-block bg-yellow-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors duration-300"
            aria-label={`Zobrazit košík s ${cart.reduce((sum, item) => sum + item.quantity, 0)} položkami`}
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
            <option value="all">Vše</option>
            <option value="girls">Pro holky</option>
            <option value="boys">Pro kluky</option>
            <option value="easter">Velikonoce</option>
            <option value="christmas">Vánoce</option>
            <option value="halloween">Halloween</option>
            <option value="mikulas">Mikuláš</option>
            <option value="prague">Pražské památky</option>
            <option value="other">Ostatní</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Product key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}