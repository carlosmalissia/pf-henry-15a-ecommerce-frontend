import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-henrucci.onrender.com/api/'
    }),
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => 'product'   //me trae todos los productos
        }),
        getProductById: builder.query({
            query: (_id) => `product/${_id}` // trae un producto x su id
        }),
        getProductByPage: builder.query({
            query: ({ pageSize, actualPage }) => `paginado?itemsperpage=${pageSize}&actualpage=${actualPage}` // trae productos x paginas 
        }),
        getProductByTitle: builder.query({
            query: ({ pageSize, actualPage, productTitle }) => `search/${productTitle}?itemsperpage=${pageSize}&actualpage=${actualPage}` // busca productos x title 
        }),
        getProductByFilterAndPage: builder.query({
            query: (filtro) => ({
                url: `filter?itemsperpage=12&actualpage=1`,
                method: 'GET',
                body: filtro
            }) // trae productos x paginas y filtra 
        }),
    })
})

export const {
    useGetAllProductQuery,
    useGetProductByIdQuery,
    useGetProductByPageQuery,
    useGetProductByTitleQuery,
    useGetProductByFilterAndPageQuery

} = productApi
