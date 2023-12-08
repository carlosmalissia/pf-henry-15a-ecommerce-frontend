import Image from "next/image";
import styles from "./favorites.module.css";
import "remixicon/fonts/remixicon.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import Card from "../Card/Card";



export default function Popular() {
  const [product, setProduct] = useState([]); //estado para productos

  const getProduct = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      console.log(response.data)
      setProduct(response.data)

    }
    catch (error) {
      throw new Error(error);
    }
  }
  useEffect(() => {
    getProduct();

  }, []);
  /* const filter = attraction.sort((a, b) => {
    if(a.ranking > b.ranking) {
        return 1;
    }
    if(b.ranking > a.ranking) {
        return -1;
    }
    return 0;
    }) */

  return (
    <>
      <h2 className="items-center text-center text-2xl">
        Los mas votados por nuestros clientes <i className="ri-arrow-right-line" />
      </h2>
      <div
        className={`${styles.popular__container} ${styles.container} ${styles.grid}`}
      >
        {product.slice(0, 3).map((e) => {
          return (
            <Card className="border border-bgred rounded-md p-4"
                key={e.id}
                id={e.id}
                image={e.image}
                title={e.title}
                price={e.price}
                category={e.category}
              />
          );
        })}
      </div>
    </>
  );
}
