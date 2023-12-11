"use client";
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { validateRegisterForm, validateLoginForm } from './formValidation';

import { useCreateUserMutation } from '@/redux/services/usersApi'

const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const lockIcon = <FontAwesomeIcon icon={faLock} />;

const Register = () => {

 

  const [newUser] = useCreateUserMutation();// hook para pegarle al endpoint del back

  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showLoginFormView = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const showRegisterFormView = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = showRegisterForm
      ? validateRegisterForm(formData)
      : validateLoginForm(formData);

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Envía los datos al servidor aquí
        const response = await newUser(formData);

         alert('Usuario creado exitosamente'); 
        console.log("Usuario creado:", response);
          window.location.href = '/';  
        // Limpia el formulario 
        setFormData({
          name: "",
          lastname: "",
          email: "",
          password: "",
          loginEmail: "",
          loginPassword: "",
        });

      } catch (error) {
        // Maneja los errores de la creación del usuario aquí
        console.error("Error al crear el usuario:", error);
      }
    } else {
      console.log("Formulario inválido");
    }
  };

  return (

    <div className="min-h-screen ml-48 flex items-center justify-center ">
      <div className="bg-white p-4 rounded shadow-xl w-96 flex flex-col">
        {showRegisterForm ? (
          <>
            <h1 className="text-2xl font-semibold mb-2 text-center mx-auto mt-4 mb-4">Registrarse</h1>
            <form onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Apellido */}
              <div className="mb-4">
                <label htmlFor="lastname" className="block text-gray-700 text-sm font-semibold mb-2">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Apellido"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                />
                {formErrors.lastname && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.lastname}</p>
                )}
              </div>

              {/* Correo Electrónico */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                  {envelopeIcon}  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Contraseña */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                  {lockIcon} Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                )}
              </div>

              {/* Repetir Contraseña */}
              <div className="mb-4">
                <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                  {lockIcon} Repetir contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="loginPassword"
                    name="loginPassword"
                    placeholder="Repetir Contraseña"
                    value={formData.loginPassword}
                    onChange={handleChange}
                    className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {formErrors.loginPassword && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.loginPassword}</p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 w-full bg-teal-500 text-white rounded px-4 py-2 hover:bg-red-600 focus:outline-none"
                >
                  Registrarse
                </button>
              </div>
            </form>
            <div className="mt-2 flex flex-col">
              <h1 className='mt-2'>¿Ya tienes una cuenta?</h1>
              <button
                className=" transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mt-2 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-800 focus:outline-none"
                onClick={showLoginFormView}
              >
                {userIcon} Iniciar sesión
              </button>
            </div>
          </>
        ) : null}

        {showLoginForm ? (
          <>
            <h1 className=" text-2xl font-semibold mb-2">{userIcon} Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
              {/* Correo Electrónico */}
              <div className="mb-4 mt-4" >
                <label htmlFor="loginEmail" className="block text-gray-700 text-sm font-semibold mb-2">
                  {envelopeIcon}  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  placeholder="Email"
                  value={formData.loginEmail}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                />
                {formErrors.loginEmail && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.loginEmail}</p>
                )}
              </div>

              {/* Contraseña */}
              <div className="mb-4">
                <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                  {lockIcon}  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="loginPassword"
                    name="loginPassword"
                    placeholder="Contraseña"
                    value={formData.loginPassword}
                    onChange={handleChange}
                    className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                  />
                  <button
                    type="button"
                    className="transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {formErrors.loginPassword && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.loginPassword}</p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className=" transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 w-full bg-teal-500 text-white rounded px-4 py-2 hover:bg-red-600 focus:outline-none"
                >
                  Ingresar
                </button>
                <button
                  type="button"
                  className=' transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 flex items-center justify-center w-full h-8 bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2'
                >
                  <FaGoogle className="mr-2" />
                  Accede con Google
                </button>
              </div>
            </form>
            <div className="mt-2">
              <button
                className="transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mt-2 bg-teal-800 text-white rounded px-4 py-2 hover:bg-red-800 focus:outline-none"
                onClick={showRegisterFormView}
              >
                Registrate
              </button>
            </div>
          </>
        ) : null}
      </div>
      <div className='min-h-screen mt-12 mb-48 flex items-center justify-center '>
      </div>
      <div className='bg-white p-8 rounded shadow-xl w-96 flex flex-col ml-32 font-serif text-lg font-thin mb-32'><h1 className='text-2xl font-bold mb-4 text-center font-serif '>Registro</h1>Registrarte en este sitio te permite acceder al estado e historial de tu pedido. Simplemente completa los campos a continuación y configuremos una nueva cuenta para ti en un abrir y cerrar de ojos. Solo te pediremos la información necesaria para que el proceso de compra sea más rápido y sencillo.</div>
    </div>
  );
};

export default Register;