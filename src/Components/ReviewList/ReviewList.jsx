import React, { useEffect, useState } from 'react';
import { Rating } from '@material-tailwind/react';

const ReviewList = ({ productById }) => {
  const [reviews, setReviews] = useState(productById.reviews);

  useEffect(() => {
    setReviews(productById.reviews);
  }, [productById.reviews]);

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-xl">
      <h2 className="text-2xl text-black text-center mb-4">
        Comentarios sobre el producto
      </h2>
      {reviews && reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="rounded-md text-lg">
              <p>Usuario: {review.user.name}</p>
              <p className="font-bold text-yellow-500">
                <Rating readonly value={review.rating} size="sm" />
              </p>
              <p>Comentario: {review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Este producto aún no tiene comentarios.</p>
      )}
    </div>
  );
};

export default ReviewList;
