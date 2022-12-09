import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { eventsReducer as events } from '../store/reducers/events';
import { loaderReducer as loader } from '../store/reducers/loader';
const reducer = combineReducers({
    events,
    loader,
});

export const store = configureStore({
    reducer,
});
