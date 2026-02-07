import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
    endpoints: (builder) => ({
        getTopHeadlines: builder.query({
            query: ({ category, page = 1, searchQuery = '' }) => {
                const isMulti = category?.includes(',') && !searchQuery;
                const categoryQuery = isMulti 
                    ? `(${category.split(',').join(' OR ')})` 
                    : undefined;

                return {
                    url: (searchQuery || isMulti) ? 'everything' : 'top-headlines',
                    params: {
                        category: (searchQuery || isMulti) ? undefined : category,
                        // Combine search and preferences if multi-topic
                        q: searchQuery || categoryQuery,
                        page,
                        pageSize: 10,
                        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
                        sortBy: (searchQuery || isMulti) ? 'publishedAt' : undefined,
                        language: 'en'
                    }
                }
            }
        })
        // getTopHeadlines: builder.query({
        //     query: ({ category, page = 1, searchQuery = '' }) => {
        //         const isMulti = category?.includes(',') && !searchQuery;

        //         // Define a list of high-quality sources to keep the feed clean
        //         const trustedSources = "bbc.co.uk,techcrunch.com,reuters.com,theverge.com,wsj.com";

        //         return {
        //             url: (searchQuery || isMulti) ? 'everything' : 'top-headlines',
        //             params: {
        //                 // If multi-preference, we search across trusted domains
        //                 domains: isMulti ? trustedSources : undefined,
        //                 q: searchQuery || (isMulti ? category.split(',').join(' OR ') : undefined),
        //                 category: (searchQuery || isMulti) ? undefined : category,
        //                 language: 'en',
        //                 sortBy: 'relevance',
        //                 page,
        //                 apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        //             }
        //         }
        //     }
        // })
    })
})

export const { useGetTopHeadlinesQuery } = newsApi;