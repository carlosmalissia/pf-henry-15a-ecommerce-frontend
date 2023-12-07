import React, { useState } from "react";
import style from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Card({ id, title, price, image }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={`bg-white-500 w-full border border-gray-300 rounded-md p-4 relative flex flex-col`}>
      <Link href={`/Detail/${id}`} className="flex-1">
        <div className={`${style.content__img} mb-4`}>
          <Image
            className={`${style.img}`}
            src={image}
            alt=""
            width={200}
            height={300}
          />
        </div>
        <h3 className="text-bggris items-center text-center mb-2">Ref: {id}</h3>
        <div className="flex justify-between w-48 mb-2">
          <h2 className="text-center text-black hover:scale-110 items-center">
            {title}
          </h2>
        </div>
      </Link>

      <div className="flex flex-col mt-auto">
        <h3 className="text-bgpriceRed items-center text-center mb-2">
          Precio: {price} U$
        </h3>
        <button
          className={`bg-primary text-white p-3 rounded-lg mx-auto 
            flex justify-center items-center text-center 
            transition duration-300 ease-in-out ${
              hovered ? "hover:bg-bgred hover:text-white" : ""
            } w-40`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? (
            <MdOutlineShoppingCart className="text-2xl mr-2" />
          ) : (
            "Agregar al carrito"
          )}
        </button>
      </div>
    </div>
  );
}
