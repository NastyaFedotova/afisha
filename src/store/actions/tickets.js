import { createAsyncThunk } from '@reduxjs/toolkit';
import { patchEventById } from '../../api/services/events';
import { createBookedTickets, deleteTickets, getTickets, patchTickets } from '../../api/services/tickets';

export const createBookedTicketsAction = createAsyncThunk('tickets/booking', (params) => {
    return createBookedTickets(params);
});

export const getTicketsAction = createAsyncThunk('tickets/tickets', (params) => {
    return getTickets(params);
});

export const patchTicketsAction = createAsyncThunk('tickets/update', (params) => {
    return patchTickets(params);
});

export const deleteTicketsAction = createAsyncThunk('tickets/delete', (params) => {
    const { id_ticket, id_event, remaining_tickets } = params;

    return Promise.all([patchEventById({ id_event, remaining_tickets }), deleteTickets(id_ticket)]).then(
        ([eventById, _]) => {
            return { eventById, id_ticket };
        },
    );
});