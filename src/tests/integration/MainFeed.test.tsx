import { render, screen, waitFor } from '@testing-library/react';
import { MainFeed } from '@/components/dashboard/MainFeed';
import { Providers } from '@/store/provider';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const server = setupServer(
    // Handle Search/Multi-category (everything)
    http.get('https://newsapi.org/v2/everything', () => {
        return HttpResponse.json({ articles: [{ url: '1', title: 'OpenAI Breakthrough' }] });
    }),

    // Handle Trending Movies
    http.get('https://api.themoviedb.org/3/trending/movie/week', () => {
        return HttpResponse.json({
            results: [{ id: 99, title: 'Trending Global Movie', contentType: 'movie' }]
        });
    }),

    // Handle Personalized News (top-headlines)
    http.get('https://newsapi.org/v2/top-headlines', () => {
        return HttpResponse.json({
            articles: [{ url: '2', title: 'Standard Tech News' }]
        });
    }),

    // Handle Personalized Movies
    http.get('https://api.themoviedb.org/3/discover/movie', () => {
        return HttpResponse.json({ results: [] });
    }),

    // Handle Search Movies
    http.get('https://api.themoviedb.org/3/search/movie', () => {
        return HttpResponse.json({
            results: [{ id: 101, title: 'OpenAI: The Movie', contentType: 'movie' }]
        });
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
    <Providers>
        <DndProvider backend={HTML5Backend}>
            {children}
        </DndProvider>
    </Providers>
);

describe('MainFeed Integration', () => {
    test('renders heading and handles debounced search', async () => {
        render(<MainFeed searchQuery="OpenAI" />, { wrapper: AllTheProviders });

        // Verify the UI updates to Search mode immediately
        expect(screen.getByText(/Search Results for "OpenAI"/i)).toBeInTheDocument();

        // Wait for the debounce (500ms) + API roundtrip
        await waitFor(() => {
            const newsItem = screen.queryByText(/OpenAI Breakthrough/i);
            const movieItem = screen.queryByText(/OpenAI: The Movie/i);

            expect(newsItem || movieItem).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    test('clears list when switching to Trending', async () => {
        const { rerender } = render(
            <MainFeed searchQuery="" isTrending={false} />,
            { wrapper: AllTheProviders }
        );

        rerender(<MainFeed searchQuery="" isTrending={true} />);

        expect(screen.getByText(/Trending Across the World/i)).toBeInTheDocument();
    });
});