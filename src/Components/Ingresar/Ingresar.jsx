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

  const {data, status} = useSession();
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
      className='text-gray-600 font-medium'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {status === 'unauthenticated' ?
        <span className=''>{userIcon} Ingresar</span> :

        <span className='flex'><img src={data?.user.image} width={25} height={25} className='rounded-full w-5 h-5'/><p>Hola {data?.user.name}</p></span>

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
        <div className='fixed flex justify-center items-center right-2' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Ingresar;
