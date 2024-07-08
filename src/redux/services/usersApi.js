
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api-henrucci.onrender.com",
    }),
    tagTypes: ["Users", 'Reviews'],
    endpoints: (builder) => ({

        updateReview: builder.mutation({
            query: ({ reviewId, userToken, updatedReview }) => {
                console.log(userToken);
                const config = {
                    url: `/api/review/${reviewId}`,
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: updatedReview
                };
                return config;
            },
        }),
        loginUser: builder.mutation({
            query: ({ loginEmail, loginPassword }) => ({
                url: `/auth/signin`, // URL del endpoint de inicio de sesión
                method: "POST",
                body: {
                    email: loginEmail,
                    password: loginPassword,
                },
            }),
        }),
        loginUserGoogle: builder.mutation({
            query: ({ token }) => ({
                url: `/auth/signin/POST`, // URL del endpoint de inicio de sesión
                method: 'POST',
                body: {
                    token,
                },
            }),
        }),

        getAllUsers: builder.query({
            query: () => "/api/users",
            providesTags: ["Users"], //me trae todos los usuarios
        }),
        getUserById: builder.query({
            query: (_id) => `/api/users/${_id}`, // trae un usuario x su id
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: `/api/users`,
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Users"], // crea un usuario
        }),

        updateUser: builder.mutation({
            query: (updateProfile, userID, token) => ({
                url: `/api/users/${userID}`,
                method: "PUT",
                body: updateProfile,
                token,
            }),
            invalidatesTags: ["Users"], // crea un usuario
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `/auth/signout`, // URL del endpoint de cerrar sesión
                method: "POST",
            }),
        }),
        cartShopping: builder.query({
            query: ({ userID, _id }) => {
                // console.log("este es el userID:", userID);
                // console.log("es el porducto _id:", _id);

                return {
                    url: `/api/users/${userID}/shoppingCart`,
                    method: "GET",
                    params: { product: _id },
                };
            },
            invalidatesTags: ["Users"],
        }),
        getUserReviews: builder.query({
            query: (userId) => `/api/userReviews/${userId}`, // endpoint para obtener las reviews por ID de usuario
            providesTags: (result, error, userId) => [{ type: 'Reviews', id: userId }],
        }),
        shoppingCartupdateUser: builder.mutation({
            query: ({ shoppingCart, userID, token }) => {
                const config = {
                    url: `/api/users/${userID}`,
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: { shoppingCart: shoppingCart },
                };
                return config;
            },
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useCartShoppingQuery,
    useShoppingCartupdateUserMutation,
    useGetUserReviewsQuery,
    useUpdateReviewMutation,

    
    
} = userApi;

