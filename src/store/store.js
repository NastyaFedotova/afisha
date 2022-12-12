import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { eventsReducer as events } from '../store/reducers/events';
import { loaderReducer as loader } from '../store/reducers/loader';
import { ticketsReducer as tickets } from '../store/reducers/tickets';

const reducer = combineReducers({
    events,
    loader,
    tickets
});

export const store = configureStore({
    reducer,
});
