import style from "./Card.module.css";
import Image from "next/image";
//import Link from "next/link";
//import AddToCart from "../Cart/AddToCart/AddToCart";

export default  function Card({
  id,
  title,
  price, 
  images
  
})  {
  return (
    <div className={style.container} >
     <div className={style.content__img}>
            <Image
              className={style.img}
              src={images}
              alt=""
              width={200}
              height={300}
            />
          </div>             
    <h3 className="text-red-400">Ref: {id}</h3> 
    <div className="flex justify-between w-48">
        <h2 className="text-center text-white hover:scale-110">{title}</h2> 
    </div>
    <h3 className="text-base">Precio: {price} U$</h3>

  </div>
  )
}