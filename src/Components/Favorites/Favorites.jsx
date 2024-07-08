import Image from "next/image";
import styles from "./favorites.module.css";
import "remixicon/fonts/remixicon.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import Card from "../Card/Card";
import { useGetAllProductQuery } from "@/redux/services/productApi";
import { data } from '../../../public/data'


export default function Popular() {
  const [product, setProduct] = useState([]); //estado para productos

  const getProduct = async () => {
    try {
      const response = await axios.get(`https://api-henrucci.onrender.com/api/product`);
      setProduct(response.data)
    }
    catch (error) {
      throw new Error(error);
    }
  }
  useEffect(() => {
    getProduct();

  }, []);
  const filter = product.sort((a, b) => {
    if (a.rating > b.rating) {
      return 1;
    }
    if (b.rating > a.rating) {
      return -1;
    }
    return 0;
  })
  //const filter = data.products
  return (
    <>
      <h2 className="items-center text-center text-2xl">
        Los mas votados por nuestros clientes <i className="ri-arrow-right-line" />
      </h2>
      <div
        className={`${styles.popular__container} ${styles.container} ${styles.grid}`}
      >
        {filter.slice(0, 3).map((e) => {
          return (
            <Card className="border border-bgred rounded-md p-4"
              key={e._id}
              _id={e._id}
              image={e.image}
              title={e.title}
              price={e.price}
              rating={e.rating}
            />
          );
        })}
      </div>
    </>
  );
}
