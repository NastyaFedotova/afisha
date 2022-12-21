import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEventById, getEvents, getEventsPriceRange, patchEventById } from '../../api/services/events';
import { createBookedTickets } from '../../api/services/tickets';

export const getEventsAction = createAsyncThunk('events/events', (values) => {
    return getEvents(values);
});

export const getEventByIdAction = createAsyncThunk('events/eventById', (event_id) => {
    return getEventById(event_id);
});

export const getEventsPriceRangeAction = createAsyncThunk('events/price-range', () => {
    return getEventsPriceRange();
});

export const patchEventByIdAction = createAsyncThunk('events/patchEventById', (params) => {
    return patchEventById(params);
});

export const changeEventRemainingTicketsAction = createAsyncThunk(
    'events/changeEventRemainingTickets',
    (params) => {
        const { event, remaining_tickets } = params;
console.log(params)
        void createBookedTickets(params);

        return patchEventById({
            id_event: event,
            remaining_tickets: remaining_tickets,
        });
    },
);
