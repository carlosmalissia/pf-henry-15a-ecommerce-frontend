"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData, removeItem, updateQuantity } from "@/redux/features/cart";
import { useAppDispatch } from "@/redux/hooks";

const CartDetailPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  useEffect(() => {
    // Cargar datos del carrito desde localStorage
    dispatch(getCartData());
  }, []);

  const handleRemoveItem = (_id) => {
    dispatch(removeItem({ _id }));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (!isNaN(newQuantity) && newQuantity > 0) {
      dispatch(updateQuantity({ itemId, newQuantity }));
    }
  };

  const count = cartItems.reduce((total, item) => total + item.quantity, 0);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2);
  };

  return (
    <div className="p-14 font-bold" >
      <fieldset className="border  p-4 rounded-md " >
        <legend className="text-2xl p-8 text-start font-bold text-bgred ">
          Detalle del Carrito
        </legend>
        <div className=" flex p-4 -mt-8 rounded-lg shadow-md">
          {cartItems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 mr-4"></th>
                  <th className="text-left p-2">Producto</th>
                  <th className="text-left p-2">Precio</th>
                  <th className="text-left p-2">Cantidad</th>
                  <th className="text-left p-2">Subtotal</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b text-sm">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-contain w-20 h-20 mr-4"
                      />
                    </td>
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">${item.price}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value)
                          )
                        }
                        max={item.stock}
                        className="w-16 p-1 text-center border"
                      />
                    </td>
                    <td className="p-2 font-bold text-bgred">
                     ${item.subtotal.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <button onClick={() => handleRemoveItem(item._id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">El carrito está vacío.</p>
          )}
          <div className="flex justify-end m-2 p-4 max-h-80">
            <fieldset className="border border-bggris  p-4 rounded-md">
              <legend className="text-base  text-start font-bold text-bgred p-4">
                Resumen del Carrito
              </legend>
              <div className="flex justify-end  overflow-auto">
                <div className=" flex-col">
                  <p>
                    Cant. de productos:
                    <span className="text-bgred ml-2">{count}</span>
                  </p>
                  <br />
                  <hr />
                  <br />
                  <p className=" text-xl flex text-start ">
                    Total:
                    <span className="text-bgred  ml-2 flex justify-end text-end">
                    $ {calculateTotal()}
                    </span>
                  </p>
                  <br />
                  <button
                    className="bg-bgbotones text-white text-base py-2 px-10 rounded-lg mx-2 
                flex justify-center items-center text-center whitespace-nowrap hover:bg-bgred hover:text-white"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </fieldset>

      {/* cierre del contenedor principal */}
    </div>
  );
};

export default CartDetailPage;
