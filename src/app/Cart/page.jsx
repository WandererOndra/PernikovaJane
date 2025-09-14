//Cart

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    console.log('CartPage: načítám cart z localStorage:', savedCart);

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('CartPage: parsovaný cart:', parsedCart);
        setCart(parsedCart);
      } catch (err) {
        console.error('CartPage: chyba při parsování cartu:', err);
        setCart([]);
      }
    } else {
      console.log('CartPage: žádný cart nenalezen v localStorage');
    }
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) {
      console.log('CartPage: ukládám cart do localStorage:', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  const removeFromCart = (id) => {
    console.log('CartPage: odstraňuji produkt s id:', id);
    const newCart = cart.filter((item) => item.id !== id);
    console.log('CartPage: nový cart po odstranění:', newCart);
    setCart(newCart);
  };

  const getTotalPrice = () => {
    console.log('CartPage: počítám celkovou cenu');
    const total = cart.reduce((sum, item) => {
      const price = item.salePrice || item.price;
      return sum + price * item.quantity;
    }, 0);
    console.log('CartPage: celková cena:', total);
    return total;
  };

  if (cart.length === 0) {
    return (
      <div className="bg-amber-100 min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Váš košík je prázdný</h1>
        <Link
          href="/Shop"
          className="mt-4 inline-block bg-yellow-700 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Zpět do obchodu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-amber-100 min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Košík</h1>

        <ul className="space-y-6">
          {cart.map((item) => (
            <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    Cena: {(item.salePrice || item.price).toFixed(2)} Kč
                  </p>
                  <p className="text-sm text-gray-500">Množství: {item.quantity}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    Celkem: {((item.salePrice || item.price) * item.quantity).toFixed(2)} Kč
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-4 sm:mt-0 sm:ml-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Odstranit
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-right">
          <h2 className="text-2xl font-bold text-gray-800">
            Celková cena: {getTotalPrice().toFixed(2)} Kč
          </h2>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Link
            href="/Shop"
            className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Zpět k nákupu
          </Link>

          <Link
            href="/Checkout"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Pokračovat
          </Link>
        </div>
      </div>
    </div>
  );
}
