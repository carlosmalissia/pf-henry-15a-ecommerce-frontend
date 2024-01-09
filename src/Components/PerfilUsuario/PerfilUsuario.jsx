"use Client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";

const PerfilUsuario = () => {

  const localStorageToken = localStorage.getItem("token");
  const userD = useAppSelector((state) => state.loginReducer.user);

  const id = userD?._id;
  console.log("este es el id " + id);

  const [userData, setUserData] = useState({
    name: userD?.name,
    lastname: userD?.lastname,
    email: userD?.email,
  });

  const [editable, setEditable] = useState(false);

  const handleEdit = () => {
    console.log("se esta editando...")
    setEditable(true);
  };

  const handleSave = async (id) => {
    console.log("este id llega al handleSave " + id)
    try {
      setEditable(false);
      console.log(userData.name, userData.lastname, userData.email)
      if (!userData.name || !userData.lastname || !userData.email) {
        alert('Por favor, completa todos los campos antes de guardar.');
        return;
      }
      const response = await axios.put(`https://pf-15a.up.railway.app/api/users/${id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorageToken}`
        }
      })

      console.log("este es el console.log de " + response.data)

      if (response.status === 200) {
        console.log(response.data.name, response.data.lastname)
        setUserData((prevUserData) => ({
          ...prevUserData,
          name: response.data.name,
          lastname: response.data.lastname,
          email: response.data.email
        }))
        alert('Cambios guardados correctamente.');


      } else {
        alert('Error al guardar los cambios.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data)
      }

    }


  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  return (
    <div className="min-h-screen mr-96 flex items-center justify-center mt-[-64px]">
      <div id="user-form" className="bg-white p-4 rounded shadow-xl w-96 flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center font-serif mx-auto mt-4">
          Mis datos
        </h1>

        <div className="mb-4 flex items-center">
          <label htmlFor="nombre" className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Nombre:
          </label>
          <input
            className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>

        <div className="mb-4 flex items-center">




          <label htmlFor="apellido" className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Apellido:
          </label>
          <input
            className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="lastname"
            value={userData.lastname}
            onChange={handleChange}
            disabled={!editable}
          />

        </div>

        <div className="mb-4 flex items-center">




          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Email:
          </label>
          <input
            className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!editable}
          />

        </div>

        <div className="mb-4 flex items-center">




          <label className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Calle:
          </label>
          <input
            className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="email"
            id="email"

            onChange={handleChange}
            disabled={!editable}
          />

        </div>

        <div className="mb-4 flex items-center">




          <label className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Nº:
          </label>
          <input
            className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="email"
            id="email"

            onChange={handleChange}
            disabled={!editable}
          />

        </div>

        <div className="mb-4 flex items-center">




          <label className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Código Postal:
          </label>
          <input
            className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="email"
            id="email"

            onChange={handleChange}
            disabled={!editable}
          />

        </div>


        <div className="mb-4 flex items-center">




          <label className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Provincia:
          </label>
          <input
            className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="email"
            id="email"

            onChange={handleChange}
            disabled={!editable}
          />

        </div>

        <div className="flex justify-center items-center">
          <button className="mr-6 transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 bg-red-600 text-white rounded px-2 py-1 hover:bg-teal-500 focus:outline-none cursor-pointer w-20" onClick={handleEdit} disabled={editable}>
            Editar
          </button>

          <button className="transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 bg-teal-500 text-white rounded px-2 py-1 hover:bg-red-600 focus:outline-none cursor-pointer w-20" onClick={() => handleSave(userD._id)} disabled={!editable}>
            Guardar
          </button>
        </div>


      </div>

    </div>
  );
};
export default PerfilUsuario;
