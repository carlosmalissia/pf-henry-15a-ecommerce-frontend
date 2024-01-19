import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { addItem } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getlogindata } from "@/redux/features/userSlice";
import { useShoppingCartupdateUserMutation } from "@/redux/services/usersApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card({ _id, title, price, image, category, stock, rating }) {
  const [hovered, setHovered] = useState(false);
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const userId = useAppSelector((state) => state.loginReducer.user);
  const userToken = useAppSelector((state) => state.loginReducer.token);
  const dispatch = useAppDispatch();

  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [updateCart] = useShoppingCartupdateUserMutation();

  let cartItemsId = [];

  cartItems.forEach((product) => {
    for (let i = 0; i < product.quantity; i++) {
      cartItemsId.push(product._id);
    }
  });

  const handleUpdateCart = async () => {
    try {
      if (userId && userId?._id && userToken) {
        const userID = userId?._id;
        const token = userToken;
        const shoppingCart = cartItemsId;

        const config = {
          shoppingCart,
          userID,
          token,
        };

        const { data, error } = await updateCart(config);

        if (error) {
          console.error("Error al actualizar el carrito:", error);
        } else {
          console.log("Carrito actualizado con éxito:", data);
        }
      } else {
        console.log("Usuario no autenticado. No se actualizará el carrito en la base de datos.");
      }
    } catch (error) {
      console.error("Error general al actualizar el carrito:", error);
    }
  };

  const handleAddToCart = () => {
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
    toast.success("Producto agregado al carrito.");
    handleUpdateCart();
  };

  useEffect(() => {
    dispatch(getlogindata());
    handleUpdateCart();
  }, [cartItems]);

  return (
    <div className="bg-white w-full border border-gray-300 rounded-md p-2 relative flex flex-col shadow-md items-center">
      <Link href={`/Detail/${_id}`} className="flex-1">
        <div className="flex flex-col items-center h-auto w-auto m-5">
          <Image
            className="object-contain mx-auto max-w-full h-48"
            src={image}
            alt=""
            width={200}
            height={300}
            priority={true}
          />
        </div>
        <div className="flex justify-center items-center mb-2 mx-auto">
          <h2 className="text-center text-sm text-black">{title}</h2>
        </div>
      </Link>
      <div className="flex flex-col mt-auto w-full">
        <div className="flex items-center justify-center text-center mb-2">
          {Array.from({ length: rating }, (_, index) => (
            <FaStar key={index} className="text-yellow-500 text-xl" />
          ))}
        </div>
        <h3 className="text-bggris text-center mb-1">{category}</h3>
        <h3 className="text-bgpriceRed text-center mb-1">Precio: {price} U$</h3>
        <button
          onClick={handleAddToCart}
          className="relative text-sm py-2 px-6 text-center text-white border border-bg-bgred overflow-hidden transition-all ease-in-out before:absolute before:bg-bgred before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:transition-all before:duration-300 before:w-full before:h-0 hover:before:h-full hover:text-white bg-bgbotones p-2 rounded-lg mx-auto flex justify-center items-center duration-300 transform w-32 whitespace-nowrap"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? (
            <MdOutlineShoppingCart className="text-xl mr-1" />
          ) : (
            "Agregar al carrito"
          )}
        </button>
        <ToastContainer theme="colored" position="bottom-left" autoClose={1000} />
      </div>
    </div>
  );
}