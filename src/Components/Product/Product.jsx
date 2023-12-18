import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./product.module.css";
import Cards from "../Cards/Cards";
import Searchbar from "../searchbar/searchbar";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import axios from 'axios'
import {
  useGetProductByPageQuery,
  useGetProductByTitleQuery,
  useGetProductByFilterAndPageQuery,
} from "@/redux/services/productApi";
import { useDispatch } from "react-redux";
import { pageone } from '@/redux/features/countPageSlice'

export default function Product() {
  const actualPage = useAppSelector((state) => state.countPageReducer.page);
  const pageSize = useAppSelector((state) => state.countPageReducer.pageSize);
  const dispatch = useAppDispatch()


  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useGetProductByTitleQuery(
    {
      productTitle: searchTerm,
      pageSize: pageSize,
      actualPage: actualPage
    },
    {
      skip: searchTerm.length === 0,
      onError: (error) => {
        console.error("Error en la búsqueda:", error);
      },
    }
  );

  /* const { data, error, isLoading, isFetching } = useGetProductByPageQuery({
    pageSize,
    actualPage,
  });
 */
  const [product, setProduct] = useState([]); //estado para los productos
  /*Estado para los select*/
  const [select, setSelect] = useState({
    category: "",
    price: "",
    rating: "",
  })
  //trayendo los select seleccionados
  const handleChange = (e) => {
    let newState = {
      ...select,
      [e.target.name]: e.target.value,
    };
    // console.log(newState);
    setSelect(newState);
  };

  const category = select.category
  const price = select.price
  const rating = select.rating
  const minprice = 100
  const maxprice = 500
  /*Peticion pe productos al back */
  // console.log("categoria: " + select.category, " precio: " + select.price, " rating: " + select.rating);
  const getProduct = async () => {
    try {
      const response = await axios
        .get(`https://pf-15a.up.railway.app/api/filter?itemsperpage=${pageSize}&actualpage=${actualPage}&category=${category}&price=${price}&rating=${rating}&minprice=${minprice}$maxprice=${maxprice}`);
      // console.log(response.data)
      setProduct(response.data)
    }

    catch (error) {
      throw new Error(error);
    }
  }
  useEffect(() => {
    getProduct();
    // console.log(product)
  }, [actualPage, select]);
  // console.log(select.category, select.price, select.rating);

  const handlesearchName = (e) => {
    dispatch(pageone())
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Cuando cambia actualPage, se vuelve a cargar la página actual
    // Puedes realizar otras acciones aquí si es necesario
  }, []);

  // console.log(searchData?.pageSize , searchData?.actualPage)

  /*  */
  return (
    <div className={styles.explore__container}>
      <div className="flex">
        <div className="border-solid border border-gray-300 w-1/4 mt-20">
          <h2 className="text-center text-xl ">Filtros</h2>
          <div className="flex-col h-48 ml-10 mt-8">
            <select
              name="category"
              id=""
              onChange={handleChange}
              className="block p-2 m-3 w-[200px] text-center rounded-lg text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="">Categorias</option>
              <option value="ropa hombre">Ropa de hombre</option>
              <option value="ropa mujer">Ropa de mujer</option>
              <option value="joyeria">Joyería</option>
            </select>

            <select
              name="price"
              id=""
              onChange={handleChange}
              className="block p-2 m-3 w-[200px] text-center rounded-lg text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="">Price</option>
              <option value="asc">Precio Asc.</option>
              <option value="des">Precio Desc.</option>
              <option value="range">Rango de precio</option>
            </select>

            {/* <select
              id="priceRange"
              name="priceRange"
              onChange={handleChange}
              className="bg-gray-300 border-solid border border-gray-300  text-black text-sm text-center rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 mt-2 mb-20 w-[200px]"
              defaultValue={"selectPlease"}
            >
              <option value="selectPlease">Rango de precios</option>
              <option value="R1">De 0-200</option>
              <option value="R2">De 200-500</option>
              <option value="R3">Más de 500</option>
            </select>*/}

            <select
              name="rating"
              id=""
              onChange={handleChange}
              className="block p-2 m-3 w-[200px] text-center rounded-lg text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="">Rating</option>
              <option value="asc">Ranking Asc.</option>
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
                {searchData && searchData.products.length > 0 ? (
                  <Cards
                    data={searchData?.products}
                    pageSize={pageSize}
                    pageAmount={searchData?.totalPages}
                  />
                ) : (
                  !searchTerm && (
                    <Cards
                      data={product?.products} // Mostrar todos los productos
                      pageSize={pageSize}
                      pageAmount={product?.totalPages}
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