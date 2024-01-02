

"use client";
import React, { useState } from "react";
import PerfilUsuario from "@/Components/PerfilUsuario/PerfilUsuario";
import HistorialCompras from "@/Components/HistorialCompras/HistorialCompras";
import MisReseñas from "@/Components/MisReseñas/MisReseñas";
import { useGetUserByIdQuery } from "@/redux/services/usersApi";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from 'react-router-dom';

export default function perfil() {

    //const userData = useAppSelector((state) => state.loginReducer.user);
    // console.log("userData", userData);

     //const id = userData?._id
    // console.log("este es el id " + id);


const [componenteActual, setComponenteActual] = useState(null);

const handleClickEnlace = (componente)=>{
  setComponenteActual(componente)
}

const renderComponenteActual = () => {
  switch (componenteActual) {
    case 'informacionPersonal':
      return <PerfilUsuario  />;
    case 'historialCompras':
      return <HistorialCompras />;
    case 'misReseñas':
      return <MisReseñas />;
    default:
      return null;
  }
};


  return (
    <div className="flex">
      <div className="border-solid border border-gray-300 w-1/4 mt-20">
        <h1 className="m-10 text-2xl">MI CUENTA</h1>
        <ul>
        <li className="m-10 cursor-pointer my-2 text-xl" onClick={()=>handleClickEnlace('informacionPersonal')}>
            Informacion Personal
        </li>
        <li className="m-10 cursor-pointer my-2 text-xl" onClick={()=> handleClickEnlace('historialCompras')}>
            Historial de Compras
        </li>
        <li className="m-10 cursor-pointer my-2 text-xl" onClick={()=>handleClickEnlace('misReseñas')}>
            Mis reseñas 
        </li>
        </ul>
      </div>
      <div className="w-3/4">
        <h1 className="mt-20 text-center text-3xl">MIS DATOS</h1>
        {renderComponenteActual()}
      </div>
    </div>
  );
}

