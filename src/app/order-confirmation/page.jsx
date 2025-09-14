// app/order-confirmation/page.jsx

import Link from 'next/link';

export default function OrderConfirmation() {
  return (
    <div className="bg-amber-100 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Objednávka byla úspěšně odeslána!</h1>
        <p className="text-gray-700 mb-6">
          Děkujeme za vaši objednávku. Brzy vás budeme kontaktovat s potvrzením.
        </p>
        <Link
          href="/Shop"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zpět do obchodu
        </Link>
      </div>
    </div>
  );
}
