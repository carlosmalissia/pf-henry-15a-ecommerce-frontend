import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useLogoutUserMutation } from '@/redux/services/usersApi';
import { logoutUser } from '@/redux/features/userSlice';
import { useDispatch } from 'react-redux';
import styles from "../Navbar/navbar.module.css";

const HoverLogin = () => {
  const dispatch = useDispatch();
  const [logoutUserMutation] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUserMutation();
      dispatch(logoutUser());
      window.location.reload();
      console.log('Cierre de sesión exitoso');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className='bg-white shadow-md rounded p-8 mb-4 w-full max-w-md mx-auto'>
      <div className='flex flex-col items-start'> {/* Cambiado a 'items-start' para alinear a la izquierda */}
        <Link href='/perfil' passHref className={styles.nav__link}>
          
            Mi Perfil
         
        </Link>
        <button
          onClick={handleLogout}
          className='bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 text-sm mt-6 transition-all duration-300 ease-in-out'
        >
          <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
          Cerrar sesion
        </button>
      </div>
    </div>
  );
};

export default HoverLogin;