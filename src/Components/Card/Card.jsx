import style from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
//import AddToCart from "../Cart/AddToCart/AddToCart";

export default function Card({
  id,
  title,
  price,
  images

}) {
  return (

    <div className={`bg-white-500 `} >
      <Link href={`/Detail/${id}`}>
        <div className={style.content__img}>
          <Image
            className={style.img}
            src={images}
            alt=""
            width={200}
            height={300}
          />
        </div>
        <h3 className="text-bggris items-center text-center ">Ref: {id}</h3>
        <div className="flex justify-between w-48">
          <h2 className="text-center text-black hover:scale-110 items-center">{title}</h2>
        </div>
        <h3 className=" text-bgpriceRed items-center text-center ">Precio: {price} U$</h3>

        <button className="bg-primary text-white p-3 rounded-lg mx-auto 
                        flex justify-center items-center text-center hover:bg-bgred
                      hover:text-white transition duration-300">
          Detalles
        </button>
      </Link>
    </div>

  )
}