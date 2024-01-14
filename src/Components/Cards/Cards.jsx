"use client";
import Card from "@/Components/Card/Card";
import React, { useEffect, useState } from "react";
import Pagination from "@/Components/Pagination/Pagination";

import { useAppSelector } from "@/redux/hooks";
import { useGetUserByIdQuery } from "@/redux/services/usersApi"
import axios from "axios";

export default function Cards(props) {
  //Paginado

  //console.log(props);
  //const pageAmount = Math.ceil(props.data.length / props.pageSize); // cantidad de pag s/cant de cards



const userId = useAppSelector((state) => state.loginReducer.user);
const _id =userId?._id
console.log("esta es el ID " + _id)
const localStorageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
const{ data: user, error: userError } = useGetUserByIdQuery(_id);
console.log("user:", user);
  console.log("userName", user?.name + " " + user?.lastname);

const favoritos = user?.favorites
console.log("estos son los favoritos "+ favoritos)
const [fav, setFav] = useState(favoritos);

const addToFavorites = async (idUser, id) => {
  try {
    await axios.post(`https://pf-15a.up.railway.app/api/favorites/${idUser}`, { product: id }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorageToken}`
      }
    });

    // Actualizar el estado local (si lo necesitas)
    setFav((prevFavorite) => [...prevFavorite, id]);

    // Guardar en el almacenamiento local
   // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //localStorage.setItem('favorites', JSON.stringify([...favorites, _id]));

    // También puedes manejar otras lógicas, como mostrar un mensaje de éxito, etc.
  } catch (error) {
    console.error(error);
  }
};

const deleteFavorites = async (idUser, id) => {
  try {
    console.log( "idUser para delete " + idUser + "id de producto para delete "+ id)
      await axios.delete(`https://pf-15a.up.railway.app/api/favorites/${idUser}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorageToken}`
      },data:{ product: id }
    })
    const updatedFavorites = fav.filter((product) => product !== id);
    setFav(updatedFavorites);
    // return res.status(200).json({message: "Product deleted of favorites"});
  } catch (error) {
    console.error(error);
  }
};

console.log("este es el fav "+ fav)

const toggleFavorite = async (idUser, id) => {
  try {
      if (fav.includes(id)) {
        await deleteFavorites(idUser, id);
      } else {
        await addToFavorites(idUser, id);
      }
console.log("modificando el state")
      setFav((prevFavorites) =>
        prevFavorites.includes(id)
          ? prevFavorites.filter((product) => product !== id)
          : [...prevFavorites, id]
      );
    } catch (error) {
      console.error('Error al actualizar favoritos:', error.message);
    }
};


const handleToggleFavorite = (idUser, productId) => {
  toggleFavorite(idUser, productId);
};

useEffect(() => {
console.log("este es el console del useEfect" + fav)
}, [fav]);


  return (
    <div className="flex flex-col mb-16 xl:mb-0">
      <div
        className={`grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:w-[70vw] lg:w-[60vw]   mx-auto justify-end`}
      >
        {Array.isArray(props?.data) &&
          props.data.map((e, index) => (
            <Card
              className="border border-bgred rounded-md p-4"
              key={index}
              _id={e._id}
              image={e.image}
              title={e.title}
              price={e.price}
              category={e.category?.name} // Asegúrate de verificar también si category es undefined
              onToggleFavorite={()=>handleToggleFavorite(_id, e._id)}
              isFavorite={fav?.includes(e._id)}
            />
          ))}

      </div>
      <div className="text-center">
        <Pagination
          page={props.page}
          setPage={props.setPage}
          pageAmount={props.pageAmount}
        />
      </div>
    </div>
  );
}