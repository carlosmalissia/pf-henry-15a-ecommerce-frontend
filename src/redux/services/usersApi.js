import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pf-15a.up.railway.app/api'
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/users',
            providesTags: ['Users']   //me trae todos los usuarios
        }),
        getUserById: builder.query({
            query: (_id) => `/users/${_id}` // trae un usuario x su id
        }),
        createUser: builder.mutation({
            query: (newUser) =>({
                url: `/users`,
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users'] // crea un usuario  
        }),
        updateUser: builder.mutation({
            query: (updateProfile, userID, token) =>({
                url: `/users/${userID}`,
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
   useUpdateUserMutation

} = userApi