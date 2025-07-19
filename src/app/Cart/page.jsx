// src/app/cart/page.jsx
'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  // Load cart from localStorage on mount with debugging
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    console.log('Košík z localStorage:', savedCart);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Parsovaný košík:', parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Chyba při parsování košíku:', error);
        setCart([]);
      }
    } else {
      console.log('Košík nenalezen v localStorage');
    }
  }, []);

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    toast.success('Množství aktualizováno');
  };

  // Delete item
  const deleteItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success('Položka odebrána z košíku');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      toast.error('Vyplňte prosím všechna pole');
      return;
    }
    if (cart.length === 0) {
      toast.error('Váš košík je prázdný');
      return;
    }

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, cart }),
      });

      if (response.ok) {
        toast.success('Objednávka úspěšně odeslána!');
        setCart([]);
        localStorage.removeItem('cart');
        setFormData({ name: '', email: '', address: '', phone: '' });
      } else {
        toast.error('Nepodařilo se odeslat objednávku');
      }
    } catch (error) {
      toast.error('Chyba při odesílání objednávky');
    }
  };

  // Calculate total
  const total = cart
    .reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8 lg:px-32">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Košík</h1>
      <Link href="/Shop" className="text-blue-600 hover:underline mb-4 inline-block" aria-label="Zpátky do e-shopu">
        Zpátky do e-shopu
      </Link>

      {cart.length === 0 ? (
        <p className="text-gray-600">Váš košík je prázdný.</p>
      ) : (
        <>
          {/* Položky košíku */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-lg bg-white"
                aria-labelledby={`item-${item.id}-title`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md"
                  aria-label={`Obrázek položky ${item.title}`}
                />
                <div className="flex-1">
                  <h3 id={`item-${item.id}-title`} className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {(item.salePrice || item.price).toFixed(2)}Kč x {item.quantity} = {((item.salePrice || item.price) * item.quantity).toFixed(2)}Kč
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 p-1 border rounded-md text-center"
                    aria-label={`Upravit množství pro ${item.title}`}
                    aria-describedby={`quantity-${item.id}-desc`}
                  />
                  <span id={`quantity-${item.id}-desc`} className="sr-only">
                    Zadejte počet položek {item.title}
                  </span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Odebrat ${item.title} z košíku`}
                  >
                    Smazat
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Celkem */}
          <div className="mt-6 text-xl font-bold text-gray-800">
            Celkem: {total}Kč
          </div>

          {/* Formulář objednávky */}
            <form onSubmit={handleSubmit} className="mt-8 flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Detaily objednávky</h2>
                <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Jméno
                    </label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    aria-required="true"
                    aria-describedby="name-desc"
                    />
                    <span id="name-desc" className="sr-only">
                    Zadejte své celé jméno
                    </span>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    aria-required="true"
                    aria-describedby="email-desc"
                    />
                    <span id="email-desc" className="sr-only">
                    Zadejte svůj email
                    </span>
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                    Adresa
                    </label>
                    <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md h-20"
                    required
                    aria-required="true"
                    aria-describedby="address-desc"
                    />
                    <span id="address-desc" className="sr-only">
                    Zadejte svou dodací adresu
                    </span>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                    Telefon
                    </label>
                    <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    aria-required="true"
                    aria-describedby="phone-desc"
                    />
                    <span id="phone-desc" className="sr-only">
                    Zadejte své telefonní číslo
                    </span>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    aria-label="Odeslat objednávku"
                >
                    Odeslat objednávku
                </button>
                </div>
            </div>
            </form>
        </>
      )}
    </div>
  );
}