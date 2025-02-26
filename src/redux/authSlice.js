import { createSlice } from '@reduxjs/toolkit';

const userData = JSON.parse(localStorage.getItem('user')) || null;

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userData,
    },
    reducers: {
        loginUserAction: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        registerUserAction: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logoutAction: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});

export const { loginUserAction, registerUserAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
