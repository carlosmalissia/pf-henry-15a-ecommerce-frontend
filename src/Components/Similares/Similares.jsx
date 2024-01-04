import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import Card from "../Card/Card";
import { Carousel, CarouselButton } from "@material-tailwind/react";

const Similares = ({ category, _id }) => {
  const actualPage = useAppSelector((state) => state.countPageReducer.page);
  const pageSize = useAppSelector((state) => state.countPageReducer.pageSize);

  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, [category, _id]);

  const getRandomIndex = (max) => Math.floor(Math.random() * max);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `https://pf-15a.up.railway.app/api/filter?itemsperpage=${pageSize}&actualpage=${actualPage}&category=${category}`
      );

      if (Array.isArray(response.data.products)) {
        const filteredProducts = response.data.products;

        if (filteredProducts.length >= 4) {
          const randomIndices = new Set();

          while (randomIndices.size < 5) {
            const randomIndex = getRandomIndex(filteredProducts.length);
            randomIndices.add(randomIndex);
          }

          const randomProducts = Array.from(randomIndices).map(
            (randomIndex) => filteredProducts[randomIndex]
          );

          const filteredSimilarProducts = randomProducts.filter(
            (product) => product._id !== _id
          );

          setSimilarProducts(filteredSimilarProducts);
        } else {
          console.error("No hay suficientes productos disponibles");
        }
      } else {
        console.error(
          "La propiedad 'products' no es un array:",
          response.data.products
        );
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  return (
    <section className="w-[85%] m-auto ">
      <h2 className="items-center text-center text-2xl w:[80%]">
        Productos Similares
      </h2>
      <div className={`flex flex-row w:[80%] p-10 m-10 -mt-8 gap-4`}>
       {similarProducts.map((e) => (
            <Card
              className="border rounded-md p-4"
              key={e._id}
              _id={e._id}
              image={e.image}
              title={e.title}
              price={e.price}
              rating={e.rating}
              category={e.category.name}
            />
          ))}
      </div>
    </section>
  );
};

export default Similares;
