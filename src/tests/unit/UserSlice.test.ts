import userReducer, { 
    togglePreference, 
    toggleFavorite, 
    logout 
} from '@/store/UserSlice';

describe('UserSlice Reducers', () => {
    const initialState = {
        user: { name: 'Test', email: 'test@test.com', bio: '', avatar: '' },
        isAuthenticated: true,
        preferences: ['technology'],
        favorites: [],
        isDarkMode: false
    };

    test('should not allow removing the last preference', () => {
        const state = userReducer(initialState, togglePreference('technology'));
        expect(state.preferences).toContain('technology');
        expect(state.preferences.length).toBe(1);
    });

    test('should add a new preference if not present', () => {
        const state = userReducer(initialState, togglePreference('business'));
        expect(state.preferences).toEqual(['technology', 'business']);
    });

    test('should toggle favorite items', () => {
        const item = { id: '123', title: 'Test Movie' };
        // Add favorite
        let state = userReducer(initialState, toggleFavorite(item));
        expect(state.favorites).toHaveLength(1);
        // Remove favorite
        state = userReducer(state, toggleFavorite(item));
        expect(state.favorites).toHaveLength(0);
    });

    test('should reset state on logout', () => {
        const state = userReducer(initialState, logout());
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toBeNull();
        expect(state.preferences).toEqual(['technology']);
    });
});