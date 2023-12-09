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
      const response = await axios.get(`https://pf-15a.up.railway.app/api/product`);
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
      <div className="flex">
        <div className="border-solid border border-gray-300 w-1/4 mt-20">
          <h2 className="text-center text-xl ">Filtros</h2>
          <div className="flex-col h-48 ml-14 mt-8">
            <select
              name="category"
              id=""
              /* onChange={handleChange} */
              className="bg-gray-300 border-solid border border-gray-300 rounded-md text-gray-300 text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 mt-2 mb-20 w-[200px]"
            >
              <option value="">Categorias</option>
              <option value="A">Ropa de hombre</option>
              <option value="D">Ropa de mujer</option>
              <option value="RA">Joyería</option>

            </select>

            <select
              id="priceRange"
              name="priceRange"
              /* onChange={handleChange} */
              className="bg-gray-300 border border-solid border border-gray-300 rounded-md text-black text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 mt-2 mb-20 w-[200px]"
              defaultValue={"selectPlease"}
            >
              <option value="selectPlease">Rango de precios</option>
              <option value="R1">De 0-200</option>
              <option value="R2">De 200-500</option>
              <option value="R3">Más de 500</option>
            </select>
            <select
              name="order"
              id=""
              /* onChange={handleChange} */
              className="bg-gray-300 border-solid border border-gray-300 rounded-md text-gray-300 text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500  w-[200px]"
            >
              <option value="">Orden</option>
              <option value="A">A-Z</option>
              <option value="D">Z-A</option>
              <option value="RA">Ranking Asc.</option>
              <option value="RD">Ranking Desc.</option>
              <option value="PA">Precio Asc.</option>
              <option value="PD">Precio Desc.</option>
            </select>
          </div>
        </div>
        <div className="w-3/4">
          <div
            className={`${styles.explore__content} ${styles.contaimer} ${styles.grid}`}
          >

            <div className="flex justify-center gap-16 items-center my-6">
              <h2 className="text-center text-2xl">
                Productos <i className="ri-arrow-right-line" />
              </h2>
              <div>
                <input
                  type="search"
                  placeholder="Buscar..."
                  className="bg-white-500 w-full border-solid border border-gray-300 rounded-md w-[15em] h-[2em] text-center"
                /* onChange={onQueryChanged} */
                />
                <span className="bg-white-500 backdrop-blur-xl -ml-8 pt-[6px] pb-[7px] opacity-80 color-white pr-1 pl-1">
                  <i className="ri-search-2-line" />
                </span>

              </div>
            </div>
          </div>
          <div className="">
            <Cards data={product} />
          </div>
        </div>
      </div>
    </div>
  );
}