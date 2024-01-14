// Importa "use client" del paquete "next/client"
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import { addItem } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useCartShoppingQuery,
  useShoppingCartupdateUserMutation,
} from "@/redux/services/usersApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Similares from "@/Components/Similares/Similares";
import ReviewForm from "@/Components/ReviewForm/ReviewForm";
import { Rating } from "@material-tailwind/react";
import { Progress } from "@material-tailwind/react";


export default function DetailID({ params }) {
  const { _id } = params;

  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.loginReducer.user);
  const userToken = useAppSelector((state) => state.loginReducer.token);
  let cartItemsId = cartItems.map((product) => product._id);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [favorite, setFavorite] = useState([])
  const idUser = userId?._id
  const localStorageToken = localStorage.getItem("token");

 // console.log("idUser" + idUser)
  const { data: cartData, error: cartError } = useCartShoppingQuery({
    userID: userId?._id,
    _id: _id,
  });

  const {
    data: productById,
    error,
    isLoading,
    isFetching,
  } = useGetProductByIdQuery(_id);

  useEffect(() => {}, [_id]);

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
  // const handleAddToFavorites = () => {
  //   setIsFavorite(!isFavorite);
  //   console.log(`Agregar a favoritos: ${productById.title}`);
  // };

  if (isLoading || isFetching) return <p>Cargando...</p>;

  if (error) {
    console.error("Error al obtener el producto:", error);
    return <p>Hubo un error al obtener el producto.</p>;
  }

  //Favorites by Isaac
  

  const handleAddToFavorites  = async ()=>{
    favorite ? await deleteFavorites(idUser, _id) : await addToFavorites(idUser, _id)
    setFavorite(!favorite)

  }

  const addToFavorites = async (idUser,_id) => {
    try {
      // Realizar una solicitud para agregar un producto a favoritos
      await axios.post(`https://pf-15a.up.railway.app/api/favorites/${idUser}`, { product: _id },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorageToken}`
        }
      });
      setFavorite((prevFavorite) => [...prevFavorite, _id])
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
      const updatedFavorites = favorite.filter((product) => product !== _id);
      setFavorite(updatedFavorites);
      // return res.status(200).json({message: "Product deleted of favorites"});
    } catch (error) {
      console.error(error);
    }
  };


 
  const handleAddToCart = () => {
    if (!userId) {
      setShowLoginMessage(true);

      toast.info(
        <>
          Por favor,{" "}
          <Link href="/Register" className="underline font-bold">
            Inicia sesión o crea una cuenta
          </Link>{" "}
          para agregar productos al carrito.
        </>,
        { autoClose: 1000 }
      );

      setTimeout(() => {
        setShowLoginMessage(false);
      }, 3000);
      return;
    }

    const productData = {
      _id: productById._id,
      title: productById.title,
      price: productById.price,
      quantity: quantity,
      subtotal: productById.price * quantity,
      image: productById.image,
      stock: productById.stock,
    };

    dispatch(addItem(productData));
    toast.success("Producto agregado al carrito.");
    handleUpdateCart();
  };

  const handleReviewSubmit = (review) => {
    const reviewData = {
      userId: userId?._id,
      userName: userId?.name,
      review,
    };

    console.log("Nueva revisión:", reviewData);
  };

  //**reviews
  //calcular promedio de reviews
  const calculateRatingDistribution = (reviews) => {
    // Inicializar contadores para cada estrella
    const starCounts = Array(5).fill(0);

    // Contar las calificaciones
    reviews.forEach((review) => {
      const rating = review.rating;
      if (rating >= 1 && rating <= 5) {
        starCounts[rating - 1]++;
      }
    });

    const totalReviews = reviews.length;
    const percentagePerStar = starCounts.map(
      (count) => (count / totalReviews) * 100
    );

    return {
      starCounts,
      percentagePerStar,
    };
  };

  const ratingDistribution = calculateRatingDistribution(productById.reviews);

  //redondear averagge de reviews
  const roundedAverage = Math.floor(productById.averageRating);

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
            <section className="text-start text-lg text-bggris flex flex-row gap-4">
              <Rating
                className="text-sm text-yellow-500"
                readonly
                value={roundedAverage}
                unratedColor="yellow"
                ratedColor="amber"
              />
              <p className="text-center text-xl text-yellow-500">
                {productById.averageRating}/5 ({productById.reviews.length})
              </p>
            </section>
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
    transition duration-700 ease-in-out ${
      hoveredCarButon ? "hover:bg-bgred hover:text-white" : ""
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
              <ToastContainer theme="colored" position="top-left" autoClose={2000}/>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de revisiones  */}
      <section className="bg-bggris2 mx-auto mt-8 w-[85%]  p-4 rounded-lg shadow-md md:mb-8 flex flex-col">
        <h2 className="text-2xl text-center m-4 text-black">Calificaciones de este producto</h2>
        {/* Formulario de revision */}
        <div className="w-full  p-4 flex flex-row">
          <div className="w-[50%]  p-4">
            {/* calculo de revisiones */}
            <section className="text-start text-lg text-yellow-500 flex flex-row gap-4">
              <Rating
                className="text-sm "
                readonly
                value={roundedAverage}
                unratedColor="yellow"
                ratedColor="amber"
              />
              <p className="text-center text-xl">
                {productById.averageRating}/5 ({productById.reviews.length})
                calificaciones
              </p>
            </section>

            {/* Estadísticas de calificación */}
            <div className="w-full p-4">
              <h2 className="text-lg text-black">
                Estadísticas de Calificación
              </h2>
              {productById.reviews.length > 0 ? (
                <div>
                  {ratingDistribution.starCounts
                    .slice()
                    .reverse()
                    .map((count, index) => (
                      <div key={index} className="mb-2">
                      <div className="flex items-center">
                        <Rating
                          className={`text-sm ${
                            5 - index === 1 ? 'text-bgred' : 'text-yellow-500'
                          } mr-2`}
                          readonly
                          value={5 - index}
                        />
                        <div className="relative pt-1 w-[80%]">
                          <div className="flex mb-2 items-center justify-between">
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex w-full items-center justify-between">
                              <div className="flex-1 mr-2">
                                <div className="h-2 bg-teal-500 rounded-full relative">
                                  <div
                                    style={{ width: `${ratingDistribution.percentagePerStar[5 - index - 1]}%` }}
                                    className="h-full bg-teal-200 rounded-full absolute bottom-0"
                                  ></div>
                                </div>
                              </div>
                              <span className="text-lg text-teal-600 ml-2">
                              ({count}) {`${ratingDistribution.percentagePerStar[5 - index - 1]}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600">
                 Este producto no tiene calificaciones
                </p>
              )}
            </div>
          </div>
          <div className="w-[50%]  p-4">
            <h2 className="text-lg text-black text-center mb-4">
              Deja un comentario
            </h2>
            <ReviewForm onReviewSubmit={handleReviewSubmit} />
          </div>
        </div>

        {/* Seccion de revisiones  */}
        <div className="w-full p-4 bg-white">
          <h2 className="text-2xl text-black text-center mb-4">Comentarios sobre el producto</h2>
          {productById.reviews.length > 0 ? (
            <ul className="space-y-4">
              {productById.reviews.map((review) => (
                <li
                  key={review._id}
                  className="  rounded-md text-lg"
                >
                  <p>Usuario: {review.user.name}</p>
                  <p className="font-bold text-yellow-500">
                    <Rating readonly value={review.rating} size="sm" />
                  </p>
                  <p>Comentario: {review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              Este producto aún no tiene comentarios.
            </p>
          )}
        </div>
      </section>

      {/* productos similares */}
      <section>
        <Similares category={productById.category.name} _id={productById._id} />
      </section>

      {/* cierre del contenedor mayor */}
    </div>
  );
}
