"use client";
import { useEffect, useState } from "react";
import axios from 'axios';
import Image from "next/image";


export default function DetailID({ params }) {
  const { id } = params;
  const [productById, setProductById] = useState({
    id: 0,
    title: "",
    price: 0,
    images: [],
    description: ""
  })
  const getDatos = async () => {
    try {
      let res = await axios(`https://api.escuelajs.co/api/v1/products/${id}`);
      let datos = res.data;
      console.log(datos);
      if (!datos.title) {
        window.alert("No existe un detalle de este producto");
      } else {
        setProductById(datos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDatos();
  }, [id]);
  return (
    <div className="relative pt-20 mx-auto min-w-[20rem] w-[90%]">


      <div className="flex">
        <div className="flex gap-5 w-[90%] mx-auto justify-center my-2 mt-10">

          <h1 className="text-center text-2xl ">{productById.title}</h1>

        </div>
      </div>
      <div className="flex flex-col md:flex-row p-5 gap-5 justify-start">
        <div className="">
          <Image
            className="w-[100%]"
            src={productById.images[0]}
            alt={productById.title}
            width={450}
            height={500}
          />
        </div>
        <div className="w-[100%] my-10 md:my-0">
          <h2>{productById.description}</h2>
        </div>
      </div>

      <div className="flex justify-between flex-col items-center gap-5 md:flex-row md:w-[30rem] mb-10 mx-auto">

        <span> Precio: $ {productById.price} </span>

      </div>

    </div>
  );
}

