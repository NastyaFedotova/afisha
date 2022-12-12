import React, { useCallback, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsAction, getEventsPriceRangeAction } from '../../store/actions/events';
import { EventCard } from '../../components/EventCard';
import './MainPage.scss';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { resetEventsState } from '../../store/reducers/events';
import { PageLoader } from '../../components/PageLoader';
import { useLoader } from '../../hooks/useLoader';

const cnMainPage = cn('main-page');

export const MainPage = () => {
    const dispatch = useDispatch();
    const { events, getEventsStatus, eventsPriceRange, getEventsPriceRangeStatus } = useSelector(
        (store) => store.events,
    );

    useLoader([getEventsStatus, getEventsPriceRangeStatus]);

    useEffect(() => {
        if (getEventsStatus === 'initial') {
            dispatch(getEventsAction());
        }
    }, [dispatch, getEventsStatus]);

    useEffect(() => {
        if (getEventsPriceRangeStatus === 'initial') {
            dispatch(getEventsPriceRangeAction());
        }
    }, [dispatch, getEventsPriceRangeStatus]);

    const handleFormSubmit = useCallback((values) => dispatch(getEventsAction(values)), [dispatch]);

    useEffect(() => () => dispatch(resetEventsState()), [dispatch]);

    return (
        <div className={cnMainPage()}>
            <PageLoader />
            <Form onSubmit={handleFormSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={cnMainPage('filter-row')}>
                        <Field name="name">
                            {({ input }) => (
                                <input
                                    {...input}
                                    className={cnMainPage('filter-input')}
                                    type="text"
                                    placeholder="Название мероприятия"
                                />
                            )}
                        </Field>
                        <Field name="priceMin">
                            {({ input }) => {
                                input.onChange(
                                    input.value < eventsPriceRange?.price_min && input.value.length
                                        ? eventsPriceRange?.price_min
                                        : input.value,
                                );
                                return (
                                    <input
                                        {...input}
                                        className={cnMainPage('filter-input')}
                                        type="number"
                                        placeholder={`Мин. цена ${eventsPriceRange?.price_min}руб.`}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="priceMax">
                            {({ input }) => {
                                input.onChange(
                                    input.value > eventsPriceRange?.price_max
                                        ? eventsPriceRange?.price_max
                                        : input.value,
                                );
                                return (
                                    <input
                                        {...input}
                                        className={cnMainPage('filter-input')}
                                        type="number"
                                        placeholder={`Макс. цена ${eventsPriceRange?.price_max}руб.`}
                                    />
                                );
                            }}
                        </Field>
                        <button type="submit" className={cnMainPage('filter-button')}>
                            Поиск
                        </button>
                    </form>
                )}
            </Form>
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
