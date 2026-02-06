'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ContentCard } from '@/components/dashboard/ContentCard';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
        const router = useRouter();
        //If not logged in, pushes back to login page
        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, router]);
    
        if (!isAuthenticated) return null;


    const favorites = useSelector((state: RootState) => state.user.favorites);
    const [items, setItems] = useState(favorites);
    useEffect(() => {
        setItems(favorites);
    }, [favorites]);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header onSearch={() => { }} /> {}
                <main className="p-6 overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-8 dark:text-white">Your Favorites ❤️</h1>
                    
                    {/* If there are no favorites added yet */}
                    {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <span className="text-6xl mb-4">Empty</span>
                            <p>You haven't saved any content yet.</p>
                        </div>
                    ) : (
                        <Reorder.Group
                            axis="y"
                            values={items}
                            onReorder={setItems} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {items.map((item) => (
                                <ContentCard key={item.id} item={item} type={item.contentType} />
                            ))}
                        </Reorder.Group>
                    )}
                </main>
            </div>
        </div>
    );
}