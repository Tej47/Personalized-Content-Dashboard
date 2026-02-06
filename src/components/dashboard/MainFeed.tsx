'use client';
import { useState, useRef, useEffect, useCallback } from "react";
import { useInView, AnimatePresence, motion } from "framer-motion";
import { useUnifiedFeed } from "@/hooks/useUnifiedFeed";
import { ContentCard } from "./ContentCard";

interface MainFeedProps {
    searchQuery: string,
    isTrending?: boolean 
}

export const MainFeed = ({ searchQuery, isTrending = false }: MainFeedProps) => {
    const [page, setPage] = useState(1);
    const [masterList, setMasterList] = useState<any[]>([]);
    const sentinelRef = useRef(null);
    const isInView = useInView(sentinelRef, { amount: 0.1, margin: "0px 0px 200px 0px" });

    const { data, isLoading, isFetching } = useUnifiedFeed(searchQuery, page, isTrending);

    // To reset list when search changes
    useEffect(() => {
        setMasterList([]);
        setPage(1);
    }, [searchQuery, isTrending]);

    useEffect(() => {
        if (data && data.length > 0) {
            setMasterList((prev) => {
                const combined = [...prev, ...data];
                const uniqueMap = new Map(combined.map(item => [item.id, item]));
                return Array.from(uniqueMap.values());
            })
        }
    }, [data]);

    //To trigger next page
    useEffect(() => {
        if (isInView && !isFetching && data?.length !== 0) {
            setPage((prev) => prev + 1);
        }
    }, [isInView, isFetching, isLoading]);

   const moveItem = useCallback((fromIndex: number, toIndex: number) => {
        setMasterList((prevList) => {
            const newList = [...prevList];
            const [movedItem] = newList.splice(fromIndex, 1);
            newList.splice(toIndex, 0, movedItem);
            return newList;
        });
    }, []);

    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
                {isTrending ? 'Trending Across the World' : 'Your Personalized Feed'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {masterList.map((item, index) => (
                    <ContentCard
                        key={item.id}
                        item={item}
                        index={index}
                        type={item.contentType}
                        moveItem={moveItem}
                    />
                ))}
            </div>
            <div ref={sentinelRef} className="h-20 flex items-center justify-center mt-8">
                {(isFetching) && (
                    <div aria-label="loading" className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                )}
            </div>
        </section>
    )
}