import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEventById, getEvents } from '../../api/services/events';

export const getEventsAction = createAsyncThunk('events/events', () => {
    return getEvents();
});

export const getEventByIdAction = createAsyncThunk('events/eventById', (event_id) => {
    return getEventById(event_id);
});
