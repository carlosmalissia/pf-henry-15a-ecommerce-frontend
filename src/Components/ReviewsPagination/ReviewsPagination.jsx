import React from 'react'

const ReviewsPagination =({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
  
    if (totalPages <= 1) {
      // Si no hay más de una página, no renderizar la paginación
      return null;
    }
  
    return (
      <nav className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 ${currentPage === 1 ? 'hidden' : ''}`}
          >
            {'<'} Anterior
          </button>
          <span className="mx-4">Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 ${currentPage === totalPages ? 'hidden' : ''}`}
          >
            Siguiente {'>'}
          </button>
        </div>
      </nav>
    );
  };

export default ReviewsPagination