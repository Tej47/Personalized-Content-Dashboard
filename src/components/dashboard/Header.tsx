'use client';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {setDarkMode} from '@/store/UserSlice';
import {useDebounce} from '@/hooks/useDebounce';

interface HeaderProps{
    onSearch : (value: string) => void;
}

export const Header = ({onSearch}: HeaderProps) =>{
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState)=> state.user.isDarkMode);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounce(searchTerm, 500);
    useEffect(()=>{
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    return(
        <header className='h-16 flex items-center justify-between px-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50'>
            <div className='w-1/3'>
            <input 
            type='text'
            placeholder='Search for news, movies..'
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            className='w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            />
            </div>
            <div className='flex items-center gap-4'>
                <button data-testid="theme-toggle" onClick={()=>dispatch(setDarkMode(!isDarkMode))}
                className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                    {isDarkMode ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    );
}