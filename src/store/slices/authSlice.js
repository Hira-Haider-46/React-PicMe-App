import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null,
    type: null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSignUpSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.type = action.payload.type; 
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.type = null;
        },
        setType: (state, action) => {
            state.type = action.payload; 
        }
    },
});

export const { loginSignUpSuccess, logout, setType } = authSlice.actions;
export default authSlice.reducer;