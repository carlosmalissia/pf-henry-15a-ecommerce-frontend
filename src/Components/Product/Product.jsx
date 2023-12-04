"use client";
import Image from "next/image";
import styles from "./product.module.css";
import Cards from "@/components/Cards/Cards";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import axios from 'axios';

export default function Product() {
    const [product, setProduct] = useState([]); //estado para los productos
    const getProduct = async () => {
      try {
          const response = await axios.get(`https://api.escuelajs.co/api/v1/products`);
          console.log(response.data)
          setProduct(response.data)
          
      } 
      catch (error) {
          throw new Error(error);
      }
  }
  useEffect(() => {
    getProduct();
    console.log(product)
  }, []);
  return (
    <div className={styles.explore__container}>
      <div
        className={`${styles.explore__content} ${styles.contaimer} ${styles.grid}`}
      >
        
        <div className="flex justify-center gap-16 items-center my-6">
          <h2 className="text-center text-2xl">
            Productos <i className="ri-arrow-right-line" />
          </h2>
          </div>
      </div>
      <div>
        <Cards data={product} />
      </div>
    </div>
  );
}