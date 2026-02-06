'use client';
import { useSelector } from "react-redux";
import { RootState} from '@/store/store';
import { useEffect } from "react";

export default function ThemeProvider({children}: {children: React.ReactNode}){
    const isDarkMode = useSelector((state: RootState)=> state.user.isDarkMode);

    useEffect(()=>{
        const root = window.document.documentElement;
        if(isDarkMode){
            root.classList.add('dark');
        }else{
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    return <>{children}</>
}