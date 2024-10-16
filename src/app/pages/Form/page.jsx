"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from 'react-google-recaptcha';
import { useState, useEffect } from 'react';

// Validation schema
const schema = yup.object().shape({
  firstname: yup.string().required("Jméno dítěte je povinné"),
  lastname: yup.string().required("Příjmení dítěte je povinné"),
  dob: yup.date().required("Datum narození je povinné"),
  address: yup.string().required("Adresa je povinná"),
  legal_firstname: yup.string().required("Jméno zákonného zástupce je povinné"),
  legal_lastname: yup.string().required("Příjmení zákonného zástupce je povinné"),
  phone: yup.string().required("Telefonní číslo je povinné"),
  email: yup.string().email("Neplatná emailová adresa").required("Email je povinný"),
  confirmation1: yup.boolean().oneOf([true], "Souhlas je povinný"),
  confirmation2: yup.boolean().oneOf([true], "Souhlas je povinný"),
});

export default function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [csrfToken, setCsrfToken] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  // Fetch the CSRF token
  useEffect(() => {
    fetch('/api/csrf-token')
      .then(response => response.json())
      .then(data => setCsrfToken(data.csrfToken));
  }, []);

  const onSubmit = async (data) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        'x-recaptcha-token': recaptchaToken,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Registrace proběhla úspěšně!');
    } else {
      alert(result.message || 'Registrace selhala.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl my-3 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          PŘIHLÁŠKA - HNĚVKOV 2024 (6.7.-19.7.2024)
        </h1>
        <p className="text-center text-gray-600 mb-4">ZÁVAZNÝ REGISTRAČNÍ FORMULÁŘ (všechny údaje jsou povinné)</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name and Surname */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Jméno dítěte</label>
              <input {...register("firstname")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Jméno dítěte" />
              <p className="text-red-500 text-sm">{errors.firstname?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Příjmení dítěte</label>
              <input {...register("lastname")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Příjmení dítěte" />
              <p className="text-red-500 text-sm">{errors.lastname?.message}</p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Datum narození</label>
            <input {...register("dob")} type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            <p className="text-red-500 text-sm">{errors.dob?.message}</p>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Adresa</label>
            <input {...register("address")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Adresa" />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>

          {/* Legal Guardian Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Jméno zákonného zástupce</label>
              <input {...register("legal_firstname")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Křestní jméno" />
              <p className="text-red-500 text-sm">{errors.legal_firstname?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Příjmení zákonného zástupce</label>
              <input {...register("legal_lastname")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Příjmení" />
              <p className="text-red-500 text-sm">{errors.legal_lastname?.message}</p>
            </div>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefonní číslo</label>
              <input {...register("phone")} type="tel" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Telefonní číslo" />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input {...register("email")} type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
          </div>

          {/* Confirmations */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Potvrzení zákonného zástupce</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-start">
                <input {...register("confirmation1")} type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-700">
                  Vyjadřuji souhlas s účastí mého dítěte na letní dětské rekreaci v Hněvkově v termínu 6.7.-19.7.2024. Částku 5900,-Kč uhradím nejpozději do 15.6.2023.
                </span>
              </div>
              <p className="text-red-500 text-sm">{errors.confirmation1?.message}</p>

              <div className="flex items-start">
                <input {...register("confirmation2")} type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-700">
                  Zároveň beru na vědomí všechny podmínky týkající se hygienických opatření (při nedodržení podmínek nebude dítě na tábor přijato).
                </span>
              </div>
              <p className="text-red-500 text-sm">{errors.confirmation2?.message}</p>
            </div>
          </div>

          {/* Google reCAPTCHA */}
          <ReCAPTCHA
            sitekey="your-public-site-key"
            onChange={token => setRecaptchaToken(token)}
            className="mb-4"
          />

          {/* Submit Button */}
          <div className="flex justify-center">
          <button type="submit" className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Odeslat
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
