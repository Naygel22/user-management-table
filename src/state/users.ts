
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../apiTypes/users.types'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
  }),
})

export const { useGetAllUsersQuery } = usersApi