import React, { useState } from "react";
import style from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Card({ _id, title, price, image, category }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={`bg-white-500 w-full border border-gray-300 rounded-md p-4 relative flex flex-col`}>
      <Link href={`/Detail/${_id}`} className="flex-1">
        <div className={`${style.content__img} mb-4 overflow-visible relative`}>
          {/* Contenido de la imagen */}
          <Image
            className={`object-contain w-full h-full`}
            src={image}
            alt=""
            width={200}
            height={300}
          />
        </div>
        {/* Título */}
        <div className="flex justify-center items-center w-52 mb-2 mx-auto">
          <h2 className="text-center text-sm text-black">{title}</h2>
        </div>
      </Link>

      {/* Contenido inferior de la tarjeta */}
      <div className="flex flex-col mt-auto">
        {/* Categoría */}
        <h3 className="text-bggris items-center text-center mb-2">
          {category}
        </h3>
        {/* Precio */}
        <h3 className="text-bgpriceRed items-center text-center mb-2">
          Precio: {price} U$
        </h3>
        {/* Botón de agregar al carrito */}
        <button
          className={`bg-primary text-white p-3 rounded-lg mx-auto flex justify-center items-center text-center transition duration-300 ease-in-out transform ${hovered ? 'hover:bg-bgred hover:text-white hover:scale-110' : ''
            } w-40`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? (
            <MdOutlineShoppingCart className="text-2xl mr-2" />
          ) : (
            'Agregar al carrito'
          )}
        </button>
      </div>
    </div>
  );

}
