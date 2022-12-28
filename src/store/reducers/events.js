import { createSlice } from '@reduxjs/toolkit';
import {
    canceledEventAction,
    createEventAction,
    getEventByIdAction,
    getEventsAction,
    getEventsPriceRangeAction,
    patchEventByIdAction,
} from '../actions/events';

const initialState = {
    getEventsStatus: 'initial',
    getEventByIdStatus: 'initial',
    getEventsPriceRangeStatus: 'initial',
    patchEventByIdStatus: 'initial',
    changeEventRemainingTicketsStatus: 'initial',
    deleteEventStatus: 'initial',
    createEventStatus: 'initial',
    events: [],
    eventsPriceRange: null,
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
        builder
            .addCase(getEventsPriceRangeAction.pending, (state) => {
                state.getEventsPriceRangeStatus = 'fetching';
                state.error = null;
            })
            .addCase(getEventsPriceRangeAction.fulfilled, (state, { payload }) => {
                state.getEventsPriceRangeStatus = 'fetch';
                state.eventsPriceRange = payload;
                state.error = null;
            })
            .addCase(getEventsPriceRangeAction.rejected, (state, { error }) => {
                state.getEventsPriceRangeStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(patchEventByIdAction.pending, (state) => {
                state.patchEventByIdStatus = 'fetching';
                state.error = null;
            })
            .addCase(patchEventByIdAction.fulfilled, (state, { payload }) => {
                state.patchEventByIdStatus = 'fetch';
                state.events = state.events.map((event) => (event.id === payload.id ? payload : event));
                state.error = null;
            })
            .addCase(patchEventByIdAction.rejected, (state, { error }) => {
                state.patchEventByIdStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(createEventAction.pending, (state) => {
                state.createEventStatus = 'fetching';
                state.error = null;
            })
            .addCase(createEventAction.fulfilled, (state) => {
                state.createEventStatus = 'fetch';
                state.error = null;
            })
            .addCase(createEventAction.rejected, (state, { error }) => {
                state.createEventStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(canceledEventAction.pending, (state) => {
                state.deleteEventStatus = 'fetching';
                state.error = null;
            })
            .addCase(canceledEventAction.fulfilled, (state) => {
                state.deleteEventStatus = 'fetch';
                state.error = null;
            })
            .addCase(canceledEventAction.rejected, (state, { error }) => {
                state.deleteEventStatus = 'error';
                state.error = error;
            });
    },
});

export const resetEventsState = eventsSlice.actions.reset;
export const eventsReducer = eventsSlice.reducer;
