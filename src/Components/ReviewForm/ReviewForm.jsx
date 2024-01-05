import React, { useState } from 'react';
import { Rating } from '@material-tailwind/react';

const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();0
    onReviewSubmit({ rating, comment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
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
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Comentario:</label>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="w-full h-32 px-3 py-2 border rounded-md focus:border-sky-500"
          placeholder="Escribe un comentario..."
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-bgred text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
      >
        Enviar comentario
      </button>
    </form>
  );
};

export default ReviewForm;
