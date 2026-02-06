'use client';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { togglePreference } from '@/store/UserSlice';
import { updateProfile, login, logout } from '@/store/UserSlice';
import { useRouter } from 'next/navigation';


export default function SettingsPage() {
    const dispatch = useDispatch();
    const preferences = useSelector((state: RootState) => state.user.preferences);

    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();

    const availableCategories = [
        'technology', 'business', 'sports', 'entertainment', 'health', 'science'
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-black transition-colors duration-300">
            <Sidebar />
            <div className='flex-1 flex flex-col'>
                {/* Search is handled globally or on the feed, leaving empty for now */}
                <Header onSearch={() => { }} />
                <main className='p-8'>

                    <h1 className="text-3xl font-bold mb-8 dark:text-white">Settings</h1>

                    {/* Content Personalization Section */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h2 className='text-xl font-semibold mb-4 dark:text-white'>Content Preferences</h2>
                        <p className='text-gray-500 mb-6'>Select Categories to customize your personalized feed.</p>
                        <div className='flex flex-wrap gap-3'>
                            {availableCategories.map((category) => {
                                const isActive = preferences.includes(category);
                                return (
                                    <button
                                        key={category}
                                        onClick={() => dispatch(togglePreference(category))}
                                        className={`px-6 py-3 rounded-full font-medium capitalize transition-all duration-200 ${isActive
                                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}>
                                        {category} {isActive && '✓'}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className='mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800'>
                        <h2 className='text-xl font-semibold mb-4 dark:text-white'>Account Information</h2>
                        <div className='text-gray-600 dark:text-gray-400'>
                            <p>Current Session: <span className='text-green-500'>Active</span></p>
                            <p className='mt-2 text-sm'>Preferences are saved locally via Redux Persist.</p>
                        </div>
                    </div>
                     
                    {/* Profile Editing - Updates the global user object in real-time */}
                    <div className="my-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Profile Customization</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-500">Public Name</label>
                                <input
                                    value={user?.name || ''}
                                    onChange={(e) => dispatch(updateProfile({ name: e.target.value }))}
                                    className="w-full p-2 bg-gray-50 dark:bg-gray-800 rounded-md dark:text-white border border-gray-200 dark:border-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500">Bio</label>
                                <textarea
                                    value={user?.bio || ''}
                                    onChange={(e) => dispatch(updateProfile({ bio: e.target.value }))}
                                    className="w-full p-2 bg-gray-50 dark:bg-gray-800 rounded-md dark:text-white border border-gray-200 dark:border-gray-700"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => { dispatch(logout()); router.push('/login'); }}
                            className="mt-6 text-red-500 hover:underline font-medium"
                        >
                            Sign Out
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}