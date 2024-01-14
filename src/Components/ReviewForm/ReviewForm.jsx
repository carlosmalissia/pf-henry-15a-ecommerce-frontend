import React, { useState } from 'react';
import { Rating } from '@material-tailwind/react';
import { useAppSelector } from '@/redux/hooks';
import { useNewReviewMutation } from '@/redux/services/reviewsApi';
import { ToastContainer } from 'react-toastify';


const ReviewForm = ({ handleReviewSubmit, productById }) => {
  const userId = useAppSelector((state) => state.loginReducer.user);
  const userToken = useAppSelector((state) => state.loginReducer.token);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const product = productById;

  console.log("este es el id del producto:", product);

  const user=userId;


  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewData = {
      user: user, 
      product: product,
      rating: rating, 
      comment: comment,  
    };
    handleReviewSubmit(reviewData);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-full mt-4'>
    <div className="mb-4 w-full">
      <label className="block text-lg font-medium text-gray-700">Rating:</label>
      <Rating
        value={rating}
        onChange={handleRatingChange}
        max={5}
        size="lg"
        color="amber"
        className='text-sm font-medium text-yellow-500'
      />
    </div>
    <div className="mb-4 w-full p-4">
      <label className="block text-lg font-medium text-gray-700">Comentario:</label>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        className="w-full h-20  p-4 border rounded-md"
        placeholder="Escribe un comentario..."
      ></textarea>
    </div>
    <button
      type="submit"
      className="bg-bgred text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex justify-center items-center w-full"
    >
      Enviar comentario
    </button>
  </form>
  

  );
};

export default ReviewForm;
