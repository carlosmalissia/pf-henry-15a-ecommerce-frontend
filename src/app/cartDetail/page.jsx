"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData, removeItem } from '@/redux/features/cart';
import { useAppDispatch } from '@/redux/hooks';
import { headers } from '../../../next.config';

const CartDetailPage = () => {

    const dispatch = useAppDispatch();
    const cartItems = useSelector((state) => state.cartReducer.cartItems);
    const cartData  = useSelector((state) => state.cartReducer.cartData );
  
    
    
    useEffect(() => {
        // // Cargar datos del carrito desde localStorage
        dispatch(getCartData());
    },[])

    const handleRemoveItem = (_id) => {
        dispatch(removeItem( _id))
      };

      const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
      console.log("el total es", total )
      
    return (
        <div className='p-20 '>
        <header className='p-5 flex justify-center items-center text-center'>
            <h1 className="text-lg text-black">Detalle del Carrito</h1>
        </header>
        <div className="bg-bggris2 mx-auto mt-8 w-80 md:w-4/5 p-4 rounded-lg shadow-md md:mb-8">
          {cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item._id} className="bg-white border p-4 rounded-md">
                  <h2>{item.title}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Subtotal: {item.subtotal}</p>
                  <button onClick={() => handleRemoveItem(item._id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">El carrito está vacío.</p>
          )}
          <spam className='text-bgred text-end'>Total: {total}</spam>
        </div>

        {/* cierre del contenedor principal */}
        </div>

      );
  };

export default CartDetailPage;