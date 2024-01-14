import React, { useState } from "react";
import Image from "next/image";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useAppSelector } from "@/redux/hooks";
import { useNewReviewMutation } from "@/redux/services/reviewsApi";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

const HistoryProduct = ({ productos }) => {
  const userToken = useAppSelector((state) => state.loginReducer.token);
  const [newReview] = useNewReviewMutation();

  const [openReviewFormProductId, setOpenReviewFormProductId] = useState(null);

  const toggleReviewForm = (productId) => {
    setOpenReviewFormProductId((prevProductId) =>
      prevProductId === productId ? null : productId
    );
  };

  const handleReviewSubmit = async (reviewData, productId) => {
    try {
      const config = {
        review: reviewData,
        token: userToken,
      };

      console.log("datos de review:", config);

      const { data, error } = await newReview(config);

      toast.success("Reseña creada exitosamente");

      console.log("review cargada:", data);

      // Ocultar el formulario después de que la revisión se ha creado
      setOpenReviewFormProductId(null);
    } catch (error) {
      console.error("Error al crear la reseña:", error);
    }
  };

  return (
    <div className="w-full border rounded-md bg-white p-2 h-full shadow-xl">
      <div className="text-m text-black font-serif py-2 px-4 rounded-lg shadow-m mb-4 "></div>
      {productos.map((productoId) => (
        <div
          key={productoId}
          className={`flex items-center justify-center mb-2 flex-col transition ${
            openReviewFormProductId === productoId
              ? "h-100 p-4 border rounded-md shadow-md"
              : "h-auto"
          }`}
        >
          <ProductItem productId={productoId} />
          <button
            onClick={() => toggleReviewForm(productoId)}
            className="px-4 custom-text flex items-center justify-center  h-8 bg-teal-500 hover:bg-teal-800 text-white w-[60%] py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2"
          >
            Agregar comentario
          </button>
          {openReviewFormProductId === productoId && (
            <ReviewForm
              productById={productoId}
              handleReviewSubmit={(reviewData) => handleReviewSubmit(reviewData, productoId)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const ProductItem = ({ productId }) => {
  const { data: productDetails } = useGetProductByIdQuery(productId);
  const productImage = productDetails?.image;

  return (
    <div className="flex items-center justify-center mb-2 flex-col" key={productId}>
      <Link className="flex flex-col items-center justify-center" href={`/Detail/${productId}`}>
      {productImage && (
        <Image src={productImage} alt="Producto" width={100} height={100} />
        )}
      <p>{productDetails?.title}</p>
      <p className="text-sm text-bggris">{productDetails?.category.name}</p>
      </Link>
    </div>
  );
};

export default HistoryProduct;
