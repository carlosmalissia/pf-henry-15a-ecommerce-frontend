import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
    reducerPath: "reviewsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api-henrucci.onrender.com",
    }),
    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: () => "/review",
        }),
        newReview: builder.mutation({
            query: ({ review, token }) => {
                const config = {
                    url: `/api/review`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: review
                };
                return config;
            },
        })
    })
})

export const { useGetAllReviewsQuery, useNewReviewMutation } = reviewsApi;
