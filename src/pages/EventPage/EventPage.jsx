import React, { useEffect, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { useDispatch, useSelector } from 'react-redux';
import './EventPage.scss';
import { getEventByIdAction } from '../../store/actions/events';
import { Link, useParams } from 'react-router-dom';
import { resetEventsState } from '../../store/reducers/events';
import {
    YMaps,
    Map,
    Placemark,
    GeolocationControl,
    RulerControl,
    TrafficControl,
    SearchControl,
    TypeSelector,
} from '@pbe/react-yandex-maps';
import moment from 'moment';

const cnEventPage = cn('event-page');

export const EventPage = () => {
    const dispatch = useDispatch();

    const params = useParams();
    const { id: event_id } = params;

    const { events, getEventByIdStatus } = useSelector((store) => store.events);
    console.log('render');

    useEffect(() => {
        if (getEventByIdStatus === 'initial' && event_id) {
            console.log(event_id);
            dispatch(getEventByIdAction(event_id));
        }
    }, [dispatch, getEventByIdStatus, event_id]);

    const eventInfo = useMemo(() => {
        console.log('update memo');
        return events !== undefined ? events[0] : undefined;
    }, [events]);

    useEffect(() => {
        return () => dispatch(resetEventsState());
    }, [dispatch]);
    
    return (
        <div className={cnEventPage()}>
            <div className={cnEventPage('breadcrumbs')}>
                <Link to={'/'}>Афиша</Link>
                <div>{'/'}</div>
                {eventInfo?.name && <div>{eventInfo.name}</div>}
            </div>
            <div className={cnEventPage('scroll-container')}>
                <div className={cnEventPage('container')}>
                    {eventInfo !== undefined && (
                        <>
                            <div className={cnEventPage('title')}>{eventInfo.name}</div>
                            <div className={cnEventPage('mainInfo')}>
                                <img src={eventInfo.img} className={cnEventPage('img')} />
                                <div className={cnEventPage('info')}>
                                    <div>
                                        <div className={cnEventPage('info-title')}>Дата</div>
                                        <span className={cnEventPage('info-description')}>
                                            {moment(eventInfo.date_event).format('D MMMM YYYY, HH:mm')}
                                        </span>
                                    </div>
                                    {eventInfo.place && (
                                        <div>
                                            <div className={cnEventPage('info-title')}>Место</div>
                                            <span className={cnEventPage('info-description')}>{eventInfo.place}</span>
                                        </div>
                                    )}

                                    <div>
                                        <div className={cnEventPage('info-title')}>Адрес</div>
                                        <span className={cnEventPage('info-description')}>{eventInfo.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cnEventPage('about')}>
                                <div className={cnEventPage('about-title')}>О событии</div>
                                <div className={cnEventPage('about-description')}>{eventInfo.description}</div>
                            </div>
                            <div className={cnEventPage('about')}>
                                <div className={cnEventPage('about-title')}>Как добраться</div>
                                <YMaps>
                                    <Map
                                        defaultState={{
                                            center: [eventInfo.latitude, eventInfo.longitude],
                                            zoom: 14,
                                            controls: ['zoomControl', 'fullscreenControl'],
                                        }}
                                        modules={['control.ZoomControl', 'control.FullscreenControl']}
                                        style={{ width: '100%', height: 400 }}
                                    >
                                        <Placemark defaultGeometry={[eventInfo.latitude, eventInfo.longitude]} />
                                        <GeolocationControl options={{ float: 'left' }} />
                                        <SearchControl options={{ float: 'left' }} />
                                        <TrafficControl options={{ float: 'right' }} />
                                        <RulerControl options={{ float: 'right' }} />
                                        <TypeSelector options={{ float: 'right' }} />
                                    </Map>
                                </YMaps>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
