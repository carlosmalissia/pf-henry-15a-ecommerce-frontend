import React, { useState } from 'react';
import { useGetPurchaseHistoryQuery } from "@/redux/services/purchaseHistoryApi";
import { useAppSelector } from "@/redux/hooks";
import HistoryProduct from '../HistoryProduct/HistoryProduct';

const HistorialCompras = () => {
    const userData = useAppSelector((state) => state.loginReducer.user);
    const _id = userData?._id;

    const { data: historial, error } = useGetPurchaseHistoryQuery(_id);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = historial?.slice(indexOfFirstItem, indexOfLastItem);

    const formattedDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (error) {
        return <div className="text-red-500">Error al obtener el historial de compras.</div>;
    }

    if (!historial || historial.length === 0) {
        return <div className="text-gray-500">No hay historial de compras disponible.</div>;
    }

    return (
        <div className="p-4 max-w-screen-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>

            {currentItems.map(compra => (
                <div key={compra._id} className="mb-8 border p-4 rounded-md shadow-md ">
                    <p className="text-m bg-gray-100  text-black font-serif py-2 px-4 rounded-lg shadow-m mb-2">Fecha de Creación: {formattedDate(compra.created)}</p>
                    <p className="text-m bg-gray-100  text-black font-serif py-2 px-4 rounded-lg shadow-m mb-2">Estado: {compra.status}</p>
                    <p className="text-m bg-gray-100  text-black font-serif py-2 px-4 rounded-lg shadow-m mb-2">Productos:</p>
                    <hr className="my-2" />

                    <div className="flex flex-wrap">
                        {compra.product.map((productoId, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
                                <HistoryProduct
                                    key={productoId}
                                    compraId={compra._id}
                                    fechaCreacion={compra.created}
                                    estado={compra.status}
                                    productos={[productoId]}
                                    usuarioNombre={compra.user.name}
                                    usuarioApellido={compra.user.lastname}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

             {/* Paginación */}
             <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        className="mx-1 px-3 py-1 rounded-md bg-gray-300 text-black"
                    >
                        {"<"}
                    </button>
                )}

                {Array.from({ length: Math.ceil(historial.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}

                {currentPage < Math.ceil(historial.length / itemsPerPage) && (
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        className="mx-1 px-3 py-1 rounded-md bg-gray-300 text-black"
                    >
                        {">"}
                    </button>
                )}
            </div>

            {/* Mensaje de la página actual */}
            <div className="flex justify-center mt-2">
                <p className="text-gray-600">Página {currentPage} de {Math.ceil(historial.length / itemsPerPage)}</p>
            </div>
        </div>
    );
};

export default HistorialCompras;