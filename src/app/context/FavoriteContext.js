// context/FavoriteContext.js
"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import axios from 'axios';


const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const userId = useAppSelector((state) => state.loginReducer.user);
  const [idUser, setIdUser] = useState(null);
  //const idUser = userId?._id?.toString();
  const localStorageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const localStorageuser = typeof window !== 'undefined' ? localStorage.getItem("user"): null

  

console.log("este es el idUser" + idUser)
console.log("este es el User " + localStorageuser)

useEffect(() => {
  const loadUserId = async () => {
    try {
      const id = userId?._id?.toString();
      if (id) {
        setIdUser(id);
      } else {
        console.error('idUser es undefined');
      }
    } catch (error) {
      console.error('Error al obtener idUser:', error);
    }
  };

  loadUserId();
}, [userId]);


  const addToFavorites = async (idUser,_id) => {
    try {
      // Realizar una solicitud para agregar un producto a favoritos
      await axios.post(`https://pf-15a.up.railway.app/api/favorites/${idUser}`, { product: _id },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorageToken}`
        }
      });
      setFavorites((prevFavorite) => [...prevFavorite, _id])
      // return res.status(200).json({message: "Product added to favorites"})
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorites = async (idUser, _id) => {
    try {
      console.log( "token para delete " + localStorageToken)
      // Realizar una solicitud para eliminar un producto de favoritos
      await axios.delete(`https://pf-15a.up.railway.app/api/favorites/${idUser}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorageToken}`
        }
      },{ product: _id },);
      const updatedFavorites = favorites.filter((product) => product !== _id);
      setFavorites(updatedFavorites);
      // return res.status(200).json({message: "Product deleted of favorites"});
    } catch (error) {
      console.error(error);
    }
  };

  




  const toggleFavorite = async (idUser, _id) => {
    try {
        if (favorites.includes(_id)) {
          await deleteFavorites(idUser, _id);
        } else {
          await addToFavorites(idUser, _id);
        }
  
        setFavorites((prevFavorites) =>
          prevFavorites.includes(_id)
            ? prevFavorites.filter((id) => id !== _id)
            : [...prevFavorites, _id]
        );
      } catch (error) {
        console.error('Error al actualizar favoritos:', error.message);
      }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  return useContext(FavoriteContext);
};
