import { createSlice } from '@reduxjs/toolkit';
import { getEventByIdAction, getEventsAction } from '../actions/events';

const initialState = {
    getEventsStatus: 'initial',
    getEventByIdStatus: 'initial',
    events: [],
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEventsAction.pending, (state) => {
                state.getEventsStatus = 'fetching';
                state.error = null;
            })
            .addCase(getEventsAction.fulfilled, (state, { payload }) => {
                state.getEventsStatus = 'fetch';
                state.events = payload;
                state.error = null;
            })
            .addCase(getEventsAction.rejected, (state, { error }) => {
                state.getEventsStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(getEventByIdAction.pending, (state) => {
                state.getEventByIdStatus = 'fetching';
                state.error = null;
            })
            .addCase(getEventByIdAction.fulfilled, (state, { payload }) => {
                state.getEventByIdStatus = 'fetch';
                state.events = [payload];
                state.error = null;
            })
            .addCase(getEventByIdAction.rejected, (state, { error }) => {
                state.getEventByIdStatus = 'error';
                state.error = error;
            });
    },
});

export const resetEventsState = eventsSlice.actions.reset;
export const eventsReducer = eventsSlice.reducer;
