import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const deleteTicketsAction = createAsyncThunk('tickets/delete', (id_ticket) => {
    void deleteTickets(id_ticket);
    return id_ticket
});
