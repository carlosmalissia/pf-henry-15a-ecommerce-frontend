// Importa "use client" del paquete "next/client"
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/features/cart'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCartShoppingQuery, useShoppingCartupdateUserMutation} from "@/redux/services/usersApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function DetailID({ params }) {
  const { _id } = params;

  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.loginReducer.user);
  const userToken = useAppSelector((state) => state.loginReducer.token);
  let cartItemsId = cartItems.map((product) => product._id)
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  
  const { data: cartData, error: cartError } = useCartShoppingQuery({
      userID: userId?._id,
      _id: _id,
  });

  const { data: productById, error, isLoading, isFetching } = useGetProductByIdQuery(
    _id
  );
  

  
  useEffect(() => { }, [_id]);
  
  
  const [updateCart] = useShoppingCartupdateUserMutation();
    
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
        // Puedes mostrar un mensaje de éxito aquí si es necesario
      }
    } else {
      console.error("userID, userID._id o userToken es undefined");
    }
  } catch (error) {
    console.error("Error general al actualizar el carrito:", error);
  }
};

 
useEffect(() => {
 handleUpdateCart();
 console.log("Contenido del carrito:", cartItems);
}, [cartItems]);



  
  const [hoveredCarButon, setHoveredCarButon] = useState(false);
  const [quantity, setQuantity] = useState(1);


  
  

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > productById.stock) {
      setQuantity(productById.stock);
    } else {
      setQuantity(newQuantity);
    }
  };


  // Favoritos
  const [isFavorite, setIsFavorite] = useState(false);
  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    console.log(`Agregar a favoritos: ${productById.title}`);
  };


  if (isLoading || isFetching) return <p>Cargando...</p>;

  if (error) {
    console.error("Error al obtener el producto:", error);
    return <p>Hubo un error al obtener el producto.</p>;
  }



  // Colores de reviews
  function getRatingColorClass(rating) {
    if (rating === 1 || rating === 2) {
      return 'font-bold text-red-600';
    } else if (rating === 3 || rating === 4) {
      return 'font-bold text-yellow-500';
    } else if (rating === 5) {
      return 'font-bold text-green-500';
    } else {
      return 'font-bold text-gray-700';
    }
  }


  const handleAddToCart = () => {

    if (!userId) {
      setShowLoginMessage(true);
      
      toast.info(
        <>
          Por favor, <Link href="/Register" className="underline font-bold" >Inicia sesión o crea una cuenta</Link>  para agregar productos al carrito.
        </>,
        { autoClose: 3000 }
      );

      setTimeout(() => {
        setShowLoginMessage(false);
      }, 5000); 
      return;
    }



    const productData = {
      _id: productById._id,
      title: productById.title,
      price: productById.price,
      quantity: quantity,
      subtotal: productById.price * quantity,
      image: productById.image,
      stock: productById.stock
    };

    dispatch(addItem(productData));
    toast.success("Producto agregado al carrito.");
    handleUpdateCart();
  };

  

  return (
    <div>
      <div className="bg-bggris2 relative pt-10 mx-auto min-w-[20rem] w-[80%] flex flex-col md:flex-row mt-40 mb-10 shadow-md">
        {/* Imagen a la izquierda en pantallas grandes */}
        <div className="bg-white border-solid border-2 border-primary cursor-grab w-[40%] mb-5 mr-10 relative overflow-hidden flex items-center justify-center ml-10">
          <Image
            src={productById.image}
            alt={productById.title}
            width={400}
            height={300}
            priority={true}
            className="border-none object-contain w-[400px] h-[300px] transition-transform transform hover:scale-110"
          />

        </div>

        {/* Detalles del producto a la derecha */}
        <div className="md:w-[60%] ">
          <div className="flex items-center">
            {/* Icono de corazón para agregar a favoritos */}
            <button
              onClick={handleAddToFavorites}
              className={`text-bgred p-3 rounded-lg mx-2 
    flex justify-center items-center text-center 
    transition duration-300 ease-in-out `}
            >
              {isFavorite ? (
                <BsHeartFill className="text-2xl" />
              ) : (
                <BsHeart className="text-2xl" />
              )}
            </button>
            {/* rating y cuenta */}
            <h2 className="text-start text-sm text-bggris">
              {productById.averageRating} votos
            </h2>
          </div>

          {/* Titulo y descripción del producto */}
          <br />
          <h1 className="text-start text-xl text-black">{productById.title}</h1>
          <br />
          <p className="text-start text-sm text-bggris">
            {productById.description}
          </p>
          <br />
          <h2 className="text-start text-sm text-bggris">
            Disponibles: {productById.stock} unidades
          </h2>
          <br />
          <h2 className="text-start text-sm text-bggris">

            Categoria: {productById.category.name}

          </h2>
          <br />
          {/* Precio */}
          <div className="flex flex-col items-center md:items-start gap-2 md:w-full">
            <span className="font-bold text-2xl text-bgred">
              ${productById.price}
            </span>

            {/* Cantidad y botón Agregar al carrito */}
            <div className="flex items-center mt-3 mb-10">
              <label className="mr-2">Cantidad: </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border rounded-md p-1 w-16 text-black"
              />
              <button
                onClick={handleAddToCart}
                className={`bg-bgbotones text-white text-base py-2 px-10 rounded-lg mx-2 
    flex justify-center items-center text-center 
    transition duration-700 ease-in-out ${hoveredCarButon ? "hover:bg-bgred hover:text-white" : ""
                  } whitespace-nowrap`}
                onMouseEnter={() => setHoveredCarButon(true)}
                onMouseLeave={() => setHoveredCarButon(false)}
              >
                <span className="w-20 flex justify-center items-center text-center">
                  {hoveredCarButon ? (
                    <MdOutlineShoppingCart className="text-2xl text-center" />
                  ) : (
                    "Agregar al carrito"
                  )}
                </span>
              </button>
                {/* Mostrar mensaje de inicio de sesión si es necesario */}
            <ToastContainer theme="colored"/>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de revisiones  */}
      <div className="bg-bggris2 mx-auto mt-8 w-80 md:w-4/5 p-4 rounded-lg shadow-md md:mb-8">
        <h2 className="text-lg text-black">Opiniones del producto</h2>
        {productById.reviews.length > 0 ? (
          <ul className="space-y-4">
            {productById.reviews.map((review) => (
              <li key={review._id} className="bg-white border p-4 rounded-md">
                <p>{review.user.name}</p>
                <p className={getRatingColorClass(review.rating)}>
                  Puntos: {review.rating}
                </p>
                <p>Comentario: {review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Este producto aún no tiene comentarios.</p>
        )}
      </div>


      {/* cierre del contenedor mayor */}
    </div>
  );
}
