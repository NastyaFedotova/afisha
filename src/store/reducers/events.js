import { createSlice } from '@reduxjs/toolkit';
import {
    getEventByIdAction,
    getEventsAction,
    getEventsPriceRangeAction,
    patchEventByIdAction,
} from '../actions/events';
import { deleteTicketsAction } from '../actions/tickets';

const initialState = {
    getEventsStatus: 'initial',
    getEventByIdStatus: 'initial',
    getEventsPriceRangeStatus: 'initial',
    patchEventByIdStatus: 'initial',
    changeEventRemainingTicketsStatus: 'initial',
    deleteEventStatus: 'initial',
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
            .addCase(deleteTicketsAction.pending, (state) => {
                state.deleteEventStatus = 'fetching';
                state.error = null;
            })
            .addCase(deleteTicketsAction.fulfilled, (state, { payload }) => {
                state.deleteEventStatus = 'fetch';
                const { eventById } = payload;
                state.events = state.events.map((event) => (event.id === eventById.id ? eventById : event));
                state.error = null;
            })
            .addCase(deleteTicketsAction.rejected, (state, { error }) => {
                state.deleteEventStatus = 'error';
                state.error = error;
            });
    },
});

export const resetEventsState = eventsSlice.actions.reset;
export const eventsReducer = eventsSlice.reducer;
