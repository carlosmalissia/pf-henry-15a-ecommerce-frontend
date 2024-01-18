import { Resend } from "resend"
import { NotificacionCompras } from "@/Components/NotificacionCompras/NotificacionCompras"
import { NextResponse } from "next/server";

const resend = new Resend('re_EbnCFi5q_LvFmyokUZPwat9uS3TyLn1b5')

export async function POST(req, res) {
    const { cartItems } = await req.body
    console.log("cartItemsBody", cartItems)
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['musicarlos72@gmail.com'],
            subject: "Esta es tu factura, gracias por tu compra",
            react: NotificacionCompras({ firstName: "Carlos", cartItems: cartItems })
        })
        console.log("data: ", data);
        return NextResponse.json({ message: "Email send", data }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error" }, { status: 500 })
    }
}