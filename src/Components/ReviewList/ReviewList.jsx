import React, { useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";

const ReviewList = ({ productById }) => {
  const [reviews, setReviews] = useState(productById.reviews);

  useEffect(() => {
    setReviews(productById.reviews);
  }, [productById.reviews]);

  const formattedDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-xl">
      <h2 className="text-2xl text-black text-center mb-4">
        Comentarios sobre el producto
      </h2>
      {reviews && reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="rounded-md text-sm">
              <div className="flex gap-6 items-center ">
                <Rating
                  readonly
                  value={review.rating}
                  size="sm"
                  className="text-yellow-500"
                  />
                <p className="text-gray-600 flex items-center text-center" >{formattedDate(review.created)}</p>
              </div>
                  <p className="text-gray-600">{review.user.name}</p>

              <p className="text-gray-600"> {review.comment}</p>
              <br />
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
