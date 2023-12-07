import Image from "next/image";
import styles from "./favorites.module.css";
import "remixicon/fonts/remixicon.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';


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
      <h2 className="text-center text-2xl">
        Los mas votados por nuestros clientes <i className="ri-arrow-right-line" />
      </h2>
      <div
        className={`${styles.popular__container} ${styles.container} ${styles.grid}`}
      >
        {product.slice(0, 3).map((e) => {
          return (
            <article key={e.id} className={styles.popular__card}>
              <Link href={`/Detail/${e.id}`}>
                <div className="relative mb-[1rem] overflow-hidden w-full h-[240px] hover:scale-105 transition-all duration-300 ease-in-out">
                  <Image
                    src={e.image}
                    layout="fill"
                    alt="popular image"
                    className={styles.popular__img}
                  />
                  <div className={styles.popular__shadow} />
                </div>
              </Link>
              <h2 className={styles.popular__title}>{e.title}</h2>
              <div className={styles.popular__location}>

                <div className="flex justify-around">

                  <span className="ml-12">
                    Precio: {e.price} U$
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
