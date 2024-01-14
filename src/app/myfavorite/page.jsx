  "use client"
 import React from 'react';

import Card from '@/Components/Card/Card';
import{useGetProductByTitleQuery, useGetProductByIdQuery } from "@/redux/services/productApi";
import { useGetUserByIdQuery } from '@/redux/services/usersApi.js';
import { useAppSelector } from '@/redux/hooks.js';

export default function FavoritesList (){
 
const userId = useAppSelector((state) => state.loginReducer.user);
const _id =userId?._id
const{ data: user, error: userError } = useGetUserByIdQuery(_id);
const favoritos = user?.favorites || [];


  return (
    <div className={`grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:w-[70vw] lg:w-[60vw]   mx-auto justify-end`}>
      <h2>Favorites</h2>
      { favoritos.length > 0 ? (favoritos.map((productId) => (        
          
          <ProductCard 
          key={productId} productId={productId}
          /> 
          
          ))): (
            <p> NO HAY PRODUCTOS EN FAVORITOS</p>
          )
}

          </div>
)
};
  
const ProductCard= ({productId})=>{
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);


  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar el producto: {error.message}</p>;
  }

  // Renderiza la Card con los detalles del producto
  return (
    <div>
      <Card 
        _id={product._id}
        image={product.image}
        title={product.title}
        price={product.price}
        category={product.category?.name}
        
        // Agrega más propiedades según tu estructura de datos
      />
    </div>
  );
};
