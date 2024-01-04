"use Client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";

const PerfilUsuario = () => {
 
 const localStorageToken = localStorage.getItem("token"); 
 const userD = useAppSelector((state) => state.loginReducer.user);
  
  const id =userD?._id;
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
      const response = await axios.put(`https://pf-15a.up.railway.app/api/users/${id}`, userData,{
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
        console.error('Respuesta del servidor:', error.response.data)}
    
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
    <div class="bg-slate-500 place-content-center max-h-screen  ml-20 mr-20" style={{backgroundImage: "url('https://img.freepik.com/foto-gratis/fondo-textura-lisa-gris_53876-98330.jpg?w=740&t=st=1704150343~exp=1704150943~hmac=4250bbee1a5a455a3b48d56689736b331a4609adbe1d294e56205a494e1e38b3')", backgroundSize: 'cover'}}>
      <div id="user-form" class="flex justify-start items-center h-135 m-10 ">
        <ul class="text-center">
          <li className="flex items-center justify-items-center">
            <label htmlFor="nombre" class="text-2xl text-gray-800">
              Nombre:
            </label>
            <input
              class="m-3 h-9 bg-white rounded-lg w-96 text-center text-neutral-900"
              type="text"
              id="name"
              value={userData.name}
              onChange={handleChange}
              disabled={!editable}
            />
          </li>
          <li className="flex items-center justify-items-center">
            <label htmlFor="apellido" class="text-2xl text-gray-800">
              Apellido:
            </label>
            <input
              class="m-3 h-9 bg-white rounded-lg  w-96 text-center text-neutral-900"
              type="text"
              id="lastname"
              value={userData.lastname}
              onChange={handleChange}
              disabled={!editable}
            />
          </li>
          <li className="flex items-center justify-items-center ">
            <label htmlFor="email" class="text-2xl text-gray-800">
              Email:
            </label>
            <input
              class="m-3 h-9 bg-white rounded-lg w-96 text-center text-neutral-900"
              type="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!editable}
            />
          </li>
          <h2>
            Dirección
          </h2>
          <li className="flex items-center justify-items-center ">
            <label class="text-2xl text-gray-800">
             Calle: 
            </label>
            <input
              class="m-3 h-9 bg-white rounded-lg w-96 text-center text-neutral-900"
              type="email"
              id="email"
             
              onChange={handleChange}
              disabled={!editable}
            />
          </li >
          <li className="flex items-center justify-items-center ">
            <label class="text-2xl text-gray-800">
            Nº
            </label>
            <input
              class="m-3 h-9 bg-white rounded-lg w-25 text-center text-neutral-900"
              type="email"
              id="email"
              
              onChange={handleChange}
              disabled={!editable}
            />
          </li>
          <li className="flex items-center justify-items-center ">
            <label class="text-2xl text-gray-800">
            Código Postal
            </label>
            <input
              class="m-3 h-9 bg-white rounded-lg w-25 text-center text-neutral-900"
              type="email"
              id="email"
              
              onChange={handleChange}
              disabled={!editable}
            />
          </li>
          <li className="flex items-center justify-items-center ">
            <label class="text-2xl text-gray-800">
            Provincia:
            </label>
            <input
              class="m-3 h-9 bg-white rounded-lg w-96 text-center text-neutral-900"
              type="email"
              id="email"
              
              onChange={handleChange}
              disabled={!editable}
            />
          </li>
        </ul>
      </div>
          <div class="flex justify-center items-center ">
            <button class="border-2 bg-sky-700 p-2 text-xl m-4 rounded-2xl w-28" onClick={handleEdit} disabled={editable}>
              Editar
            </button>
          
            <button class="border-2 bg-sky-700 p-2 text-xl m-4 rounded-2xl w-28" onClick={ ()=>handleSave(userD._id)} disabled={!editable}>
              Guardar
            </button>
          </div>
    </div>
  );
};
export default PerfilUsuario;
