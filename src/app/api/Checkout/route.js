import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req) {
  try {

    
    console.log("Request Body:", req.body);
    const cartData = await req.json();  
    console.log("Cart Data:", cartData);

    // Aquí debes construir la lógica para crear una orden de PayPal con múltiples artículos
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: calculateTotal(cartData.cartData),
          },
          items: Array.isArray(cartData.cartData) ? cartData.cartData.map((item) => ({
            name: item.title,
            description: item.description,
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
          })) : [],
        },
      ],
    });

    console.log("Request to PayPal:", request);

    const response = await client.execute(request);
    console.log("Response from PayPal:", response.result);

  
    return res.json({ id: response.result.id });

  } catch (error) {
    console.error(error);
    return NextResponse.error({ status: 500, body: 'Error en el proceso de pago' });
  }
}

function calculateTotal(cartData) {
  let total = 0;

  // Verifica si hay una propiedad 'cartData' en cartData
  if (cartData && Array.isArray(cartData)) {
    for (const item of cartData) {
      total += item.subtotal;
    }
    console.log("Total Calculado:", total.toFixed(2));
    return total.toFixed(2);
  } else {
    console.error("No se pudo encontrar la propiedad 'cartData' en cartData");
    return "0.00";
  }
}
