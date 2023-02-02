import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IDog } from '../models/IDog';



export const dogApi = createApi({
    reducerPath: 'dogApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://random.dog/woof.json'}),
    endpoints: (build) => ({
        fetchAllDogs: build.query<IDog, string>({
            query: () => ({
                url: ''
            })
        })
    })
})


export const {
    useFetchAllDogsQuery,

  } = dogApi;