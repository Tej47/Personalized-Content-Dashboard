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
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-b-3xl mb-4 shadow-lg">
                        <h1 className="text-3xl font-bold">🔥 Trending Now</h1>
                        <p className="opacity-80">See what the world is watching and reading.</p>
                    </div>
                    <MainFeed searchQuery="" isTrending={true}/>
                </main>
            </div>
        </div>
    );
}