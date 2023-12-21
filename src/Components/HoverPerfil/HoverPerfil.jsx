import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useLogoutUserMutation } from '@/redux/services/usersApi'; // Importa el nuevo endpoint

const HoverLogin = () => {
    const [logoutUser] = useLogoutUserMutation(); // Usa el nuevo endpoint de cerrar sesión

    const handleLogout = async () => {
        try {
            // Llama al endpoint de cerrar sesión
            await logoutUser();

            // Realiza cualquier limpieza adicional, como actualizar el estado del usuario en tu aplicación
            // ...

            console.log('Cierre de sesión exitoso');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className='bg-white shadow-md rounded p-8 mb-4 w-full max-w-md mx-auto'>
            <div className='flex flex-col items-center'>
                <Link href='/perfil' passHref className='text-teal-500 mb-4 hover:underline'>
                    Mi Perfil
                </Link>
                <button
                    onClick={handleLogout} // Llama a la función de cerrar sesión al hacer clic
                    className='bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600 text-sm mt-2'
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
                    Salir
                </button>
            </div>
        </div>
    );
};

export default HoverLogin;