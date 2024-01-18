import * as React from 'react';


export const NotificacionCompras = ({
    firstName, cartItems, totalPay
}) => (

    <div>
        <h1>Gracias por tu compra, {firstName}!</h1>
        <h1>Me doy, la factura te la enviaremos por correo Argentino </h1>

        <div className="p-14 font-bold">
            <fieldset className="border  p-4 rounded-md ">
                <legend className="text-2xl p-8 text-start font-bold text-bgred ">
                    Factura Nº
                </legend>
                <div className=" flex p-4 -mt-8 rounded-lg shadow-md">
                    {cartItems.length > 0 ? (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-center p-2 mr-4"></th>
                                    <th className="text-center p-2">Producto</th>
                                    <th className="text-center p-2">Precio</th>
                                    <th className="text-center p-2">Cantidad</th>
                                    <th className="text-center p-2">Subtotal</th>
                                    <th className="p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item._id} className="border-b text-sm">
                                        <td className="p-2">
                                            <div className="underline font-bold ">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="object-contain w-20 h-20 mr-4"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">
                                            <p className="underline font-bold ">
                                                {item.title}
                                            </p>
                                        </td>
                                        <td className="p-2">${item.price}</td>
                                        <td className="p-2">
                                            <p>

                                                {item.quantity}

                                            </p>
                                        </td>
                                        <td className="p-2 font-bold text-bgred">
                                            ${item.subtotal.toFixed(2)}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600">
                            El carrito esta vacío.

                        </p>
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
                                        <span className="text-bgred ml-2">100</span>
                                    </p>
                                    <br />
                                    <hr />
                                    <br />
                                    <p className=" text-xl flex text-start ">
                                        Total:
                                        <span className="text-bgred  ml-2 flex justify-end text-end">
                                          {totalPay}
                                        </span>
                                    </p>
                                    <br />

                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </fieldset>


        </div>
        <button className="bg-sky-500 px-3 py-2">
            <a href="https://pf-henry-15a-ecommerce-frontend.vercel.app">Ir a Henrucci</a>
        </button>
    </div>
);