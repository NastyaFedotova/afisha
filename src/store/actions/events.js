import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEventById, getEvents, getEventsPriceRange, patchEventById } from '../../api/services/events';

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