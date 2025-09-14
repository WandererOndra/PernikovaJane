// checkout.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  delivery: "pickup",
  street: "",
  city: "",
  zip: "",
});
  const router = useRouter();

  // regex
  const nameRegex = /^[a-zA-ZÀ-ž\s'-]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{9,15}$/;

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getCartTotal = () =>
    cart.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);

  const getDeliveryPrice = () => (form.delivery === 'delivery' ? 90 : 0);
  const getFinalTotal = () => getCartTotal() + getDeliveryPrice();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validace
    if (!nameRegex.test(form.name)) {
      alert("Prosím, zadejte platné jméno.");
      return;
    }
    if (!emailRegex.test(form.email)) {
      alert("Prosím, zadejte platný e-mail.");
      return;
    }
    if (!phoneRegex.test(form.phone)) {
      alert("Prosím, zadejte platné telefonní číslo.");
      return;
    }
    if (form.delivery === "delivery" && form.address.trim().length < 5) {
      alert("Při doručení na adresu musíte vyplnit platnou adresu.");
      return;
    }

    const orderData = {
      ...form,
      cart,
      total: getFinalTotal(),
    };

    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        localStorage.removeItem('cart');
        router.push('/order-confirmation');
      } else {
        alert('Nepodařilo se odeslat objednávku. Zkuste to znovu.');
      }
    } catch (err) {
      console.error(err);
      alert('Chyba při odesílání objednávky.');
    }
  };

  return (
    <div className="bg-amber-100 min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Pokladna</h1>

        {cart.length === 0 ? (
          <p>Košík je prázdný.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* recap */}
            <ul className="divide-y divide-gray-200 mb-6">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex justify-between">
                  <span>{item.title} × {item.quantity}</span>
                  <span>{((item.salePrice || item.price) * item.quantity).toFixed(2)} Kč</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-semibold">
              <span>Doručení:</span>
              <span>{getDeliveryPrice()} Kč</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Celkem:</span>
              <span>{getFinalTotal()} Kč</span>
            </div>

            {/* form inputs */}
            <input type="text" name="name" placeholder="Jméno a příjmení" required
              value={form.name} onChange={handleChange} className="w-full border p-3 rounded-lg" />
            <input type="text" name="address" placeholder="Adresa"
              required={form.delivery === 'delivery'}
              value={form.address} onChange={handleChange} className="w-full border p-3 rounded-lg" />
            <input type="email" name="email" placeholder="E-mail" required
              value={form.email} onChange={handleChange} className="w-full border p-3 rounded-lg" />
            <input type="tel" name="phone" placeholder="Telefon" required
              value={form.phone} onChange={handleChange} className="w-full border p-3 rounded-lg" />

            <div>
              <label className="block mb-2 font-semibold">Způsob doručení:</label>
              <label className="flex items-center gap-2">
                <input type="radio" name="delivery" value="pickup"
                  checked={form.delivery === 'pickup'} onChange={handleChange} />
                Osobní odběr (0 Kč)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="delivery" value="delivery"
                  checked={form.delivery === 'delivery'} onChange={handleChange} />
                Doručení na adresu (90 Kč)
              </label>
            </div>

            <button type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Odeslat objednávku
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
