import React, { useState, useEffect } from "react";
import Image from "next/image";
import Searchbar from "../searchbar/searchbar";
import Cards from "../Cards/Cards";
import Filtros from "../Filtros/Filtros"
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import { data } from '../../../public/data'
import {
  useGetProductByPageQuery,
  useGetProductByTitleQuery,
  useGetProductByFilterAndPageQuery,
} from "@/redux/services/productApi";
import { useDispatch } from "react-redux";
import { pageone } from "@/redux/features/countPageSlice";
import { getlogindata } from "@/redux/features/userSlice";
import Banner from "../Banner/Banner";

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

  const { data, error, isLoading, isFetching } = useGetProductByPageQuery({
    pageSize,
    actualPage,
  });

  const [product, setProduct] = useState([]); //estado para los productos
  /*Estado para los select*/
  const [select, setSelect] = useState({
    category: "",
    price: "",
    rating: "",

  })

  //trayendo los select seleccionados
  const handleChange = (e) => {
    dispatch(pageone());
    let newState = {
      ...select,
      [e.target.name]: e.target.value,
    };
    // console.log(newState);
    setSelect(newState);
  };
  //Seleccion solo de rangos de precios
  const [selectRange, setSelectRange] = useState({
    minprice: 0,
    maxprice: 5000000

  })
  const handleChangeRange = (e) => {
    dispatch(pageone());
    if (e.target.value === "min") {
      setSelectRange({
        minprice: 1,
        maxprice: 100
      })
    } else if (e.target.value === "medium") {
      setSelectRange({
        minprice: 100,
        maxprice: 50000
      })
    } else if (e.target.value === "max") {
      setSelectRange({
        minprice: 500,
        maxprice: 5000000
      })
    } else {
      setSelectRange({
        minprice: 0,
        maxprice: 5000000
      })
    }

  }

  const category = select.category
  const price = select.price
  const rating = select.rating
  const minprice = selectRange.minprice
  const maxprice = selectRange.maxprice


  /*Peticion de productos al back */
  // console.log("categoria: " + select.category, " precio: " + select.price, " rating: " + select.rating);

  //axios a futuro back 

  const getProduct = async () => {
    try {


      const response = await axios
        .get(`https://api-henrucci.onrender.com/api/filter?itemsperpage=${pageSize}&actualpage=${actualPage}&category=${category}&rating=${rating}&price=${price}&minprice=${minprice}&maxprice=${maxprice}`);


      //.get('https://api-henrucci.onrender.com/api/product')
      setProduct(response.data)
      console.log(response.data)
      console.log("pageSize", pageSize, "actualPage", actualPage, "category", category, "rating", rating, "price", price, "min", minprice, "max", maxprice)


    } catch (error) {
      throw new Error(error);
    }
  }

  // const product = data
  console.log('productos', product);
  useEffect(() => {

    getProduct();
    console.log(product)
  }, [actualPage, select, selectRange]);
  // console.log(select.category, select.price, select.rating);

  const handlesearchName = (e) => {
    dispatch(pageone());
    e.preventDefault();
    setSearchTerm(e.target.value);
  };



  // console.log(searchData?.pageSize , searchData?.actualPage)

  /*  */
  return (
    <div>
      <div className=" w-full">
        <Banner />
      </div>
      <div className="flex">
        <Filtros handleChange={handleChange} handleChangeRange={handleChangeRange} select={select} selectRange={selectRange} />
        <div className="w-3/4 max-lg:w-full">
          <div>
            <div className="flex justify-center gap-16 items-center my-5">

              <Searchbar handlesearchName={handlesearchName} category={select.category} />
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
                      //data={product}
                      pageSize={pageSize}
                      //pageAmount="1"
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
