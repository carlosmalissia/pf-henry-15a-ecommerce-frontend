import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetProductByPageQuery } from "@/redux/services/productApi";
import styles from './Searchbar.module.css';


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
    
       
        
  
      <div className={styles.container}>
        <form className={styles.form}>
          <input
            onChange={handlesearchName}
            type="search"
            placeholder="Buscar..."
            className={styles.input}
          />
          {/* <button
            className="ml-2 bg-primary p-2 text-white rounded-lg"
            onClick={fetchProducts}
          >
            <i className="ri-refresh-line mr-2" />
            Recargar productos
          </button> */}
        </form>
      </div>
  );
};
export default Searchbar;


