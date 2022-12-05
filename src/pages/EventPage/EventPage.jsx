import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useDispatch, useSelector } from 'react-redux';
import './EventPage.scss';
import { getEventByIdAction } from '../../store/actions/events';
import { useParams } from 'react-router-dom';

const cnEventPage = cn('event-page');

export const EventPage = () => {
    const dispatch = useDispatch();
    const { id: event_id } = useParams();
    const { events, getEventsStatus } = useSelector((store) => store.events);

    useEffect(() => {
        if (getEventsStatus === 'initial' && event_id) {
            console.log(event_id);
            dispatch(getEventByIdAction(event_id));
        }
    }, [dispatch, getEventsStatus, event_id]);

    return (
        <div className={cnEventPage()}>
            <div className={cnEventPage('title')}>ывапыпа</div>
            <div className={cnEventPage('title', { main: true })}>Это наша страница с мероприятиями</div>
            <div className={cnEventPage('title')}>ывапыпа</div>
        </div>
    );
};
