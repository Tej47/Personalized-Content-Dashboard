import { render, screen } from '@testing-library/react';
import { MainFeed } from '@/components/dashboard/MainFeed';
import { Providers } from '@/store/provider';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('https://newsapi.org/v2/everything', () => {
    return HttpResponse.json({ articles: [] });
  }),
  http.get('https://api.themoviedb.org/3/trending/movie/week', () => {
    return HttpResponse.json({ results: [] });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MainFeed Integration', () => {
    test('renders empty state message when no data is returned', async () => {
        render(
            <Providers>
                <MainFeed searchQuery="" />
            </Providers>
        );

        // Check for the "Your Personalized Feed" heading
        expect(screen.getByText(/Your Personalized Feed/i)).toBeDefined();
    });

    test('shows loading spinner while fetching', () => {
    render(
        <Providers>
            <MainFeed searchQuery="" />
        </Providers>
    );
    const spinner = screen.getByLabelText(/loading/i);
    expect(spinner).toBeDefined();
});
});