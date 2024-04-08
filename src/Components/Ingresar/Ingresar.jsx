// 'use client'
// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

// const userIcon = <FontAwesomeIcon icon={faUser} />;

// const Ingresar = () => {
//   return (
//     <div>

//       {userIcon} Ingresar

//     </div>
//   );
// };

// export default Ingresar;





/* import React, { useState } from "react";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const lockIcon = <FontAwesomeIcon icon={faLock} />;

const Ingresar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión
  };

  return (
    <div>
      <button
        className="text-gray-600 font-medium"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {userIcon} Ingresar
      </button>

      {isHovered && (
        <div
          className="fixed flex items-center "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="bg-white shadow-md rounded pt-8 pb-8 mb-4"
            onSubmit={handleLoginSubmit}
          >
            <div className="flex flex-col">
              <h2 className="mb-2 text-lg"> ¡Bienvenido a Henrucci!</h2>
              <p className="text-sm text-gray-600 break-words">
                Para una experiencia de compra personalizada, te invitamos a
                iniciar sesión en tu cuenta.
              </p>
            </div>
            <button
              type="submit"
              className="w-full max-w-xs bg-teal-500 hover:bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-4"
            >
              Vamos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingresar; */








import React, { useEffect, useState } from 'react';
import LoginForm from '../LoginForm/LoginForm'; // Importar el nuevo componente LoginForm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/features/userSlice';


const userIcon = <FontAwesomeIcon icon={faUser} />;

// Nuevo componente para el botón de ingresar
const IngresarButton = ({ onMouseEnter, onMouseLeave }) => {

  const { data, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("status",status);
    // console.log("DATA",data);
    if (status === 'authenticated') {
      dispatch(loginUser(data));
    }
  }, [status]);


  return (
    <button
      className=' lg:text-gray-600 font-medium text-white lg:text-base text-xl'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {status === 'unauthenticated' ?
        <span className=''>{userIcon} Ingresar</span> :

        <span className='flex'><img src={data?.user.image} width={25} height={25} className='rounded-full w-5 h-5' /><p>Hola {data?.user.name}</p></span>

      }
    </button>
  );
};

const Ingresar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      {/* Renderiza el componente IngresarButton */}
      <IngresarButton onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />

      {/* Muestra el formulario solo cuando se hace hover */}
      {isHovered && (
        <div className='fixed flex justify-center items-center lg:right-2  right-20 lg:top-12 top-[-2px]' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Ingresar;
