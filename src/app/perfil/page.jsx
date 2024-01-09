

"use client";
import React, { useState } from "react";
import PerfilUsuario from "@/Components/PerfilUsuario/PerfilUsuario";
import HistorialCompras from "@/Components/HistorialCompras/HistorialCompras";
import MisReseñas from "@/Components/MisReseñas/MisReseñas";
import { useGetUserByIdQuery } from "@/redux/services/usersApi";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from 'react-router-dom';
import Link from "next/link";
import InfoPerfil from "@/Components/InfoPerfil/InfoPerfil";

export default function perfil() {

  //const userData = useAppSelector((state) => state.loginReducer.user);
  // console.log("userData", userData);

  //const id = userData?._id
  // console.log("este es el id " + id);


  const [componenteActual, setComponenteActual] = useState('info');

  const handleClickEnlace = (componente) => {
    setComponenteActual(componente)
  }

  const renderComponenteActual = () => {
    switch (componenteActual) {
      case 'informacionPersonal':
        return <PerfilUsuario />;
      case 'historialCompras':
        return <HistorialCompras />;
      case 'misReseñas':
        return <MisReseñas />;
      case 'info':
        return <InfoPerfil />;
      default:
        return null;
    }
  };


  return (
    <div className="mt-24 text-center">
      {/* <h1 className='text-3xl font-semibold mb-4'>Cuenta</h1>
      <Link href="/" className="text-teal-500 hover:underline">
        Inicio
      </Link>
      <span style={{ color: 'hsl(0, 1%, 32%)' }} className='mx-2'>/</span>
      <span style={{ color: 'hsl(0, 1%, 32%)' }} className='font-semibold mb-4'>Cuenta</span>
 */}



      <div className="flex justify-center items-center ">
        <div className=" shadow-xl border-solid border border-gray-300 w-1/4 h-2/3 mt-20 mb-64 p-6 rounded-md">
          <h1 className="mb-10 text-2xl">MI CUENTA</h1>
          <ul>
            <li className="m-2">
              <button
                className="cursor-pointer text-xl bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg"
                onClick={() => handleClickEnlace('informacionPersonal')}
              >
                Informacion Personal
              </button>
            </li>
            <li className="m-2">
              <button
                className="cursor-pointer text-xl bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg"
                onClick={() => handleClickEnlace('historialCompras')}
              >
                Historial de Compras
              </button>
            </li>
            <li className="m-2">
              <button
                className="cursor-pointer text-xl bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg"
                onClick={() => handleClickEnlace('misReseñas')}
              >
                Mis reseñas
              </button>
            </li>
          </ul>
        </div>
        <div className="w-3/4 mx-auto">
          {renderComponenteActual()}
        </div>
      </div>
    </div>
  );
}

