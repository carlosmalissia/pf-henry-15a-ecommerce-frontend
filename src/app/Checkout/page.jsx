"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartData } from "@/redux/features/cart";
import { useAppDispatch } from "@/redux/hooks";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const page = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartData());
  });

  const count = cartItems.reduce((total, item) => total + item.quantity, 0);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2);
  };

  return (
    <div className="p-14 font-bold">
      <fieldset className="border  p-4 rounded-md ">
        <legend className="text-2xl p-8 text-start font-bold text-bgred ">
          Checkout
        </legend>
        <div className=" flex p-4 -mt-8 rounded-lg shadow-md">
          {cartItems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 mr-4"></th>
                  <th className="text-left p-2">Producto</th>
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
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2 font-bold text-bgred">
                      ${item.subtotal.toFixed(2)}
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
                  <div className="m-4 text-xl">
                    <PayPalScriptProvider
                      options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                      }}
                    >
                      <PayPalButtons
                        className="m-4"
                        style={{
                          layout: "horizontal",
                          label: "pay",
                          shape: "rect",
                          height: 40,
                        }}
                        createOrder={async () => {
                          try {
                            const response = await fetch("/api/Checkout", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ cartData: cartItems }),
                            });

                            if (response.ok) {
                              const orderData = await response.json();
                              console.log("Respuesta del backend:", orderData);

                              // Asegúrate de devolver el ID del pedido correctamente
                              return orderData.id; // Esto debería ser el ID correcto del pedido
                            } else {
                              const errorText = await response.text();
                              console.error(
                                "Error en la solicitud al backend:",
                                response.status,
                                errorText
                              );
                              throw new Error(
                                `Error en la solicitud al backend: ${response.status}`
                              );
                            }
                          } catch (error) {
                            console.error(
                              "Error al procesar la respuesta del backend:",
                              error
                            );
                            // Manejar el error y posiblemente mostrar un mensaje al usuario
                          }
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </fieldset>

      {/* cierre del div contenedor     */}
    </div>
  );
};

export default page;
