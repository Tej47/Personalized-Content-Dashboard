'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/UserSlice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if(email){
            // Mocking a user object based on the email input
            dispatch(login({
                name: email.split('@')[0], //first part of the email till @
                email: email,
                bio: "New explorer on ContentHub",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            }));
            //Sending User to the Dashboard
            router.push('/'); 
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black p-4'>
            <form onSubmit={handleLogin} className='bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-800'>
                <h1 className='text-3xl font-bold mb-2 dark:text-white'>Welcome Back</h1>
                <p className='text-gray-500 mb-6'>Enter your email to access your feed.</p>
                <input 
                    type="email" 
                    required 
                    placeholder="Email address"
                    className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all">
                    Sign In
                </button>
            </form>
        </div>
    )
}