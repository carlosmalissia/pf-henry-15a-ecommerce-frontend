import Image from "next/image";
import styles from "./favorites.module.css";
import "remixicon/fonts/remixicon.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import Card from "../Card/Card";
import { FaStar } from "react-icons/fa";

export default function Popular() {
  const [products, setProducts] = useState([]);

  const getTopRatedProducts = async () => {
    try {
      const response = await axios.get('https://pf-15a.up.railway.app/api/product/top/3');
      setProducts(response.data);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    getTopRatedProducts();
  }, []);

  return (
    <>
      <h2 className="items-center text-center text-2xl">
        Los más votados por nuestros clientes <i className="ri-arrow-right-line" />
      </h2>
      <div
        className={`${styles.popular__container} ${styles.container} ${styles.grid}`}
      >
        {products.map((product) => (
          console.log("averageRating:", product.averageRating),
          <Card
            className="border border-bgred rounded-md p-4"
            key={product._id}
            _id={product._id}
            image={product.image}
            title={product.title}
            rating={product.averageRating}
            price={product.price}
           
          >
            {/* Mostrar número de estrellas */}
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 pr-1">
                {[...Array(Math.round(product.averageRating))].map((star, index) => (
                  <FaStar key={index} />
                ))}
              </span>
              <span className="text-red-500">{Math.round(product.averageRating)} estrellas</span>
            </div>

            {/* Mostrar opiniones individuales si están disponibles */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-semibold">Opiniones:</h3>
                <ul className="list-disc pl-5">
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <span className="text-yellow-500 pr-1">
                        {[...Array(review.rating)].map((star, index) => (
                          <FaStar key={index} />
                        ))}
                      </span>
                      {review.comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}