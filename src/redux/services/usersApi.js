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
    })
})

export const { 
   useGetAllUsersQuery, 
   useGetUserByIdQuery, 
   useCreateUserMutation,
   useUpdateUserMutation,
   useLoginUserMutation,

} = userApi