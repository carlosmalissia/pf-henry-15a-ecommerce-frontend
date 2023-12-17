'use client'
import React, { useEffect, useState } from "react";
import style from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { addItem } from '@/redux/features/cart'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


export default function Card({ _id, title, price, image, category }) {
  const [hovered, setHovered] = useState(false);
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    const productData = {
      _id: _id,
      title: title,
      price: price,
      quantity: 1,
      subtotal: price * 1
    };

    dispatch(addItem(productData));
  };

  useEffect(() => {
    console.log("Contenido del carrito:", cartItems);
  }, [cartItems]);

  return (

    <div
      className={`bg-white-500 w-full border border-gray-300 rounded-md p-2 relative flex flex-col`}
    >

      <Link href={`/Detail/${_id}`} className="flex-1">
        <div className={`${style.content__img} mb-2 overflow-visible relative`}>
          {/* Contenido de la imagen */}
          <Image
            className={`object-contain w-full h-48`}
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
      </div>
    </div>
  );
}

