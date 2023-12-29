import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pf-15a.up.railway.app'
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: ({ loginEmail, loginPassword }) => ({
              url: `/auth/signin`, // URL del endpoint de inicio de sesión
              method: 'POST',
              body: {
                email: loginEmail,
                password: loginPassword,
              },
            }),
          }),
        

        getAllUsers: builder.query({
            query: () => '/api/users',
            providesTags: ['Users']   //me trae todos los usuarios
        }),
        getUserById: builder.query({
            query: (_id) => `/api/users/${_id}` // trae un usuario x su id
        }),
        createUser: builder.mutation({
            query: (newUser) =>({
                url: `/api/users`,
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users'] // crea un usuario  
        }),
        updateUser: builder.mutation({
            query: (updateProfile, userID, token) =>({
                url: `/api/users/${userID}`,
                method: 'PUT',
                body: updateProfile, token
            }),
            invalidatesTags: ['Users'] // crea un usuario  
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `/auth/signout`, // URL del endpoint de cerrar sesión
                method: 'POST',
            }),
        }),
        cartShopping: builder.query({
            query: ({ userID, _id }) => {
                // console.log("este es el userID:", userID);
                // console.log("es el porducto _id:", _id);
        
                return {
                    url: `/api/users/${userID}/shoppingCart`,
                    method: 'GET',
                    params: { product: _id },
                };
            },
            invalidatesTags: ['Users']
        }),
        shoppingCartupdateUser: builder.mutation({
            query: (shoppinCart, userID, token) => ({
              url: `/api/users/${userID}`,
              method: 'PUT',
              headers: (headers) => ({
                ...headers,
                'Authorization': `Bearer ${token}`,  
              }),
              body: shoppinCart,
            }),
            invalidatesTags: ['Users'], 
          })
          
    })
})

export const { 
   useGetAllUsersQuery, 
   useGetUserByIdQuery, 
   useCreateUserMutation,
   useUpdateUserMutation,
   useLoginUserMutation,
   useLogoutUserMutation,
   useCartShoppingQuery,
   useShoppingCartupdateUserMutation

} = userApi