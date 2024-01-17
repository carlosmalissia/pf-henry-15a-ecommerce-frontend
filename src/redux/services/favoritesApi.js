import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoritesApi = createApi({
  reducerPath: "favoritesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pf-15a.up.railway.app",
  }),
  endpoints: (builder) => ({
    addFavorite: builder.mutation({
      query: ({ product, token, userId }) => {
        const config = {
          url: `/api/favorites/${userId}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {product: product},
        };
        return config;
      },
    }),
    removeFavorite: builder.mutation({
      query: ({ product, token, userId }) => {
        const config = {
          url: `/api/favorites/${userId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {product: product}
        };
        return config;
      },
    }) 
  }), 
});

export const {useAddFavoriteMutation, useRemoveFavoriteMutation } = favoritesApi;

