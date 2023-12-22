import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req, res) {
  //const cartData = await req.json()
  //console.log(cartData)
  const request = new paypal.orders.OrdersCreateRequest();
  //request.prefer("return=representation");

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "200",
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: "200"
            }
          }
        },

        items: [
          {
            name: "remera",
            description: "pilcha",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "150"
            }
          },
          {
            name: "remera",
            description: "pilcha",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "50"
            }
          }

        ]
      }

    ]
  })
  const response = await client.execute(request)
  console.log(response);
  return NextResponse.json({ id: response.result.id });

}

function calculateTotal(cartData) {
  let total = 0;
  for (const item of cartData) {
    total += item.subtotal;
  }
  console.log("Total Calculado:", total.toFixed(2));
  return total.toFixed(2);
}

