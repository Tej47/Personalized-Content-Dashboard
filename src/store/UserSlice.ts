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
    preferences: string[];
    favorites: any[];
    isDarkMode: boolean;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    preferences: ['technology'],
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
        togglePreference: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            if (state.preferences.includes(category)) {
                // Does not let the preferences to be 0
                if (state.preferences.length > 1) {
                    state.preferences = state.preferences.filter((p) => p !== category);
                }
            } else {
                state.preferences.push(category);
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

export const { toggleFavorite, togglePreference, setDarkMode, login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer