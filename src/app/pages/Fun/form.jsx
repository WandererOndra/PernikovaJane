"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';

// Validation schema
const schema = yup.object().shape({
  firstname: yup.string().required("Jméno dítěte je povinné"),
  lastname: yup.string().required("Příjmení dítěte je povinné"),
  dob: yup.date().required("Datum narození je povinné").max(new Date(), "Datum narození musí být v minulosti"),
  legal_firstname: yup.string().required("Jméno zákonného zástupce je povinné"),
  legal_lastname: yup.string().required("Příjmení zákonného zástupce je povinné"),
  phone: yup.string().required("Telefonní číslo je povinné").matches(/^[+\d]?(?:[\d-.\s()]*)$/, "Neplatný formát telefonního čísla"),
  email: yup.string().email("Neplatný formát e-mailu").required("E-mail je povinný"),
  confirmation1: yup.boolean().oneOf([true], "Souhlas je povinný"),
  confirmation2: yup.boolean().oneOf([true], "Souhlas je povinný"),
  confirmation3: yup.string().required("Pole je povinné"),
  formType: yup.string().required('Form type is required'),
});

export default function FunForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-4xl my-3 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          PŘIHLÁŠKA - STOPOVAČKA (19.10.2024)
        </h1>
        <p className="text-center text-gray-600 mb-4">PŘIHLÁŠKA NA AKCI POŘÁDANOU KOTVOU (všechny údaje jsou povinné)</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
  <input type="hidden" {...register("formType")} value="form2" />

  {/* Name and Surname */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Jméno dítěte</label>
      <input {...register("firstname")} id="firstname" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Jméno dítěte" />
      <p className="text-red-500 text-sm">{errors.firstname?.message}</p>
    </div>

    <div>
      <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Příjmení dítěte</label>
      <input {...register("lastname")} id="lastname" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Příjmení dítěte" />
      <p className="text-red-500 text-sm">{errors.lastname?.message}</p>
    </div>
  </div>

  {/* Date of Birth */}
  <div className="mb-4">
    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Datum narození</label>
    <input {...register("dob")} id="dob" type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
    <p className="text-red-500 text-sm">{errors.dob?.message}</p>
  </div>

  {/* Legal Guardian Name */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label htmlFor="legal_firstname" className="block text-sm font-medium text-gray-700">Jméno zákonného zástupce</label>
      <input {...register("legal_firstname")} id="legal_firstname" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Křestní jméno" />
      <p className="text-red-500 text-sm">{errors.legal_firstname?.message}</p>
    </div>

    <div>
      <label htmlFor="legal_lastname" className="block text-sm font-medium text-gray-700">Příjmení zákonného zástupce</label>
      <input {...register("legal_lastname")} id="legal_lastname" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Příjmení" />
      <p className="text-red-500 text-sm">{errors.legal_lastname?.message}</p>
    </div>
  </div>

  {/* Phone and Email */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefonní číslo</label>
      <input {...register("phone")} id="phone" type="tel" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Telefonní číslo" />
      <p className="text-red-500 text-sm">{errors.phone?.message}</p>
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input {...register("email")} id="email" type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>
    </div>
  </div>

  {/* Confirmations */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Potvrzení zákonného zástupce</label>
    <div className="mt-2 space-y-2">
      <div className="flex items-start">
        <input {...register("confirmation1")} type="checkbox" id="confirmation1" className="form-checkbox h-5 w-5 text-indigo-600" />
        <span className="ml-2 text-sm text-gray-700">Vyjadřuji souhlas s účastí mého dítěte na této akci a s GDPR.</span>
      </div>
      <p className="text-red-500 text-sm">{errors.confirmation1?.message}</p>

      <div className="flex items-start">
        <input {...register("confirmation2")} type="checkbox" id="confirmation2" className="form-checkbox h-5 w-5 text-indigo-600" />
        <span className="ml-2 text-sm text-gray-700">Pokud má Vaše dítě jakoukoliv alergii či zdravotní komplikaci, jste povinni tuto skutečnost nahlásit pořadateli akce.</span>
      </div>
      <p className="text-red-500 text-sm">{errors.confirmation2?.message}</p>

      <div className="flex items-start">
        <input {...register("confirmation3")} type="radio" value="dop" id="confirmation3_dop" className="form-checkbox h-5 w-5 text-indigo-600" />
        <span className="ml-2 text-sm text-gray-700">Dítě bude odcházet s doprovodem.</span>
        <input {...register("confirmation3")} type="radio" value="sam" id="confirmation3_sam" className="form-checkbox h-5 w-5 lg:ml-2 text-indigo-600" />
        <span className="ml-2 text-sm text-gray-700">Dítě bude odcházet samo.</span>
      </div>
      <p className="text-red-500 text-sm">{errors.confirmation3?.message}</p>
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex justify-center">
    <button type="submit" className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Odeslat</button>
  </div>
</form>

      </div>
    </div>
  );
}
