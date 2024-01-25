import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetProductByPageQuery } from "@/redux/services/productApi";


const Searchbar = ({ handlesearchName, category }) => {
  const actualPage = useAppSelector((state) => state.countPageReducer.page);
  const pageSize = useAppSelector((state) => state.countPageReducer.pageSize);

  const fetchProducts = () => {
    try {
      useGetProductByPageQuery({
        pageSize,
        actualPage,
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      // Aquí puedes realizar acciones adicionales para manejar el error, como mostrar un mensaje de error en la interfaz de usuario.
    }
  };

  return (
    <div className="flex flex-col items-center max-sm:flex-row max-sm:items-start">
       <h2 className="mt-12 text-3xl font-custom">
        Productos 
      </h2>
        {/* {category && <i className="ri-arrow-right-line" />} */}
      {/* {category && <h2 className="mt-2 text-2xl">{category}</h2>} */}
  
      <div className="mt-8 max-sm:ml-4 max-sm:text-center max-sm:w-full">
        <form className="flex items-center">
          <input
            onChange={handlesearchName}
            type="search"
            placeholder="Buscar..."
            className="bg-white-500 border-solid border border-gray-300 rounded-md w-[15em] h-[2em] text-center"
          />
          <button
            className="ml-2 bg-primary p-2 text-white rounded-lg"
            onClick={fetchProducts}
          >
            <i className="ri-refresh-line mr-2" />
            Recargar productos
          </button>
        </form>
      </div>
    </div>
  );
};
export default Searchbar;
