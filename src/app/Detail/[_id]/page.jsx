// Importa "use client" del paquete "next/client"
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import { addItem } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useCartShoppingQuery,
  useGetUserByIdQuery,
  useShoppingCartupdateUserMutation,
} from "@/redux/services/usersApi";
import { useNewReviewMutation } from "@/redux/services/reviewsApi";
import  { toast, Toaster } from 'react-hot-toast';
import Link from "next/link";
import Similares from "@/Components/Similares/Similares";
import ReviewForm from "@/Components/ReviewForm/ReviewForm";
import ReviewList from "@/Components/ReviewList/ReviewList";
import { Rating } from "@material-tailwind/react";
import { Progress } from "@material-tailwind/react";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/redux/services/favoritesApi";
import { config } from "@fortawesome/fontawesome-svg-core";
//data 
import { data } from '/public/data.js';

export default function DetailID({ params }) {
  const { _id } = params;
  console.log("id:", _id)

  const productId = parseInt(_id); 
  const productos = data.products
  console.log("productos:", productos)
  const product = productos.find(product => product._id === productId);
  console.log("product:", product)


  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();
  // const userId = useAppSelector((state) => state.loginReducer.user);
  // const userToken = useAppSelector((state) => state.loginReducer.token);
  // const [showLoginMessage, setShowLoginMessage] = useState(false);
  // const [newReview] = useNewReviewMutation();

  // const { data: userData } = useGetUserByIdQuery(userId?._id);
  // const [isFavorite, setIsFavorite] = useState(userData?.favorites || []);

  // const {
  //   data: productById,
  //   error,
  //   isLoading,
  //   isFetching,
  // } = useGetProductByIdQuery(_id, {
  //   refetchOnMountOrArgChange: true,
  //   refetchInterval: 5000,
  // });




  // let idItems = [];

  // cartItems.forEach((product) => {
  //   for (let i = 0; i < product.quantity; i++) {
  //     idItems.push(product._id);
  //   }
  // });

  // const [updateCart] = useShoppingCartupdateUserMutation();

  // const [addFavorite] = useAddFavoriteMutation();
  // const [removeFavorite] = useRemoveFavoriteMutation();

  const handleUpdateCart = async () => {
    // try {
    //   // if (userId && userId?._id && userToken) {
    //   //   const userID = userId?._id;
    //   //   const token = userToken;
    //   //   const shoppingCart = idItems;

    //   //   const config = {
    //   //     shoppingCart,
    //   //     userID,
    //   //     token,
    //   //   };

    //     // const { data, error } = await updateCart(config);

    //     if (error) {
    //       console.error("Error al actualizar el carrito:", error);
    //     } else {
    //       // console.log("Carrito actualizado con éxito:", data);
    //     }
    //   } else {
    //     console.log(
    //       "Usuario no autenticado. No se actualizará el carrito en la base de datos."
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error general al actualizar el carrito:", error);
    // }
  };

  const handleAddToCart = () => {
    if (quantity >= 1) {

      const productData = {
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        subtotal: product.price * quantity,
        image: product.image,
        stock: product.stock,
      };

      const existingItem = cartItems.find(item => item._id === product._id);


      if (existingItem && existingItem.quantity + quantity > existingItem.stock) {
        toast.error("No hay suficiente stock disponible para agregar más unidades de este producto al carrito.");
      } else {
        dispatch(addItem(productData));
        toast.success("Producto agregado al carrito.");
        handleUpdateCart();
      }
    } else {
      toast.error("La cantidad debe ser mayor a 0");
    }
  };


  // useEffect(() => { }, [_id]);

  // useEffect(() => {
  //   handleUpdateCart();
  // }, [cartItems]);

  // useEffect(() => {
  //   setIsFavorite(userData?.favorites || []);
  // }, [userData?.favorites]);

  // useEffect(() => {
  //   console.log("Contenido de favoritos:", isFavorite);
  // }, [isFavorite]);

  const [hoveredCarButon, setHoveredCarButon] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(newQuantity);
    }
  };

  // Favoritos

  // const handleAddToFavorites = async () => {
  //   try {
  //     const userID = userId?._id;
  //     const idProduct = productById?._id;

  //     const config = {
  //       product: idProduct,
  //       token: userToken,
  //       userId: userID,
  //     };

  //     if (isFavorite.includes(idProduct)) {
  //       const { data, error } = await removeFavorite(config);
  //       toast.success("Producto eliminado de favoritos.");
  //       setIsFavorite((prevFavorites) =>
  //         prevFavorites.filter((productId) => productId !== idProduct)
  //       );
  //     } else {
  //       const { data, error } = await addFavorite(config);
  //       console.log("producto agregado a favoritos:", productById?.title);
  //       toast.success("Producto agregado a favoritos.");
  //       setIsFavorite((prevFavorites) => [...prevFavorites, idProduct]);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error al agregar/eliminar el producto de favoritos:",
  //       error
  //     );
  //   }
  // };

  // if (isLoading || isFetching) return <p>Cargando...</p>;

  // if (error) {
  //   console.error("Error al obtener el producto:", error);
  //   return <p>Hubo un error al obtener el producto.</p>;
  // }

  //**reviews
  //calcular promedio de reviews
  // const calculateRatingDistribution = (reviews) => {
  //   const starCounts = Array(5).fill(0);

  //   reviews.forEach((review) => {
  //     const rating = review.rating;
  //     if (rating >= 1 && rating <= 5) {
  //       starCounts[rating - 1]++;
  //     }
  //   });

  //   const totalReviews = reviews.length;
  //   const percentagePerStar = starCounts.map(
  //     (count) => (count / totalReviews) * 100
  //   );

  //   return {
  //     starCounts,
  //     percentagePerStar,
  //   };
  // };

  // const ratingDistribution = calculateRatingDistribution(productById.reviews);
  // const roundedAverage = Math.floor(productById.averageRating);

  return (
    <div>
      <div className="bg-bggris2 relative pt-10 mx-auto min-w-[20rem] w-[90%] rounded-2xl flex flex-col md:flex-row mt-28 mb-10 shadow-md">
        {/* Imagen a la izquierda en pantallas grandes */}
        <div className="bg-white border-solid border-2 border-primary cursor-grab w-[40%] mb-5 mr-10 relative overflow-hidden flex items-center justify-center ml-10">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={300}
            priority={true}
            className="border-none object-contain w-[400px] h-[300px] transition-transform transform hover:scale-110"
          />
        </div>

        {/* Detalles del producto a la derecha */}
        <div className="md:w-[60%] ">
          <br />
          <h1 className="text-start text-xl text-black">{product.title}</h1>
          <br />
          <div className="flex items-center">
            {/* Icono de corazón para agregar a favoritos */}
            {/* {userId && (
              <button
                onClick={handleAddToFavorites}
                className={`text-bgred p-3 rounded-lg mx-2 
        flex justify-center items-center text-center 
        transition duration-300 ease-in-out `}
              >
                {isFavorite.includes(productById?._id) ? (
                  <BsHeartFill className="text-2xl" />
                ) : (
                  <BsHeart className="text-2xl" />
                )}
              </button>
            )} */}
            {/* rating y cuenta */}
            <section className="text-lg text-yellow-500 flex flex-row gap-4">
              {/* <p>
                {" "}
                {productById && productById.averageRating
                  ? productById.averageRating.toFixed(1) + " /5"
                  : 0 + "/5"}
              </p> */}

              <Rating
                className="text-sm "
                readonly
                value= {5}
                unratedColor="yellow"
                ratedColor="amber"
              />
              {/* <p className="flex items-center text-center text-sm">
                ({productById.reviews.length}) calificaciones
              </p> */}
            </section>
          </div>

          {/* Titulo y descripción del producto */}
          <br />
          <span className="font-bold text-2xl text-bgred mt-4">
            ${product.price}
          </span>
          <br />
          <br />
          <p className="text-start text-sm text-bggris mr-8">
            {product.description}
          </p>
          <br />
          <h2 className="text-start text-sm text-bggris">
            Categoria: {product.category}
          </h2>
          <br />
          <h2 className="text-start text-sm text-bggris">
            Disponibles: {product.stock} unidades
          </h2>
          <br />
          {/* Precio */}
          <div className="flex flex-col items-center md:items-start gap-2 md:w-full">
            {/* Cantidad y botón Agregar al carrito */}
            <div className="flex items-center mt-3 mb-10">
              <label className="mr-2">Cantidad: </label>
              <input
                type="number"
                min="1"
                value={1}
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
              <Toaster position="top-center"/>
            </div>
          </div>
        </div>
      </div>



   

      {/* productos similares */}
      {/* <section>
        <Similares category={productById.category.name} _id={productById._id} />
      </section> */}

      {/* cierre del contenedor mayor */}
    </div>
  );
}
