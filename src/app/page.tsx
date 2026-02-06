'use client';
import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MainFeed } from "@/components/dashboard/MainFeed";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const router = useRouter();
    //If not logged in, pushes back to login page
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return(
        <div className="flex h-screen bg-gray-50 dark:bg-black overflow-hidden transition-colors duration-300">
            <Sidebar/>
            <div className="flex-1 flex flex-col min-w-0 h-full">
                <Header onSearch={setSearchQuery}/>
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <MainFeed searchQuery={searchQuery}/>
                </main>
            </div>
        </div>
    )
}