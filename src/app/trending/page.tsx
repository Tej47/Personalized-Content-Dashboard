'use client';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { MainFeed } from '@/components/dashboard/MainFeed';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect } from 'react';

export default function TrendingPage() {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
        const router = useRouter();
        //If not logged in, pushes back to login page
        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, router]);
    
        if (!isAuthenticated) return null;
    
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header onSearch={() => {}} /> 
                <main className="p-6 overflow-y-auto">
                    <div className="text-3xl font-bold mb-8 dark:text-white">
                        <h1 className="text-3xl font-bold">Trending Now 🔥</h1>
                    </div>
                    <MainFeed searchQuery="" isTrending={true}/>
                </main>
            </div>
        </div>
    );
}