import { createSlice } from '@reduxjs/toolkit';
import { authorizationAction, registrationAction, unAuthorizeAction } from '../actions/user';

const initialState = {
    loginStatus: 'initial',
    registrationStatus: 'initial',
    logoutStatus: 'initial',
    user: null,
    isAuthorized: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorizationAction.pending, (state) => {
                state.loginStatus = 'fetching';
                state.error = null;
            })
            .addCase(authorizationAction.fulfilled, (state, { payload }) => {
                state.loginStatus = 'fetched';
                state.user = payload;
                state.isAuthorized = true;
                state.error = null;
            })
            .addCase(authorizationAction.rejected, (state, { error }) => {
                state.loginStatus = 'error';
                state.isAuthorized = false;
                state.error = error;
            });
        builder
            .addCase(registrationAction.pending, (state) => {
                state.registrationStatus = 'fetching';
                state.error = null;
            })
            .addCase(registrationAction.fulfilled, (state) => {
                state.registrationStatus = 'fetched';
                state.error = null;
            })
            .addCase(registrationAction.rejected, (state, { error }) => {
                state.registrationStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(unAuthorizeAction.pending, (state) => {
                state.logoutStatus = 'fetching';
                state.error = null;
            })
            .addCase(unAuthorizeAction.fulfilled, (state) => {
                state.logoutStatus = 'fetched';
                state.isAuthorized = false;
                state.user = null;
                state.error = null;
            })
            .addCase(unAuthorizeAction.rejected, (state, { error }) => {
                state.logoutStatus = 'error';
                state.error = error;
            });
    },
});

export const resetUserState = userSlice.actions.reset;
export const userReducer = userSlice.reducer;
