import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { eventsReducer as events } from '../store/reducers/events';
import { loaderReducer as loader } from '../store/reducers/loader';
import { authReducer as auth } from '../store/reducers/auth';
import { ticketsReducer as tickets } from '../store/reducers/tickets';

const reducer = combineReducers({
    events,
    loader,
    tickets,
    auth,
});

export const store = configureStore({
    reducer,
});
