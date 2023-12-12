import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./product.module.css";
import Cards from "@/components/Cards/Cards";
import Searchbar from "../searchbar/searchbar";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetProductByPageQuery,
  useGetProductByTitleQuery,
  useGetProductByFilterAndPageQuery,
} from "@/redux/services/productApi";

export default function Product() {
  const actualPage = useAppSelector((state) => state.countPageReducer.page);
  const pageSize = 12;

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useGetProductByTitleQuery(
    { productTitle: searchTerm },
    {
      skip: searchTerm.length === 0,
      onError: (error) => {
        console.error("Error en la búsqueda:", error);
      },
    }
  );

  const { data, error, isLoading, isFetching } = useGetProductByPageQuery({
    pageSize,
    actualPage,
  });



  const handlesearchName = (e) => {

    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Cuando cambia actualPage, se vuelve a cargar la página actual
    // Puedes realizar otras acciones aquí si es necesario
  }, [actualPage]);


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
              className="bg-gray-300 border-solid border border-gray-300  text-gray-300 text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 mb-20 w-[200px]"
            >
              <option value="">Price</option>
              <option value="as">Precio Asc.</option>
              <option value="des">Precio Desc.</option>
            </select>

            <select
              id="priceRange"
              name="priceRange"
              /* onChange={handleChange} */
              className="bg-gray-300 border-solid border border-gray-300  text-black text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 mt-2 mb-20 w-[200px]"
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
              className="bg-gray-300 border-solid border border-gray-300  text-gray-300 text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500  w-[200px]"
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

              <Searchbar handlesearchName={handlesearchName} />

            </div>
          </div>
          <div className="">
            {searchLoading && <p>Buscando...</p>}
            {searchError && (
              <p>Error al realizar la búsqueda: {searchError.message}</p>
            )}
            {!searchLoading && !searchError && (
              <div>
                {searchData && searchData.length > 0 ? (
                  <Cards
                    data={searchData}
                    pageSize={pageSize}
                    pageAmount={searchData?.totalPages}
                  />
                ) : (
                  !searchTerm && (
                    <Cards
                      data={data?.products} // Mostrar todos los productos
                      pageSize={pageSize}
                      pageAmount={data?.totalPages}
                    />
                  )
                )}
                {searchData && searchData.length === 0 && searchTerm && (
                  <p>No se encontraron resultados.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}