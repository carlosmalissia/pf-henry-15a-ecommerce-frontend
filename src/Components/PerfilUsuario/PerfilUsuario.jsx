"use Client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserByIdQuery } from "@/redux/services/usersApi"


const PerfilUsuario = () => {

  const [imageSelect, setImageSelect] = useState(null);




  const localStorageToken = localStorage.getItem("token");
  const userD = useAppSelector((state) => state.loginReducer.user);


  const id = userD?._id;



  const { data: dataUser } = useGetUserByIdQuery(id);
  let image = dataUser?.image
  console.log("supuesta imagen", image);

  const [userData, setUserData] = useState({
    name: dataUser?.name,
    lastname: dataUser?.lastname,
    email: dataUser?.email,
    address: dataUser?.address,
    avatar: image, // Agrega el campo avatar con la URL por defecto
  });

  const [showImageUpload, setShowImageUpload] = useState(false);


  const [editable, setEditable] = useState(false);
  const firstInputRef = useRef(null);

  const handleEdit = () => {
    setShowImageUpload(true);
    setEditable(true);
    setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();

      }
    }, 0); // El retraso de 0 ms ayuda a que se ejecute en el próximo ciclo de eventos
  };

  const handleSave = async (id) => {
    try {
      setEditable(false);
      if (!userData.name || !userData.lastname || !userData.email) {
        alert('Por favor, completa todos los campos antes de guardar.');
        return;
      }
      const formData = new FormData();
      imageSelect && formData.append("photoData", imageSelect);
      imageSelect.name && formData.append("name", imageSelect.name);

      const respuesta = await axios.post(
        `https://pf-15a.up.railway.app/api/photos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("respuesta", respuesta);
      console.log("form Data", formData);

      const imagen = `https://pf-15a.up.railway.app/api/photos/${respuesta.data.id}`;
      console.log("imagen id", imagen);
      setUserData({
        ...userData,
        avatar: imagen
      })
      if (imagen) {
        const response = await axios.put(`https://pf-15a.up.railway.app/api/users/${id}`, {
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
          address: userData.address,
          image: imagen
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorageToken}`
          }
        });

      }

      console.log("esta es la data delusuario ", userData);

      alert('Cambios guardados correctamente');

      // Recargar la página
      window.location.reload();

    } catch (error) {
      console.error('Error en la solicitud:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const imageUrl = URL.createObjectURL(file);
    console.log("fiele", file);
    if (file !== null) {
      const imageUrl = URL.createObjectURL(file);
      console.log("ten", imageUrl);
      setUserData({
        ...userData,
        avatar: imageUrl
      })
      setImageSelect(file)

    }

  };




  return (
    <div className="min-h-screen mr-96 flex items-center justify-center mt-[-64px]">
      <div id="user-form" className="bg-white p-4 rounded shadow-xl w-96 flex flex-col">
        <div className="flex justify-center items-center mb-4 cursor-pointer">
          <img
            src={userData?.avatar}
            alt="Avatar"
            className="rounded-full w-16 h-16"
            onClick={handleEdit}
          /> {showImageUpload && (
            <div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
              <button onClick={() => setShowImageUpload(false)}>Cancelar</button>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center font-serif mx-auto mt-4">
          Mis datos
        </h1>
        <div className="mb-4 flex items-center">
          <label
            htmlFor="nombre"
            className="block text-gray-700 text-sm font-semibold mb-2 mr-2"
          >
            Nombre:
          </label>
          <input
            ref={firstInputRef}
            autoFocus={editable}  // Agrega el atributo autoFocus aquí
            className={`ml-1 transition-all duration-300 ease-in-out ${editable ? "transform scale-100 hover:scale-105 " : ""
              } mr-10 bg-gray-50 border ${editable ? "border-teal-500" : "border-gray-800"
              } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Name"
          />
        </div>

        <div className="mb-4 flex items-center">




          <label htmlFor="apellido" className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Apellido:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${editable ? "transform scale-100 hover:scale-105" : ""
              } mr-10 bg-gray-50 border ${editable ? "border-teal-500" : "border-gray-300"
              } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="lastname"
            value={userData.lastname}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Lastname"
          />

        </div>

        <div className="mb-4 flex items-center">




          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Email:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${editable ? "transform scale-100 hover:scale-105" : ""
              } mr-10 bg-gray-50 border ${editable ? "border-teal-500" : "border-gray-300"
              } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Email"
          />

        </div>


        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 text-sm font-semibold mb-2 mr-2">
            Dirección:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${editable ? "transform scale-100 hover:scale-105" : ""
              } mr-10 bg-gray-50 border ${editable ? "border-teal-500" : "border-gray-300"
              } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="address"
            value={userData.address}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Dirección"
          />
        </div>

        <p className="text-gray-600 text-sm mb-2">
          ¿Necesitas actualizar tu información? Haz clic en <strong>"Editar"</strong> para empezar.
        </p>

        <div className="flex justify-center items-center">

          <button
            className="mr-6 bg-red-600 text-white rounded px-2 py-1 hover:bg-red-800 focus:outline-none cursor-pointer w-20 "
            onClick={handleEdit}
            disabled={editable}
          >
            Editar
          </button>
          <button
            className="bg-teal-500 text-white rounded px-2 py-1 hover:bg-teal-800 focus:outline-none cursor-pointer w-20"
            onClick={() => handleSave(userD._id)} disabled={!editable}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
export default PerfilUsuario;