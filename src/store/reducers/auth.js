import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthorized: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeAuthorizedState(state) {
            state.isAuthorized = !state.isAuthorized;
        },
    },
});

export const { changeAuthorizedState } = authSlice.actions;
export const authReducer = authSlice.reducer;
