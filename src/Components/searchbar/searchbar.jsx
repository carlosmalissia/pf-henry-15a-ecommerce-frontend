import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetProductByPageQuery } from "@/redux/services/productApi";

const Searchbar = ({ handlesearchName }) => {
  const actualPage = useAppSelector((state) => state.countPageReducer.page);
  const pageSize = 12;

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
    <div>
      <h2 className="text-center text-2xl">
        Productos <i className="ri-arrow-right-line" />
      </h2>
      <div>
        <form>
          <input
            onChange={handlesearchName}
            type="search"
            placeholder="Buscar..."
            className="bg-white-500 border-solid border border-gray-300 rounded-md w-[15em] h-[2em] text-center"
          />
          <button className=" ml-6 bg-primary p-2 text-white rounded-lg" onClick={fetchProducts}>
          <i className="ri-refresh-line mr-2" /> 
            Recargar productos
          </button>
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
