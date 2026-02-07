import { useGetTopHeadlinesQuery } from "@/store/api/newsApi";
import { useGetTrendingMoviesQuery } from "@/store/api/tmdbApi";
import { fetchMockSocialPosts, SocialPost } from "@/store/api/mockSocial";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState, useEffect } from "react";
import { CATEGORY_TO_GENRE } from "@/utils/categoryMap";
import { useMemo } from "react";

export const useUnifiedFeed = (searchQuery: string, page: number, isTrending: boolean = false) => {
    const { news: newsPrefs, movies: moviePrefs } = useSelector((state: RootState) => state.user.preferences);
    const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);

    // If User is on Trending page or has a search query, uses "general", else uses the User's preferences
    const activeNewsCategories = (isTrending || searchQuery) ? 'general' : newsPrefs.join(',');
    const genreIds = useMemo(() => {
        if (isTrending || searchQuery) return undefined;
        // Map the names from settings (e.g., "SciFi") to IDs (e.g., "878")
        return moviePrefs
            .map(pref => CATEGORY_TO_GENRE[pref] || pref)
            .filter(Boolean)
            .join('|');
    }, [moviePrefs, isTrending, searchQuery]);

    const { data: news, isFetching: newsLoading } = useGetTopHeadlinesQuery({
        category: activeNewsCategories,
        page,
        searchQuery: searchQuery || undefined
    })

    const { data: movies, isFetching: moviesLoading } = useGetTrendingMoviesQuery({
        page,
        genreId: genreIds,
        searchQuery: searchQuery || undefined
    });

    useEffect(() => {
        if (page === 1) {
            const getSocial = async () => {
                const categoriesToQuery = isTrending ? ['trending'] : newsPrefs;
                let posts = await fetchMockSocialPosts(categoriesToQuery);
                if (searchQuery) {
                    posts = posts.filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase()));
                }
                setSocialPosts(posts);
            };
            getSocial();
        }
    }, [newsPrefs, isTrending, page, searchQuery]);

    const unifiedData = useMemo(() => {
        const nList = news?.articles?.map((a: any) => ({ ...a, contentType: 'news', id: a.url })) || [];
        const mList = movies?.results?.map((m: any) => ({ ...m, contentType: 'movie', id: m.id.toString() })) || [];
        const sList = page === 1 ? socialPosts.map((s) => ({ ...s, contentType: 'social', id: s.id })) : [];
        if (searchQuery) {
            return [...nList, ...mList].sort((a, b) => {
                const aTitle = (a.title || a.name || "").toLowerCase();
                const bTitle = (b.title || b.name || "").toLowerCase();
                const query = searchQuery.toLowerCase();

                // Exact match priority
                if (aTitle.startsWith(query) && !bTitle.startsWith(query)) return -1;
                if (!aTitle.startsWith(query) && bTitle.startsWith(query)) return 1;
                return 0;
            });
        }
        const combined = [];
        const max = Math.max(nList.length, mList.length);
        const totalItems = Math.max(nList.length, mList.length, sList.length * 3);

        //iterate based on the largest list available
        for (let i = 0; i < totalItems; i++) {
            if (nList[i]) combined.push(nList[i]);
            if (mList[i]) combined.push(mList[i]);

            // Injecting social posts every 3 items
            if (i % 3 === 0) {
                const socialIndex = i / 3;
                if (sList[socialIndex]) {
                    combined.push(sList[socialIndex]);
                }
            }
        }
        return combined;
    }, [news, movies, socialPosts, page]);



    return {
        data: unifiedData,
        isLoading: newsLoading || moviesLoading,
        isFetching: newsLoading || moviesLoading,
    };
}