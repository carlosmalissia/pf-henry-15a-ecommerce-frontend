import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./product.module.css";
import Searchbar from "../searchbar/searchbar";
import Cards from "../Cards/Cards";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import {
  useGetProductByPageQuery,
  useGetProductByTitleQuery,
  useGetProductByFilterAndPageQuery,
} from "@/redux/services/productApi";
import { useDispatch } from "react-redux";
import { pageone } from "@/redux/features/countPageSlice";
import { getlogindata } from "@/redux/features/userSlice";
export default function Product() {
  const actualPage = useAppSelector((state) => state.countPageReducer.page);
  const pageSize = useAppSelector((state) => state.countPageReducer.pageSize);
  const dispatch = useAppDispatch();

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
      actualPage: actualPage,
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
  //Seleccion solo de rangos de precios
  const [selectRange, setSelectRange] = useState({
    minprice: "",
    maxprice: ""

  })
  const handleChangeRange = (e) => {
    if (e.target.value === "min") {
      setSelectRange({
        minprice: 0,
        maxprice: 40
      })
    } else if (e.target.value === "medium") {
      setSelectRange({
        minprice: 40,
        maxprice: 200
      })
    } else if (e.target.value === "max") {
      setSelectRange({
        minprice: 200,
        maxprice: 700
      })
    }

  }

  const category = select.category
  const price = select.price
  const rating = select.rating
  const minprice = selectRange.minprice
  const maxprice = selectRange.maxprice


  /*Peticion pe productos al back */
  // console.log("categoria: " + select.category, " precio: " + select.price, " rating: " + select.rating);
  const getProduct = async () => {
    try {


      const response = await axios
        .get(`https://pf-15a.up.railway.app/api/filter?itemsperpage=${pageSize}&actualpage=${actualPage}&category=${category}&rating=${rating}&price=${price}&minprice=${minprice}&maxprice=${maxprice}`);
      // console.log(response.data)
      setProduct(response.data)


    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    
    getProduct();
    // console.log(product)
  }, [actualPage, select, selectRange]);
  // console.log(select.category, select.price, select.rating);

  const handlesearchName = (e) => {
    dispatch(pageone());
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {

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
              name="rating"
              id=""
              onChange={handleChange}
              className="block p-2 m-3 w-[200px] text-center rounded-lg text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="">Rating</option>
              <option value="asc">Ranking Asc.</option>
              <option value="des">Ranking Desc.</option>
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
            {select.price === "range" && (

              <div className="">
                <div class="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                  <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                      class="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label htmlFor="vertical-list-react" class="flex items-center w-full px-3 py-2 cursor-pointer">
                        <div class="grid mr-3 place-items-center">
                          <div class="inline-flex items-center">
                            <label class="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="vertical-list-react">
                              <input name="vertical-list" id="vertical-list-react" type="radio"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-solid border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                value="min"
                                checked={selectRange.minprice === 0}
                                onChange={handleChangeRange}
                              />
                              <span
                                class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                              </span>
                            </label>
                          </div>
                        </div>
                        <p class="block font-sans text-sm antialiased font-medium leading-relaxed text-gray-400 bg-transparent">
                          De 0 a 40 $U
                        </p>
                      </label>
                    </div>
                    <div role="button"
                      class="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label htmlFor="vertical-list-vue" class="flex items-center w-full px-3 py-2 cursor-pointer">
                        <div class="grid mr-3 place-items-center">
                          <div class="inline-flex items-center">
                            <label class="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="vertical-list-vue">
                              <input name="vertical-list" id="vertical-list-vue" type="radio"
                                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-solid border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                value="medium"
                                checked={selectRange.minprice === 40}
                                onChange={handleChangeRange}
                              />
                              <span
                                class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                              </span>
                            </label>
                          </div>
                        </div>
                        <p class="block font-sans text-sm antialiased font-medium leading-relaxed text-gray-400 bg-transparent">
                          de 40 a 200 $U
                        </p>
                      </label>
                    </div>
                    <div role="button"
                      class="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label htmlFor="vertical-list-svelte" class="flex items-center w-full px-3 py-2 cursor-pointer">
                        <div class="grid mr-3 place-items-center">
                          <div class="inline-flex items-center">
                            <label class="relative flex items-center p-0 rounded-full cursor-pointer"
                              htmlFor="vertical-list-svelte">
                              <input name="vertical-list" id="vertical-list-svelte" type="radio"
                                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-solid border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                value="max"
                                checked={selectRange.minprice === 200}
                                onChange={handleChangeRange}
                              />
                              <span
                                class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                              </span>
                            </label>
                          </div>
                        </div>
                        <p class="block font-sans text-sm antialiased font-medium leading-relaxed text-gray-400 bg-transparent">
                          de 200 a 700 $U
                        </p>
                      </label>
                    </div>
                  </nav>


                </div>

              </div>
            )}

          </div>
        </div>
        <div className="w-3/4">
          <div
            className={`${styles.explore__content} ${styles.contaimer} ${styles.grid}`}
          >
            <div className="flex justify-center gap-16 items-center my-6">
              {select.category !== "" && (
                <p>Categoría: {select.category}</p>
              )}
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
