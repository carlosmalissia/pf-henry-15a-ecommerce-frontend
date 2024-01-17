"use client";
import { useGetUserByIdQuery } from "@/redux/services/usersApi"
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import Image from "next/image";

const MisFavoritos = () => {
    const [favoritesId, setFavoritesId] = useState([])
    const userlog = useAppSelector((state) => state.loginReducer.user);
    const _id = userlog?._id;

    const getuserById = async () => {
        const userById = await axios(`https://pf-15a.up.railway.app/api/users/${_id}`)
        let datos = userById.data.favorites

        setFavoritesId(datos)
    }
    getuserById()

    if (!favoritesId || favoritesId.length === 0) {
        return (
            <div className="text-gray-500">
                No tienes productos favoritos seleccionados.
            </div>
        );
    }
    return (
        <div className="p-4  mx-auto w-full">
            <h2 className="text-2xl font-bold mb-4">Mis favoritos</h2>
            <div className=" border rounded-md bg-white p-2 h-full shadow-xl flex flex-wrap justify-center gap-4">
                <div className="text-m text-black font-serif py-2 px-4 rounded-lg shadow-m mb-4 "></div>
                {favoritesId.map((favoriteId) => (
                    <div
                        key={favoriteId}
                        className={`flex items-center justify-center mb-2 sm:w-1/4 flex-col mb-2 transition h-100 p-4 border rounded-md shadow-md`}
                    >
                        <ProductItem productId={favoriteId} />


                    </div>
                ))}


            </div>
        </div>
    )

}

const ProductItem = ({ productId }) => {
    const { data: productDetails } = useGetProductByIdQuery(productId);
    const productImage = productDetails?.image;

    return (
        <div className="flex items-center justify-center mb-2 flex-col font-serif" key={productId}>
            <Link className="flex flex-col items-center justify-center" href={`/Detail/${productId}`}>
                {productImage && (
                    <Image src={productImage} className="object-contain" alt="Producto" width={100} height={100} />
                )}
                <p>{productDetails?.title}</p>
                <section className="flex flex-row  items-center gap-4 space-between" >
                    <p className="text-sm text-bggris">{productDetails?.category.name}</p>

                    {/* <p className="text-sm text-bggris">Rating: {productDetails?.averageRating}</p> */}
                    <p className="text-sm text-bggris">$: {productDetails?.price}</p>

                </section>
            </Link>
        </div>

    );
};

export default MisFavoritos