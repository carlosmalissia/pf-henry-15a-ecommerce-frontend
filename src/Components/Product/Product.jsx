import React, { useState, useEffect } from "react";
import Searchbar from "../searchbar/searchbar";
import Cards from "../Cards/Cards";
import Filtros from "../Filtros/Filtros";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import { useGetProductByPageQuery, useGetProductByTitleQuery } from "@/redux/services/productApi";
import { pageone } from "@/redux/features/countPageSlice";
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

 

  const [product, setProduct] = useState([]); 
  /*Estado para los select*/
  const [select, setSelect] = useState({
    category: "",
    price: "",
    rating: "",
  });

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
    maxprice: 5000,
  });
  const handleChangeRange = (e) => {
    dispatch(pageone());
    if (e.target.value === "min") {
      setSelectRange({
        minprice: 1,
        maxprice: 100,
      });
    } else if (e.target.value === "medium") {
      setSelectRange({
        minprice: 100,
        maxprice: 500,
      });
    } else if (e.target.value === "max") {
      setSelectRange({
        minprice: 500,
        maxprice: 5000,
      });
    } else {
      setSelectRange({
        minprice: 0,
        maxprice: 5000,
      });
    }
  };

  const category = select.category;
  const price = select.price;
  const rating = select.rating;
  const minprice = selectRange.minprice;
  const maxprice = selectRange.maxprice;

  /*Peticion pe productos al back */
  // console.log("categoria: " + select.category, " precio: " + select.price, " rating: " + select.rating);
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `https://pf-15a.up.railway.app/api/filter?itemsperpage=${pageSize}&actualpage=${actualPage}&category=${category}&rating=${rating}&price=${price}&minprice=${minprice}&maxprice=${maxprice}`
      );
      // console.log(response.data)
      setProduct(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

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

  // console.log(searchData?.pageSize , searchData?.actualPage)

  /*  */
  return (
    <div>
      <div className=" w-full">
        <Banner />
      </div>

      <div className="flex mt-10">
        <div className={`flex  w-1/4 flex-col`}>
          <div className="">
            <Searchbar
              handlesearchName={handlesearchName}
              category={select.category}
            />
          </div>
          <div>
          <Filtros
            handleChange={handleChange}
            handleChangeRange={handleChangeRange}
            select={select}
            selectRange={selectRange}
          />
          </div>
        </div>
        <div className="w-3/4 gap-4 ">
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
              {searchData && searchData.products.length === 0 && searchTerm && (
                <p className="text-center text-bgred text-xl">No hubo coincidencias.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
