"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLoginUserMutation } from '@/redux/services/usersApi';
import { validateLoginForm } from '../../app/Register/formValidation';
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import {loginUser} from "@/redux/features/userSlice"


import { signIn, signOut, useSession } from "next-auth/react";


const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const lockIcon = <FontAwesomeIcon icon={faLock} />;

const LoginForm = () => {
  const dispatch = useDispatch()
  const [formErrors, setFormErrors] = useState({});
  const [login] = useLoginUserMutation();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [loginFormData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const {data, status} = useSession();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = validateLoginForm(loginFormData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const loginResponse = await login(loginFormData);
        if (loginResponse?.data?.token) {
         
          setLoginSuccess(true);
          dispatch(loginUser(loginResponse.data))
          

        } else {
          console.error('Error en el inicio de sesión:', loginResponse?.data?.error);
        }

        setLoginFormData({
          loginEmail: '',
          loginPassword: '',
        });
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    } else {
      console.log('Formulario de inicio de sesión inválido');
    }
  };

  return (
    <div>
      {status === 'authenticated' ? (
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-auto max-w-md mx-auto'>
        <button
          type='button'
          onClick={()=> signOut()}
          className='w-64 bg-teal-500 hover:bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2'
        >
          {userIcon} Cerrar sesion
        </button>
        </div>
      ) : (
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-auto max-w-md mx-auto' onSubmit={handleLoginSubmit}>
        <div className='flex flex-col'>
          <Link href='/Register' className='ml-32 text-red-500  font-light'>
            Crea tu cuenta
          </Link>
          <h2 className='mb-4 text-lg'>Ingresa</h2>
          <label htmlFor='loginEmail' className='mr-3 font-semibold font-[Poppins] pt-4'>
            {envelopeIcon} Correo electrónico
          </label>
          <input
            type='email'
            id='loginEmail'
            name='loginEmail'
            placeholder='Email'
            value={loginFormData.loginEmail}
            onChange={handleChange}
            className={`mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
          />
          {formErrors.loginEmail && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.loginEmail}</p>
          )}
        </div>
  
        <div className='flex flex-col'>
          <label htmlFor='loginPassword' className='mt-8 p-1 mr-3 font-semibold font-[Poppins]'>
            {lockIcon} Contraseña
          </label>
          <input
            type='password'
            id='loginPassword'
            name='loginPassword'
            placeholder='Contraseña'
            value={loginFormData.loginPassword}
            onChange={handleChange}
            className={`mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500 `}
          />
          {formErrors.loginPassword && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.loginPassword}</p>
          )}
        </div>
  
        <button
          type='button'
          onClick={()=> signIn('google')}
          className='flex items-center justify-center w-full h-8 bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2'
        >
          <FaGoogle className="mr-2" />
          Accede con Google
        </button>
        <button
          type='submit'
          className='w-64 bg-teal-500 hover:bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2'
        >
          {userIcon} Iniciar sesion
        </button>
        {loginSuccess && (
          <p className='text-green-500 text-sm mt-2'>Inicio de sesión exitoso. ¡Bienvenido!</p>
        )}
  
      </form>
      )}
    </div>
  );
};

export default LoginForm;