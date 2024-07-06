import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchaseHistoryApi = createApi({
    reducerPath: "purchaseHistoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api-henrucci.onrender.com",
    }),
    endpoints: (builder) => ({
        getPurchaseHistory: builder.query({

            query: (_id) => `api/userpurchasehistory/${_id}`,

        }),
        newPurchase: builder.mutation({
            query: ({ purchase, token }) => {
                const config = {
                    url: `/api/purchaseHistory`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: purchase
                };
                return config;
            },
        })
    })
})

export const { useGetPurchaseHistoryQuery, useNewPurchaseMutation } = purchaseHistoryApi
