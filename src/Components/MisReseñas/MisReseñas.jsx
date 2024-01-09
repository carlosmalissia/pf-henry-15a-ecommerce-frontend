"use client";
import {useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useGetUserReviewsQuery } from '@/redux/services/usersApi';
import Image from "next/image";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import ReviewsPagination from '../ReviewsPagination/ReviewsPagination';



const ReviewUsuario = () => {
  const userData = useAppSelector((state) => state.loginReducer.user);
  const userId = userData?._id;
  const name = userData?.name;

  const { data: reviews, error, isLoading } = useGetUserReviewsQuery(userId);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    if (error) {
      console.error('Error al cargar las reviews:', error);
    }
  }, [error]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!reviews || reviews.length === 0) {
    return <p>No hay reviews para este usuario.</p>;
  }

  return (
    <div className="bg-gray-100 p-2 rounded-md shadow-md min-h-screen">
      <h2 className="text-lg font-bold mb-2">Reviews de {name}</h2>
      <div className="flex flex-wrap -mx-2">
        {currentReviews.map((review) => {
          const productId = review.product;

          return (
            <div key={review._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 p-2">
              <ProductReview productId={productId} review={review} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-4">
        <ReviewsPagination
          productsPerPage={productsPerPage}
          totalProducts={reviews.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const ProductReview = ({ productId, review }) => {
  // Obtener los detalles del producto por su ID
  const { data: productDetails } = useGetProductByIdQuery(productId);

  // Renderizar la imagen del producto si existe
  const productImage = productDetails?.image;

  return (
    <div className="border rounded-md bg-white p-2 h-full shadow-xl">
      <div className="text-m mb-1 font-serif font-bold">Producto</div>
      <div className="flex items-center justify-center mb-2">
        {productImage && <Image src={productImage} alt="Producto" width={100} height={100} />}
      </div>
      <div className="text-sm mb-1 pb-1 font-semibold mt-8">Calificación: {review.rating}</div>
      <div className="text-sm mb-1 pb-1 font-semibold">Comentario: {review.comment}</div>
    </div>
  );
};

export default ReviewUsuario;