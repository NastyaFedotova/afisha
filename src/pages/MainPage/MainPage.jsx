import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsAction } from '../../store/actions/events';
import { EventCard } from '../../components/EventCard/EventCard';
import './MainPage.scss';
import { Link } from 'react-router-dom';

const cnMainPage = cn('main-page');

export const MainPage = () => {
    const dispatch = useDispatch();
    const { events, getEventsStatus } = useSelector((store) => store.events);

    useEffect(() => {
        if (getEventsStatus === 'initial') {
            dispatch(getEventsAction());
        }
    }, [dispatch, getEventsStatus]);

    return (
        <div className={cnMainPage()}>
            <h1>Афиша Насти Федотовой</h1>
            <div className={cnMainPage('events-wrapper')}>
                {events.map((event) => (
                    <Link to={`/event/${event.id_event}`} className={cnMainPage('link')}>
                        <EventCard event={event} />
                    </Link>
                ))}
            </div>
        </div>
    );
};
