import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IUser } from '../models/IUser'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[], string>({
            query: () => ({
                url: 'api/users'
            })
        })
    })
})