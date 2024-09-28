import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null,
    role: null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.role = null;
        },
        setRole: (state, action) => {
            state.role = action.payload; 
        }
    },
});

export const { loginSuccess, logout, setRole } = authSlice.actions;
export default authSlice.reducer;