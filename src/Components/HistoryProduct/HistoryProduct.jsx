"use client"
import React from 'react';
import Image from 'next/image';
import { useGetProductByIdQuery } from '@/redux/services/productApi';

const HistoryProduct = ({
    key,
    compraId,
    fechaCreacion,
    estado,
    productos
}) => {
    console.log("soy los productos", productos);

    return (
        <div className="border rounded-md bg-white p-2 h-full shadow-xl">
            <div className="text-m text-black font-serif py-2 px-4 rounded-lg shadow-m mb-4 ">Producto</div>
            {productos.map((productoId) => (
                <ProductItem key={productoId} productId={productoId} />
            ))}
        </div>
    );
};

const ProductItem = ({ productId }) => {
    const { data: productDetails } = useGetProductByIdQuery(productId);
    const productImage = productDetails?.image;

    return (
        <div className="flex items-center justify-center mb-2" key={productId}>
            {productImage && <Image src={productImage} alt="Producto" width={100} height={100} />}
        </div>
    );
};

export default HistoryProduct;