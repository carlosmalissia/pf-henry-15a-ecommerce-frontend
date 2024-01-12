"use client"

import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useGetUserReviewsQuery, useUpdateReviewMutation } from '@/redux/services/usersApi';
import Image from 'next/image';
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import {Rating} from '@material-tailwind/react';
import ReviewsPagination from '../ReviewsPagination/ReviewsPagination';

import { FaStar } from 'react-icons/fa';


const ReviewUsuario = () => {
  const userData = useAppSelector((state) => state.loginReducer.user);
  const userId = userData?._id;
  const userToken = useAppSelector((state) => state.loginReducer.token);
  const name = userData?.name;




  const { data: reviews, error, isLoading } = useGetUserReviewsQuery(userId);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const [updatedReviews, setUpdatedReviews] = useState([]);

  const [forceRefresh, setForceRefresh] = useState(false);

  const [triggerMutation, mutationState] = useUpdateReviewMutation();

  const handleSaveEdit = async (reviewId, editedComment, editedRating) => {
    try {
      const mutationResult = await triggerMutation({
        reviewId,
        updatedReview: {
          comment: editedComment,
          rating: editedRating,
        },
        userToken,
      });

      console.log('Resultado de la mutación:', mutationResult);

      if (mutationResult) {
        console.log('Edición guardada correctamente', mutationResult);

        /*      Actualiza localmente la lista de revisiones con la edición */
        const updatedReviewsCopy = reviews.map((review) =>
          review._id === reviewId ? { ...review, comment: editedComment } : review
        );

        /*   Actualiza el estado con las revisiones actualizadas */
        setUpdatedReviews(updatedReviewsCopy);

        /*  Forzar la actualización del estado */
        setForceRefresh(!forceRefresh);
      } else {
        console.error('Error al editar la reseña:', mutationResult.error);
      }
    } catch (error) {
      console.error('Error general al editar la reseña:', error);
    }

  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    console.error('Error al cargar las reviews:', error);
  }

  if (!reviews || reviews.length === 0) {
    return <p>No hay reviews para este usuario.</p>;
  }
  return (
    <div className="bg-gray-100 ml-2 p-8 rounded-md shadow-md min-h-screen">
      <h2 className="text-lg font-bold mb-2">Tus reviews {name}</h2>
      <div className="flex flex-wrap -mx-2">
        {currentReviews.map((review) => (
          <div key={review._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 p-2">
            <ProductReview
              productId={review.product}
              review={review}
              userToken={userToken}
              onSaveEdit={handleSaveEdit}
            />
          </div>
        ))}
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

const ProductReview = ({
  productId,
  review,
  onSaveEdit,
}) => {
  const { data: productDetails } = useGetProductByIdQuery(productId);
  const productImage = productDetails?.image;

  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [editedRating, setEditedRating] = useState(review.rating);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedComment(review.comment);
  };

  const handleSaveEditClick = () => {
    onSaveEdit(review._id, editedComment, editedRating);
    setEditMode(false);
  };

  return (
    <div className="border rounded-md bg-white p-2 h-full shadow-xl flex flex-col justify-between">
      <div>
        <div className="text-m mb-1 font-serif font-bold">Producto</div>
        <div className="flex items-center justify-center  mt-4">
          {productImage && <Image src={productImage} alt="Producto" width={75} height={75} className="w-[100px] h-[100px] " />}
        </div>
        {editMode && (
          <>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="w-full h-20 mb-2 p-2 border rounded-md"
            />
            <div className="flex items-center">
              <span className="text-m  font-semibold custom-text">Calificación:</span>
              <RatingStars
                rating={editedRating}
                onChange={(newRating) => setEditedRating(newRating)}
              />
            </div>
          </>
        )}
        {!editMode && (
          <><div className="text-m mb-1 pb-1 font-semibold mt-8 custom-text py-4 px-6">Calificación</div>
            <div className="flex items-center">
              
              <RatingStars rating={editedRating} readOnly />
            </div>
            <div className="text-m mb-1 pb-1 font-semibold mt-2 custom-text">Comentario: {editedComment}</div>
          </>
        )}
      </div>

      {editMode && (
        <button
          onClick={handleSaveEditClick}
          className="custom-text flex items-center justify-center w-full h-8 bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2"
        >
          Guardar Edición
        </button>
      )}
      {!editMode && (
        <button
          onClick={handleEditClick}
          className="custom-text flex items-center justify-center w-full h-8 bg-teal-500 hover:bg-teal-800 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2"
        >
          Editar Reseña
        </button>
      )}
    </div>
  );
};





const RatingStars = ({ rating, onChange, readOnly }) => {
  const handleClick = (newRating) => {
    if (!readOnly) {
      onChange(newRating);
    }
  };

  return (<>
    <div  className="flex items-center justify-center w-full">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
        key={star}
        className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'} text-xl`}
        onClick={() => handleClick(star)}
        />
        ))}

    </div>
    </>
  );
};

export default ReviewUsuario;