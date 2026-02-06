import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/'}),
    endpoints: (builder) =>({
        getTrendingMovies: builder.query({
            query: ({page=1, genreId, searchQuery=''}) =>({
                url:searchQuery? 'search/movie': (genreId? 'discover/movie':'trending/movie/week'),
                params: {
                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    page: page,
                    with_genres: searchQuery? undefined : genreId, // Only used if calling discover
                    sort_by: 'popularity.desc',
                    query: searchQuery || undefined
                }
            })
        })
    })
})

export const {useGetTrendingMoviesQuery} = tmdbApi;