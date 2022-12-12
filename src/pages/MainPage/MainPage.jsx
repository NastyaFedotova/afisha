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
    const { isAuthorized } = useSelector((store) => store.auth);

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
                            {({ input: input_fields }) => (
                                <input
                                    {...input_fields}
                                    className={cnMainPage('filter-input')}
                                    type="text"
                                    placeholder="Название мероприятия"
                                    disabled={!isAuthorized}
                                />
                            )}
                        </Field>
                        <Field name="priceMin">
                            {({ input: input_fields }) => {
                                input_fields.onChange(
                                    input_fields.value < eventsPriceRange?.price_min && input_fields.value.length
                                        ? eventsPriceRange?.price_min
                                        : input_fields.value,
                                );
                                return (
                                    <input
                                        {...input_fields}
                                        className={cnMainPage('filter-input')}
                                        type="number"
                                        placeholder={`Мин. цена ${eventsPriceRange?.price_min}руб.`}
                                        disabled={!isAuthorized}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="priceMax">
                            {({ input: input_fields }) => {
                                input_fields.onChange(
                                    input_fields.value > eventsPriceRange?.price_max
                                        ? eventsPriceRange?.price_max
                                        : input_fields.value,
                                );
                                return (
                                    <input
                                        {...input_fields}
                                        className={cnMainPage('filter-input')}
                                        type="number"
                                        placeholder={`Макс. цена ${eventsPriceRange?.price_max}руб.`}
                                        disabled={!isAuthorized}
                                    />
                                );
                            }}
                        </Field>
                        <button type="submit" className={cnMainPage('filter-button')} disabled={!isAuthorized}>
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
