
import React from 'react';
import Link from 'next/link';

const WelcomeMessageLogin = ({message}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-xl w-96 flex flex-col text-center">
        <h2 className="text-2xl font-semibold mb-4">{message} </h2>
        <p  className="text-gray-600 mb-6">Descubre las últimas tendencias en moda y joyería para mantenerte a la vanguardia del estilo.</p>
        <Link href="/" className="transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 w-full bg-teal-500 text-white rounded px-4 py-2 hover:bg-red-600 focus:outline-none">
          Vamos
        </Link>
      </div>
    </div>
  );
};

const WelcomeMessage = ({message}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-xl w-96 flex flex-col text-center">
        <h2 className="text-2xl font-semibold mb-4">{message}</h2>
        <p className="text-gray-600 mb-6">Estamos emocionados de que te hayas unido. Descubre las últimas tendencias y encuentra piezas únicas que reflejen tu personalidad</p>
        <Link href="/" className="transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 w-full bg-teal-500 text-white rounded px-4 py-2 hover:bg-red-600 focus:outline-none">
          Vamos
        </Link>
      </div>
    </div>
  );
};


export { WelcomeMessageLogin, WelcomeMessage };