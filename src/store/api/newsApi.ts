import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
    endpoints: (builder) => ({
        getTopHeadlines: builder.query({
            query: ({ category, page = 1, searchQuery = '' }) => {
                const isMulti = category?.includes(',');
                const categoryQuery = isMulti 
                    ? `(${category.split(',').join(' OR ')})` 
                    : category;

                return {
                    url: (searchQuery || isMulti) ? 'everything' : 'top-headlines',
                    params: {
                        category: (searchQuery || isMulti) ? undefined : category,
                        // Combine search and preferences if multi-topic
                        q: searchQuery || (isMulti ? categoryQuery : undefined),
                        page,
                        pageSize: 10,
                        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
                        sortBy: isMulti ? 'publishedAt' : undefined
                    }
                }
            }
        })
    })
})

export const { useGetTopHeadlinesQuery } = newsApi;