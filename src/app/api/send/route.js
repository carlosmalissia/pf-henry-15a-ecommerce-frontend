import { Resend } from "resend";
import { NotificacionCompras } from "@/Components/NotificacionCompras/NotificacionCompras";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {

    const { cartItems, userId, totalPay } = await req.json();

    console.log(userId?.email)

    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [userId?.email],
            subject: "Esta es tu factura, gracias por tu compra",

            react: NotificacionCompras({ firstName: userId?.name, cartItems: cartItems, totalPay:totalPay })
        });
        console.log("data", data);
        return NextResponse.json({ message: "Email send", data }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: `Error sending email: ${error.message}` }, { status: 500 });
    }
}
