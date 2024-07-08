import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { addItem } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getlogindata } from "@/redux/features/userSlice";

import {
  useCartShoppingQuery,
  useShoppingCartupdateUserMutation,
  useGetUserByIdQuery,
} from "@/redux/services/usersApi";
import "react-toastify/dist/ReactToastify.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/redux/services/favoritesApi";
import { toast, Toaster } from "react-hot-toast";
import ProductDetail from "../ProductDetail/ProductDetail";
import { FiEye } from "react-icons/fi";

export default function Card({ _id, title, price, image, category, stock, rating }) {

  const [hovered, setHovered] = useState(false);
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const userId = useAppSelector((state) => state.loginReducer.user);
  const userToken = useAppSelector((state) => state.loginReducer.token);
  const dispatch = useAppDispatch();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showHeader, setShowHeader] = useState(false);


  const userid = userId?._id;

  const { data: user, error: userError } = useGetUserByIdQuery(userid);

  const [fav, setFav] = useState(user?.favorites || []);
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setFav(user?.favorites || []);
  }, [user?.favorites]);


  useEffect(() => {
    console.log("Contenido de favoritos:", fav);
  }, [fav]);

  const handleAddToFavorites = async () => {
    try {
      const userID = user?._id;
      const idProduct = _id;

      const config = {
        product: idProduct,
        token: userToken,
        userId: userID,
      };

      if (fav.includes(idProduct)) {
        const { data, error } = await removeFavorite(config);
        toast.success("Producto eliminado de favoritos");
        setFav((prevFavorites) =>
          prevFavorites.filter((productId) => productId !== idProduct)
        );
      } else {
        const { data, error } = await addFavorite(config);
        toast.success("Producto agregado a favoritos:");
        setFav((prevFavorites) => [...prevFavorites, idProduct]);
      }
    } catch (error) {
      console.error(
        "Error al agregar/eliminar el producto de favoritos:",
        error
      );
    }
  };

  /* const { data: cartData, error: cartError } = useCartShoppingQuery({
    userID: userId?._id,
    _id: _id,
  }); */
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

        // Si el usuario no está autenticado, puedes manejarlo de otra manera o simplemente no hacer nada
        console.log(
          "Usuario no autenticado. No se actualizará el carrito en la base de datos."
        );
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


    const existingItem = cartItems.find((item) => item._id === _id);

    if (existingItem && existingItem.quantity + 1 > existingItem.stock) {
      toast.error(
        "No hay suficiente stock disponible para agregar más unidades de este producto al carrito."
      );
    } else {
      dispatch(addItem(productData));
      toast.success("Producto agregado al carrito.");
      handleUpdateCart();
    }
  };


  return (
    <div
      className={`bg-white-500 w-full  rounded-md p-2 relative flex flex-col shadow-md`}
    >
      <div className="flex items-center justify-center ">
        <div>
          <button onClick={handleShowModal}>
            <FiEye className="text-3xl text-primary" />
          </button>
          {showModal && (
            <ProductDetail _id={_id} handleCloseModal={handleCloseModal} />
          )}
        </div>

        {/* Botón de favoritos */}
        <button
          onClick={() => {
            handleAddToFavorites();
          }}
          className={`text-bgred p-3 rounded-lg mx-2 
      flex justify-end items-center text-center 
      transition duration-300 ease-in-out `}
        >
          {fav.includes(_id) ? (
            <BsHeartFill className="text-2xl" />
          ) : (
            <BsHeart className="text-2xl" />
          )}
        </button>
      </div>


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
          <p className="text-center font-bold text-sm text-black">{title}</p>
        </div>
      </Link>

      {/* Contenido inferior de la tarjeta */}
      <div className="flex items-center justify-center text-center mb-2">
        {Array.from({ length: rating }, (_, index) => (
          <FaStar key={index} className="text-yellow-500 text-xl" />
        ))}
      </div>
      <div className="flex flex-col mt-auto">
        {/* Categoría */}
        <section className="flex flex-row justify-center font-bold gap-4">
          <p className="text-bggris items-center text-center mb-1">
            {category}
          </p>
          {/* Precio */}
          <p className="text-bgpriceRed items-center text-center mb-1">
            {price} U$
          </p>
        </section>
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

        {/* Mostrar mensaje de inicio de sesión si es necesario */}
        <Toaster position="top-center" />

      </div>
    </div>
  );
}
