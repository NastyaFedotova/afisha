import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { eventsReducer as events } from '../store/reducers/events';

const reducer = combineReducers({
    events,
});

export const store = configureStore({
    reducer,
});
