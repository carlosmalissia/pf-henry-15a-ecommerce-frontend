"use client";
import React, { useEffect, useState } from "react";
import PerfilUsuario from "@/Components/PerfilUsuario/PerfilUsuario";
import HistorialCompras from "@/Components/HistorialCompras/HistorialCompras";
import MisReseñas from "@/Components/MisReseñas/MisReseñas";
import MisFavoritos from "@/Components/MisFavoritos/MisFavoritos"
import { useGetUserByIdQuery } from "@/redux/services/usersApi";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";
import Link from "next/link";
import InfoPerfil from "@/Components/InfoPerfil/InfoPerfil";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function perfil() {
  const userData = useAppSelector((state) => state.loginReducer.user);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        if (!userData) {
          await router.push("/Register");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkUserSession();
  }, [userData, router]);
  

  const [componenteActual, setComponenteActual] = useState("info");

  const handleClickEnlace = (componente) => {
    setComponenteActual(componente);
  };

  const renderComponenteActual = () => {
    switch (componenteActual) {
      case "informacionPersonal":
        return <PerfilUsuario />;
      case "historialCompras":
        return <HistorialCompras />;
      case "misReseñas":
        return <MisReseñas />;
        case 'favoritos':
        return <MisFavoritos />;
      case "info":
        return <InfoPerfil />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-24 text-center">
      <div className="flex ">
        <div className=" shadow-xl border-solid border border-gray-300 w-1/4 h-2/3 mt-20 ml-12 mb-64 p-6 rounded-md">
          <h1 className="mb-10 text-2xl">MI CUENTA</h1>
          <ul>
            <li className="m-2">
              <button
                className={`cursor-pointer text-xl hover:bg-teal-600 hover:text-white text-black font-serif py-2 px-4 rounded-lg  w-64 shadow-xl ${(componenteActual === "informacionPersonal") ? "bg-teal-600 text-white" : "bg-gray-100"}`}
                onClick={() => handleClickEnlace("informacionPersonal")}
              >
                Informacion Personal
              </button>
            </li>
            <li className="m-2">
              <button
                className={`cursor-pointer text-xl hover:bg-teal-600 hover:text-white text-black font-serif py-2 px-4 rounded-lg  w-64 shadow-xl ${(componenteActual === "historialCompras") ? "bg-teal-600 text-white" : "bg-gray-100"}`}
                onClick={() => handleClickEnlace("historialCompras")}
              >
                Historial de Compras
              </button>
            </li>
            <li className="m-2">
              <button
                className={`cursor-pointer text-xl hover:bg-teal-600 hover:text-white text-black font-serif py-2 px-4 rounded-lg  w-64 shadow-xl ${(componenteActual === "misReseñas") ? "bg-teal-600 text-white" : "bg-gray-100"}`}
                onClick={() => handleClickEnlace("misReseñas")}
              >
                Mis reseñas
              </button>
            </li>
            <li className="m-2">
              <button
                className={`cursor-pointer text-xl hover:bg-teal-600 hover:text-white text-black font-serif py-2 px-4 rounded-lg  w-64 shadow-xl ${(componenteActual === "favoritos") ? "bg-teal-600 text-white" : "bg-gray-100"}`}
                onClick={() => handleClickEnlace('favoritos')}
              >
                Favoritos
              </button>
            </li>
          </ul>
        </div>
        <div className="w-3/4 m-10 ">{renderComponenteActual()}</div>
        {/* <ToastContainer
                theme="colored"
                position="bottom-left"
                autoClose={2000}
              /> */}
      </div>
    </div>
  );
}
