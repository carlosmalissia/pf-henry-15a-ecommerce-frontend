import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
    const userIcon = <FontAwesomeIcon icon={faUser} />;
    const lockIcon = <FontAwesomeIcon icon={faLock} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        // aquí manejar la lógica de inicio de sesión.
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            <button
                className='text-gray-600 font-medium'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
              {userIcon}  Ingresar
            </button>

            {isHovered && (
                <div className='fixed flex justify-center items-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-96" onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <button className='ml-32 text-red-500'>
                                Crear cuenta
                            </button>
                            <h2 className='mb-4 text-lg'>Ingresa</h2>
                            <label htmlFor='email' className='mr-3 font-semibold font-[Poppins] pt-4'>
                                {envelopeIcon} Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='password' className='mt-8 p-1 mr-3 font-semibold font-[Poppins]'>
                                {lockIcon} Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500'
                            />
                        </div>
                        <button
                            type="button"
                            className='w-48 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:border-red-300 duration-200 mt-4'
                        >
                            Accede con Google
                        </button>
                        <button className='w-64 bg-teal-500 hover:bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2'>
                            Ingresar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;