"use client";
import Image from "next/image";
import styles from "./product.module.css";
import Cards from "@/components/Cards/Cards";
import { useState } from 'react'
import { useAppSelector } from "@/redux/hooks";
import {
  useGetProductByPageQuery,
  useGetProductByTitleQuery,
  useGetProductByFilterAndPageQuery
} from "@/redux/services/productApi";

export default function Product() {

  const actualPage = useAppSelector((state) => state.countPageReducer.page); // contador para paginado
  const pageSize = 12; // pageSize cantidad de cards x pagina


  /* Estado de los select */
  const [select, setSelect] = useState({
    category: "",
    priceRange: "",
    rating: "",
    price: ""
  });

  const { data, error, isLoading, isFetching } = useGetProductByPageQuery({
    pageSize,
    actualPage
  }
  )


  console.log(data?.products)

  if (isLoading || isFetching) return <p>Loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  // SearchBar filtro por title, busqueda parcial por letras de coincidencia

  /* const debounceRef = useRef();

  const onQueryChanged = (e) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    const productTitle = e.target.value;
    debounceRef.current = setTimeout(() => {
      const { data, error, isLoading, isFetching } = useGetProductByTitleQuery({
        productTitle,
      });
      if (isLoading || isFetching) return <p>Loading....</p>;
      if (error) return <p>Some error</p>;
      //setProduct(data)

    }, 1000);
  } */

  /* Fitros por categoria, rango de precio y orden */
  //Trajendo los stados de los selects
  /*  */
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
              className="bg-gray-300 border-solid border border-gray-300  text-gray-300 text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 mt-2 mb-20 w-[200px]"
            >
              <option value="">Categorias</option>
              <option value="ropa hombre">Ropa de hombre</option>
              <option value="ropa mujer">Ropa de mujer</option>
              <option value="joyeria">Joyería</option>
            </select>

            <select
              name="price"
              id=""
              /* onChange={handleChange} */
              className="bg-gray-300 border-solid border border-gray-300 rounded-md text-gray-300 text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 mb-20 w-[200px]"
            >
              <option value="">Price</option>
              <option value="as">Precio Asc.</option>
              <option value="des">Precio Desc.</option>
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
              name="rating"
              id=""
              /* onChange={handleChange} */
              className="bg-gray-300 border-solid border border-gray-300 rounded-md text-gray-300 text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500  w-[200px]"
            >
              <option value="">Rating</option>
              <option value="as">Ranking Asc.</option>
              <option value="des">Ranking Desc.</option>
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
                  className="bg-white-500  border-solid border border-gray-300 rounded-md w-[15em] h-[2em] text-center"


                /* onChange={onQueryChanged} */

                />
                <span className="bg-white-500 backdrop-blur-xl -ml-8 pt-[6px] pb-[7px] opacity-80 color-white pr-1 pl-1">
                  <i className="ri-search-2-line" />
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <Cards
              data={data?.products}
              pageSize={pageSize}
              pageAmount={data.totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
