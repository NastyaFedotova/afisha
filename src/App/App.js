import './App.css';
import { Route, Routes } from 'react-router-dom';
import { EventPage } from '../pages/EventPage/EventPage';
import { MainPage } from '../pages/MainPage/MainPage';

export const App = () => {
    return (
        <Routes>
            <Route path="/event/:id" element={<EventPage />} />
            <Route index exact element={<MainPage />} />
        </Routes>
    );
};
