import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { eventsReducer as events } from '../store/reducers/events';
import { loaderReducer as loader } from '../store/reducers/loader';
import { ticketsReducer as tickets } from '../store/reducers/tickets';
import { userReducer as user } from '../store/reducers/user';

const reducer = combineReducers({
    events,
    loader,
    tickets,
    user
});

export const store = configureStore({
    reducer,
});
