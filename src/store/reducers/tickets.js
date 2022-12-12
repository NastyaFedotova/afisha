import { createSlice } from '@reduxjs/toolkit';
import {
    createBookedTicketsAction,
    deleteTicketsAction,
    getTicketsAction,
    patchTicketsAction,
} from '../actions/tickets';

const initialState = {
    createBookedTicketsStatus: 'initial',
    getTicketsStatus: 'initial',
    updateTicketStatus: 'initial',
    deleteTicketStatus: 'initial',
    tickets: [],
    error: null,
};

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBookedTicketsAction.pending, (state) => {
                state.createBookedTicketsStatus = 'fetching';
                state.error = null;
            })
            .addCase(createBookedTicketsAction.fulfilled, (state, { payload }) => {
                state.createBookedTicketsStatus = 'fetch';
                state.tickets = payload;
                state.error = null;
            })
            .addCase(createBookedTicketsAction.rejected, (state, { error }) => {
                state.createBookedTicketsStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(getTicketsAction.pending, (state) => {
                state.getTicketsStatus = 'fetching';
                state.error = null;
            })
            .addCase(getTicketsAction.fulfilled, (state, { payload }) => {
                state.getTicketsStatus = 'fetch';
                state.tickets = payload;
                state.error = null;
            })
            .addCase(getTicketsAction.rejected, (state, { error }) => {
                state.getTicketsStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(patchTicketsAction.pending, (state) => {
                state.updateTicketStatus = 'fetching';
                state.error = null;
            })
            .addCase(patchTicketsAction.fulfilled, (state, { payload }) => {
                state.updateTicketStatus = 'fetch';
                state.tickets = state.tickets.filter((ticket) => ticket.id_ticket !== payload.id_ticket);
                state.error = null;
            })
            .addCase(patchTicketsAction.rejected, (state, { error }) => {
                state.updateTicketStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(deleteTicketsAction.pending, (state) => {
                state.deleteTicketStatus = 'fetching';
                state.error = null;
            })
            .addCase(deleteTicketsAction.fulfilled, (state, { payload }) => {
                state.deleteTicketStatus = 'fetch';
                state.tickets = state.tickets.filter((ticket) => ticket.id_ticket !== payload);
                state.error = null;
            })
            .addCase(deleteTicketsAction.rejected, (state, { error }) => {
                state.deleteTicketStatus = 'error';
                state.error = error;
            });
    },
});

export const resetTicketsState = ticketsSlice.actions.reset;
export const ticketsReducer = ticketsSlice.reducer;
