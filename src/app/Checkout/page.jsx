"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartData } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios'
import { cleanCart } from "@/redux/features/cart";
import { useNewPurchaseMutation } from "@/redux/services/purchaseHistoryApi"
import { ToastContainer, toast } from "react-toastify";


const Page = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const userId = useAppSelector((state) => state.loginReducer.user);
  const userToken = useAppSelector((state) => state.loginReducer.token);
  const dispatch = useAppDispatch();

  const [createPurchase] = useNewPurchaseMutation()


  useEffect(() => {
    // Llama a getCartData al cargar el componente para asegurarte de que cartItems se haya actualizado
    dispatch(getCartData());
  }, [dispatch]);

  const count = cartItems.reduce((total, item) => total + item.quantity, 0);

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2);
    return total
  };
  const totalPay = calculateTotal()
  console.log("CartItems:", cartItems);

  const handleCreateOrder = async () => {
    try {
      // Asegúrate de que cartItems se haya actualizado antes de realizar la solicitud
      await dispatch(getCartData());

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
        return orderData.cartData.id;

      } else {
        const errorText = await response.text();
        console.error(
          "Error en la solicitud al backend:",
          response.status,
          errorText
        );
        throw new Error(`Error en la solicitud al backend: ${response.status}`);
      }
    } catch (error) {
      console.error("Error al procesar la respuesta del backend:", error);
      // Manejar el error y posiblemente mostrar un mensaje al usuario
    }
  };


  //? Purchase History

  let cartItemsId = [];

  cartItems.forEach((product) => {
    for (let i = 0; i < product.quantity; i++) {
      cartItemsId.push(product._id);
    }
  });

  const purchase = {
    user: userId,
    product: cartItemsId
  }

  const handlePurchase = async () => {
    try {
      const config = {
        purchase: purchase,
        token: userToken
      }

      const { data, error } = await createPurchase(config)
      console.log("Respuesta del backend:", data);
      console.log("ver email", userId);

    } catch (error) {
      console.error("Error al procesar la respuesta del backend:", error);
    }
  }

  //envio de mail de compras
  const sendEmail = async () => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cartItems,
          userId: userId,
          totalPay: totalPay
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      toast.success('Your email message has been sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('An error occurred while sending the email. Please try again.');
    }
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
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: totalPay,
                                  breakdown: {
                                    item_total: {
                                      currency_code: "USD",
                                      value: totalPay
                                    }
                                  }
                                },
                                items: cartItems.map((item) => ({
                                  name: item.title,
                                  description: item.description,
                                  unit_amount: {
                                    currency_code: "USD",
                                    value: parseFloat(item.price.toFixed(2)),
                                  },
                                  quantity: item.quantity.toString(),
                                  amount: {
                                    currency_code: "USD",
                                    value: parseFloat(item.subtotal),
                                  },
                                })),
                              },
                            ],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          const order = await actions.order?.capture()
                          console.log("order: ", order);
                          // await handlePurchase();
                          await sendEmail()
                          /* dispatch(cleanCart()); */
                        }}
                        onCancel={() => {
                          console.log("compra cancelada");
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
  
      <ToastContainer
                theme="colored"
                position="top-center"
                autoClose={2000}
              />
      {/* cierre del div contenedor     */}

    </div>
  );
};

export default Page

