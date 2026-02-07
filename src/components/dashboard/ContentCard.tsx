import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/UserSlice";
import { RootState } from "@/store/store";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import {motion} from "framer-motion";

interface ContentCardProps {
    item: any;
    type: 'news' | 'movie' | 'social';
    index?: number; 
    moveItem?: (fromIndex: number, toIndex: number) => void;
}

export const ContentCard = ({item, type, index=0, moveItem =()=>{}}: ContentCardProps) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.user.favorites);
    const isFavorite = favorites.some((fav)=> fav.id === (item.id));

    const title = item.title || item.name || item.user;
    const description = item.description || item.overview || item.content;
    const image = item.urlToImage || (item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null);
    const link = item.url || `https://www.themoviedb.org/movie/${item.id}`;

    const ref = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'CARD',
        drop(draggedItem: { index: number }) {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // Combine drag and drop refs
    drag(drop(ref));

    return (
        <motion.div
            ref={ref}
            layout 
            whileHover={{ scale: 1.02, y: -5 }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ opacity: isDragging ? 0.4 : 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-[450px] cursor-move transition-shadow hover:shadow-2xl"
        >
            <div data-testid="content-card" className="relative h-48 w-full bg-gray-200 dark:bg-gray-700">
                
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover pointer-events-none"/>                  
                ):(
                    <div className="flex items-center justify-center h-full text-4xl" >
                        {type === 'social' ? '💬' : '🎬'}
                    </div>
                )}
                <button
                onClick={(e)=>{
                    //Does not allow dragging when mouse is on the favorite button
                    e.stopPropagation();
                    dispatch(toggleFavorite(item));
                }}
                className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-black/50 rounded-full backdrop-blur-sm z-10 transition-transform active:scale-90">
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <span className= {`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                        type === 'news' ? 'bg-blue-100 text-blue-600':
                        type === 'movie' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
                    }`}>
                        {type}
                    </span>
                </div>

                <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">{description}</p>

                <div className="mt-auto space-y-4">
                   {type !== 'social' ? (
                    <a
                    href={link}
                    target="_blank"
                    onClick={(e)=> e.stopPropagation()}
                    className="inline-block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-semibold">
                        Read More
                    </a>
                   ): (
                    <button className="w-full py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                    onClick={(e)=>e.stopPropagation()}>
                        View Conversation
                    </button>
                   )}
                   <div className="flex justify-center pb-1">
                    <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"/>
                   </div>
                </div>
            </div>
        </motion.div>
    );
};