import React, { useEffect, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { useDispatch, useSelector } from 'react-redux';
import './EventPage.scss';
import { getEventByIdAction } from '../../store/actions/events';
import { useParams } from 'react-router-dom';
import { resetEventsState } from '../../store/reducers/events';
import { YMaps, Map, Placemark, GeolocationControl, RulerControl, TrafficControl, SearchControl, TypeSelector } from '@pbe/react-yandex-maps';
const cnEventPage = cn('event-page');

export const EventPage = () => {
    const dispatch = useDispatch();
    const { id: event_id } = useParams();
    const { events, getEventByIdStatus } = useSelector((store) => store.events);

    useEffect(() => {
        if (getEventByIdStatus === 'initial' && event_id) {
            console.log(event_id);
            dispatch(getEventByIdAction(event_id));
        }
    }, [dispatch, getEventByIdStatus, event_id]);

    const eventInfo = useMemo(
        () => (getEventByIdStatus === 'fetch' ? events[0] : undefined),
        [events, getEventByIdStatus],
    );

    useEffect(() => () => dispatch(resetEventsState()), [dispatch]);
    console.log(eventInfo);
    return (
        <div className={cnEventPage()}>
            <div className={cnEventPage('title')}>ывапыпа</div>
            <div className={cnEventPage('title', { main: true })}>Это наша страница с мероприятиями</div>
            <div className={cnEventPage('title')}>ывапыпа</div>
            {eventInfo !== undefined && (
                <YMaps>
                    <Map
                        defaultState={{
                            center: [eventInfo.latitude, eventInfo.longitude],
                            zoom: 14,
                            controls: ['zoomControl', 'fullscreenControl'],
                        }}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                        style={{ width: '100%', height: 400 }}
                    >
                        <Placemark defaultGeometry={[eventInfo.latitude, eventInfo.longitude]} />
                        <GeolocationControl options={{ float: "left" }} />
                        <SearchControl options={{ float: "left" }} />
                        <TrafficControl options={{ float: "right" }} />
                        <RulerControl options={{ float: "right" }} />
                        <TypeSelector options={{ float: "right" }} />
                    </Map>
                </YMaps>
            )}
        </div>
    );
};
