import { useGetTopHeadlinesQuery } from "@/store/api/newsApi";
import { useGetTrendingMoviesQuery } from "@/store/api/tmdbApi";
import { fetchMockSocialPosts, SocialPost } from "@/store/api/mockSocial";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState, useEffect } from "react";
import { CATEGORY_TO_GENRE } from "@/utils/categoryMap";
import { useMemo } from "react";

export const useUnifiedFeed = (searchQuery: string, page: number, isTrending: boolean = false) => {
    const preferences = useSelector((state: RootState) => state.user.preferences);
    const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
    
    // If User is on Trending page, uses "general", else uses the User's preferences
    const activeCategories = isTrending ? 'general' : (preferences.join(','));
    
    // To generate the Genre ID from preferences
    const genreIds = isTrending
        ? undefined
        : preferences
            .map(cat => CATEGORY_TO_GENRE[cat])
            .filter(Boolean)
            .join(',');

    const { data: news, isFetching: newsLoading } = useGetTopHeadlinesQuery({
        category: activeCategories,
        page,
        searchQuery
    })

    const { data: movies, isFetching: moviesLoading } = useGetTrendingMoviesQuery({
        page,
        genreId: genreIds,
        searchQuery: searchQuery
    });

    useEffect(() => {
        if (page === 1) {
            const getSocial = async () => {
                const categoriesToQuery = isTrending ? ['trending'] : preferences;
                const posts = await fetchMockSocialPosts(categoriesToQuery);
                setSocialPosts(posts);
            };
            getSocial();
        }
    }, [preferences, isTrending, page]);

    const unifiedData = [
        ...(news?.articles?.map((a: any) => ({ ...a, contentType: 'news', id: a.url })) || []),
        ...(movies?.results?.map((m: any) => ({ ...m, contentType: 'movie', id: m.id.toString() })) || []),
        ...(page === 1 ? socialPosts.map((s) => ({ ...s, contentType: 'social', id: s.id })) : [])
    ];

    return {
        data: unifiedData,
        isLoading: newsLoading || moviesLoading,
        isFetching: newsLoading || moviesLoading,
    };
}