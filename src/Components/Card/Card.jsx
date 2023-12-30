"use client";
import React, { useEffect, useState } from "react";
import style from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { addItem } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getlogindata } from "@/redux/features/userSlice";
import {
  useCartShoppingQuery,
  useShoppingCartupdateUserMutation,
} from "@/redux/services/usersApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Card({ _id, title, price, image, category, stock }) {
  const [hovered, setHovered] = useState(false);
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const userId = useAppSelector((state) => state.loginReducer.user);
  const userToken = useAppSelector((state) => state.loginReducer.token);
  const dispatch = useAppDispatch();

  const [showLoginMessage, setShowLoginMessage] = useState(false);


  const { data: cartData, error: cartError } = useCartShoppingQuery({
    userID: userId?._id,
    _id: _id,
  });


  let cartItemsId = cartItems.map((product) => product._id)

  const [updateCart] = useShoppingCartupdateUserMutation();

  const handleUpdateCart = async () => {
    try {
      if (userId && userId?._id) {
        const userID = userId?._id;
        const token = userToken;
        const shoppingCart = cartItemsId;

        console.log("Información a enviar al servidor:", {
          shoppingCart,
          userID,
          token,
        });

        const { data, error } = await updateCart({
          userID,
          token,
          shoppingCart
        });

        if (error) {
          console.error("Error al actualizar el carrito:", error);
        } else {
          console.log("Carrito actualizado con éxito:", data);
        }
      } else {
        console.error("userID o userID._id es undefined");
      }
    } catch (error) {
      console.error("Error general al actualizar el carrito:", error);
    }
  };


  const handleAddToCart = () => {

    if (!userId) {
      setShowLoginMessage(true);

      toast.error(
        <>
          Por favor, <Link href="/Register" className="underline font-bold" >Inicia sesión o crea una cuenta</Link>  para agregar productos al carrito.
        </>,
        { autoClose: 3000 }
      );

      setTimeout(() => {
        setShowLoginMessage(false);
      }, 3000);
      return;
    }


    const productData = {
      _id: _id,
      title: title,
      price: price,
      quantity: 1,
      subtotal: price * 1,
      image: image,
      stock: stock,
    };

    dispatch(addItem(productData));
    handleUpdateCart();
  };

  useEffect(() => {
    dispatch(getlogindata());
  }, [cartItems]);

  return (
    <div
      className={`bg-white-500 w-full border border-gray-300 rounded-md p-2 relative flex flex-col shadow-md`}
    >
      <Link href={`/Detail/${_id}`} className="flex-1">
        <div className="flex flex-col items-center h-auto w-auto m-5">
          {/* Contenido de la imagen */}
          <Image
            className={`object-contain mx-auto max-w-full h-48`}
            src={image}
            alt=""
            width={200}
            height={300}
            priority={true}
          />
        </div>

        {/* Título */}
        <div className="flex justify-center items-center mb-2 mx-auto">
          <h2 className="text-center text-sm text-black">{title}</h2>
        </div>
      </Link>
      {/* Contenido inferior de la tarjeta */}
      <div className="flex flex-col mt-auto">
        {/* Categoría */}
        <h3 className="text-bggris items-center text-center mb-1">
          {category}
        </h3>
        {/* Precio */}
        <h3 className="text-bgpriceRed items-center text-center mb-1">
          Precio: {price} U$
        </h3>
        {/* Botón de agregar al carrito */}
        <button
          onClick={handleAddToCart}
          className={`relative text-sm py-2 px-6 text-center text-white border border-bg-bgred overflow-hidden transition-all ease-in-out before:absolute before:bg-bgred before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:transition-all before:duration-300 before:w-full before:h-0 hover:before:h-full hover:text-white
              bg-bgbotones p-2 rounded-lg mx-auto flex justify-center items-center  duration-300  transform ${hovered ? " hover:text-white " : ""
            } w-32 whitespace-nowrap`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? (
            <MdOutlineShoppingCart className="text-xl mr-1" />
          ) : (
            "Agregar al carrito"
          )}
        </button>
        {/* Mostrar mensaje de inicio de sesión si es necesario */}
        <ToastContainer />
      </div>
    </div>
  );
}