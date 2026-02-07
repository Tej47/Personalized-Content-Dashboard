import userReducer, { 
    toggleMoviePreference,
    toggleNewsPreference, 
    toggleFavorite, 
    logout 
} from '@/store/UserSlice';

describe('UserSlice Reducers', () => {
    const initialState = {
        user: { name: 'Test', email: 'test@test.com', bio: '', avatar: '' },
        isAuthenticated: true,
        preferences: {
            news: ['technology'],
            movies: ['Action']
        },
        favorites: [],
        isDarkMode: false
    };

    test('should not allow removing the last news preference', () => {
        const state = userReducer(initialState, toggleNewsPreference('technology'));
        expect(state.preferences.news).toContain('technology');
        expect(state.preferences.news.length).toBe(1);
    });

    test('should add a new news preference and not exceed 3', () => {
        let state = userReducer(initialState, toggleNewsPreference('business'));
        state = userReducer(state, toggleNewsPreference('science'));
        
        // Try adding a 4th
        state = userReducer(state, toggleNewsPreference('health'));
        
        expect(state.preferences.news).toEqual(['technology', 'business', 'science']);
        expect(state.preferences.news).not.toContain('health');
    });

    test('should reset state on logout with correct default object', () => {
        const state = userReducer(initialState, logout());
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toBeNull();
        expect(state.preferences.news).toEqual(['technology']);
    });
});