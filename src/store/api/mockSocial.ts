export interface SocialPost {
    id: string;
    user: string;
    content: string;
    hashtags: string[];
    likes: number;
    timestamp: string;
}

export const fetchMockSocialPosts = async (categories: string[]): Promise<SocialPost[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const allPosts: SocialPost[] = [
        {
            id: 'soc_1',
            user: '@tech_guru',
            content: 'Just explored the new features in Next.js 14! The App Router is a game changer for performance. #technology #webdev',
            hashtags: ['technology', 'webdev', 'nextjs'],
            likes: 120,
            timestamp: new Date().toISOString(),
        },
        {
            id: 'soc_2',
            user: '@fin_wiz',
            content: 'Market trends are looking bullish today. Keep an eye on tech stocks. #business #finance',
            hashtags: ['business', 'finance', 'stocks', 'trending'],
            likes: 45,
            timestamp: new Date().toISOString(),
        },
        {
            id: 'soc_3',
            user: '@sporty_stats',
            content: 'Incredible comeback in the final minutes! This is why we love the game. #sports #clutch',
            hashtags: ['sports', 'news'],
            likes: 89,
            timestamp: new Date().toISOString(),
        },
        {
            id: 'soc_4',
            user: '@cine_phile',
            content: 'The cinematography in the new sci-fi epic is mind-blowing. A must-watch on the big screen! #entertainment #movies',
            hashtags: ['entertainment', 'movies', 'trending'],
            likes: 210,
            timestamp: new Date().toISOString(),
        },
        {
            id: 'soc_5',
            user: '@health_hub',
            content: 'Consistency is key. 10 minutes of daily stretching can improve your posture significantly. #health #wellness',
            hashtags: ['health', 'wellness'],
            likes: 67,
            timestamp: new Date().toISOString(),
        },
        {
            id: 'soc_6',
            user: '@space_explorer',
            content: 'New images from the James Webb telescope reveal galaxies we never knew existed. Infinite wonders. #science #space',
            hashtags: ['science', 'space', 'trending'],
            likes: 540,
            timestamp: new Date().toISOString(),
        },
        {
            id: 'soc_7',
            user: '@startup_daily',
            content: 'VC funding is shifting towards sustainable energy projects this quarter. Interesting times ahead. #business #energy',
            hashtags: ['business', 'energy'],
            likes: 32,
            timestamp: new Date().toISOString(),
        },
        {
            id: 'soc_8',
            user: '@ai_insider',
            content: 'The latest LLM benchmarks are out. Open-source models are finally catching up to proprietary ones. #technology #ai',
            hashtags: ['technology', 'ai', 'trending'],
            likes: 156,
            timestamp: new Date().toISOString(),
        }

    ]
    
    const filtered = allPosts.filter(post =>
        post.hashtags.some(tag => categories.includes(tag.toLowerCase()))
    )

    return filtered.length > 0 ? filtered : allPosts.slice(0, 2);
}