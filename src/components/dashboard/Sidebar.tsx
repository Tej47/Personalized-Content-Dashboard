import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
    const pathname = usePathname();
    const menuItems = [
        { name: 'Personalized Feed', path: '/' },
        { name: 'Trending', path: '/trending' },
        { name: 'Favorites', path: '/favorites' },
        { name: 'Settings', path: '/settings' },
    ];
    return (
        <aside className="w-64 h-screen bg-gray-100 dark:bg-gray-950 hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800 sticky top-0 overflow-y-auto">
            <div className="p-6 text-xl font-bold border-b border-gray-200 dark:border-gray-800 dark:text-white">
                ContentHub
            </div>
            <nav className="flex-1 p-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            // To show which path User is in
                            className={`block p-3 mb-2 rounded-lg font-medium transition-all duration-200 ${isActive
                                    ? "bg-blue-600 text-white shadow-md translate-x-1"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </nav>
            {/* User Information */}
            {isAuthenticated && user && (
                <div className="p-4 m-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                            alt="avatar"
                            className="h-10 w-10 rounded-full border-2 border-blue-500"
                        />
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm dark:text-white truncate">
                                {user.name}
                            </p>
                            <p className="text-[10px] text-blue-500 font-medium">Pro Member</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 italic">
                        {user.bio}
                    </p>
                </div>
            )}
        </aside>
    )
}