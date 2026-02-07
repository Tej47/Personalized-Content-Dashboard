import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
    name: string;
    email: string;
    bio: string;
    avatar?: string;
}

interface UserState {
    user: UserProfile | null;
    isAuthenticated: boolean;
    preferences: {
        news: string[];
        movies: string[];
    }
    favorites: any[];
    isDarkMode: boolean;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    preferences: {
        news: ['technology'],
        movies: ['Action']
    },
    favorites: [],
    isDarkMode: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserProfile>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        // Clears the User's data and preferences
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.preferences = initialState.preferences;
            state.favorites = [];
        },
        updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        toggleNewsPreference: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            const isExist = state.preferences.news.includes(category);

            if (isExist) {
                if (state.preferences.news.length > 1) {
                    state.preferences.news = state.preferences.news.filter((p) => p !== category);
                }
            } else {
                // To Prevent large number of API calls on every page
                if (state.preferences.news.length < 3) {
                    state.preferences.news.push(category);
                } else {
                    alert("Limit preferences to 3 for best results and faster loading!");
                }
            }
        },
        toggleMoviePreference: (state, action: PayloadAction<string>) => {
            const genreId = action.payload;
            if (state.preferences.movies.includes(genreId)) {
                if (state.preferences.movies.length > 1) {
                    state.preferences.movies = state.preferences.movies.filter((id) => id !== genreId);
                }
            } else {
                state.preferences.movies.push(genreId);
            }
        },
        toggleFavorite: (state, action: PayloadAction<any>) => {
            const item = action.payload;
            const exists = state.favorites.find((fav) => fav.id === item.id);
            if (exists) {
                state.favorites = state.favorites.filter((fav) => fav.id !== item.id);
            } else {
                state.favorites.push(item);
            }
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        }
    }
})

export const { toggleFavorite, toggleMoviePreference, toggleNewsPreference, setDarkMode, login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer