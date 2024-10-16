"use client";
import { useState } from "react";
import FunForm from "./form";

export default function Fun() {
  const [showForm, setShowForm] = useState(false);

  // Toggle form visibility
  const toggleForm = () => setShowForm(!showForm);

  return (
    <main>
      {/* Poster */}
      <div className="flex flex-col items-center py-5 gap-5 lg:pt-10 lg:px-32">
        <div 
          className="relative w-72 h-96 bg-cover bg-center cursor-pointer transition-transform duration-500 hover:scale-110 rounded-lg"
          style={{ backgroundImage: "url('/stopovacka.png')" }}
          onClick={toggleForm}
        >
          <div className="absolute inset-0 bg-blue-600 bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100 rounded-lg">
            <span className="text-white text-2xl font-bold">Přihlásit se</span>
          </div>
        </div>
      </div>

      {/* Conditionally render the form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto relative">
            <button 
              className="absolute top-2 right-2 text-xl font-bold text-gray-600"
              onClick={toggleForm}
            >
              &times;
            </button>
            <FunForm />
          </div>
        </div>
      )}
    </main>
  );
}
