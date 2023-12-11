import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pf-15a.up.railway.app/api/",
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "product", //me trae todos los productos
    }),
    getProductById: builder.query({
      query: (_id) => `product/${_id}`, // trae un producto x su id
    }),
    getProductByPage: builder.query({
      query: ({ pageSize, actualPage }) =>
        `paginado?itemsperpage=${pageSize}&actualpage=${actualPage}`, // trae productos x paginas
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useGetProductByPageQuery,
} = productApi;
