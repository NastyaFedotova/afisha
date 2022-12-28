import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBookedTickets, deleteTickets, getTickets, getTicketStatuses, patchTickets } from '../../api/services/tickets';

export const createBookedTicketsAction = createAsyncThunk('tickets/booking', (params) => {
    return createBookedTickets(params);
});

export const getTicketsAction = createAsyncThunk('tickets/tickets', (params) => {
    return getTickets(params);
});

export const patchTicketsAction = createAsyncThunk('tickets/update', (params) => {
    return patchTickets(params);
});

export const patchCancelledTicketsAction = createAsyncThunk('tickets/cancelledUpdate', (params) => {
    return patchTickets(params);
});

export const deleteTicketsAction = createAsyncThunk('tickets/delete', (id_ticket) => {
    return deleteTickets(id_ticket);
});

export const getTicketStatusesAction = createAsyncThunk('tickets/ticket_statuses', () => {
    return getTicketStatuses();
});

export const deleteEventTicketsAction = createAsyncThunk('events/delete', (event_id) => {
    void Promise.all(
        getTickets({ event_id: event_id }).then((response) =>
            response?.forEach((ticket) => {
                if (ticket.status === 'BOOKED') {
                    deleteTickets(ticket.id);
                } else {
                    patchTickets({ ...ticket, id_ticket: ticket.id, status: 'REFUND' });
                }
            }),
        ),
    );
});


export const getCancelledTicketsAction = createAsyncThunk('tickets/cancelledTickets', () => {
    return getTickets({status: 'CANCELLED'});
});