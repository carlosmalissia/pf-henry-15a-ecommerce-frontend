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
    <div>
      <div className="flex justyfy-between ml-4 max-sm:justify-center">
        <h2 className="  text-center text-2xl mt-5">
          Productos <i className="ri-arrow-right-line" />
        </h2>
        {(category == "") ? <h2 className="text-xl mt-6 ml-1">Todos</h2> :
          (<h2 className="text-xl mt-1 ml-1">{category}</h2>)}


      </div>
      <div className="max-sm:text-center">
        <form>
          <input
            onChange={handlesearchName}
            type="search"
            placeholder="Buscar..."
            className="max-sm:ml-3 bg-white-500 border-solid border border-gray-300 rounded-md w-[15em] h-[2em] text-center"
          />
          <button className=" max-sm:ml-4 ml-6 bg-primary p-2 text-white rounded-lg" onClick={fetchProducts}>
            <i className="ri-refresh-line mr-2" />
            Recargar productos
          </button>
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
