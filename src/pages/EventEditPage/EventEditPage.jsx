import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import './EventEditPage.scss';
import { resetEventsState } from '../../store/reducers/events';
import { useRole } from '../../hooks/useRole';
import { useLoader } from '../../hooks/useLoader';
import {
    canceledEventAction,
    createEventAction,
    getEventByIdAction,
    patchEventByIdAction,
} from '../../store/actions/events';
import moment from 'moment';
import { deleteEventTicketsAction } from '../../store/actions/tickets';

const cnEventEditPage = cn('event-edit-page');

export const EventEditPage = ({ isCreateMode }) => {
    const dispatch = useDispatch();
    const { id: event_id } = useParams();
    const [eventDelete, setEventDelete] = useState(false);
    const { events, getEventByIdStatus, createEventStatus, patchEventByIdStatus } = useSelector(
        (store) => store.events,
    );
    const { isStaff } = useRole();

    useEffect(() => {
        if (getEventByIdStatus === 'initial' && event_id) {
            dispatch(getEventByIdAction(Number(event_id)));
        }
    }, [dispatch, getEventByIdStatus, event_id]);

    useLoader([getEventByIdStatus, createEventStatus, patchEventByIdStatus]);

    const initialValue = useMemo(() => {
        return events?.length
            ? {
                  title: events[0].title,
                  description: events[0].description,
                  price: String(events[0].price),
                  event_date: moment(events[0].event_date).format('YYYY-MM-DD HH:mm'),
                  duration: String(events[0].duration),
                  place: events[0].place,
                  latitude: events[0].latitude,
                  longitude: events[0].longitude,
                  address: events[0].address,
              }
            : undefined;
    }, [events]);

    const handleFormSubmit = useCallback(
        (value, form) => () => {
            console.log(value);
            if (isCreateMode) {
                dispatch(
                    createEventAction({
                        title: value.title,
                        description: value.description,
                        price: Number(value.price),
                        rating: 4,
                        city: value.city,
                    }),
                );
            }
            if (!isCreateMode && event_id && events?.length) {
                dispatch(
                    patchEventByIdAction({
                        id: Number(event_id),
                        ...value,
                        event_date: moment(value.event_date, 'YYYY-MM-DD HH:mm').format(),
                        price: Number(value.price),
                        duration: Number(value.duration),
                    }),
                );
            }
            form.reset();
        },
        [isCreateMode, event_id, events?.length, dispatch],
    );

    const handleEventDelete = useCallback(() => {
        if (event_id) {
            dispatch(deleteEventTicketsAction(event_id));
            dispatch(canceledEventAction(event_id));
            setEventDelete(true);
        }
    }, [dispatch, event_id]);

    const handleEmptySubmit = useCallback(() => undefined, []);

    useEffect(
        () => () => {
            dispatch(resetEventsState());
        },
        [dispatch],
    );

    if (!isStaff || eventDelete) {
       return <Navigate to="/" />;
    }

    return (
        <div className={cnEventEditPage()}>
            <div className={cnEventEditPage('content')}>
                <div className={cnEventEditPage('title')}>
                    {isCreateMode ? 'Создание нового мероприятия' : 'Изменение мероприятия'}
                </div>
                <Form onSubmit={handleEmptySubmit} initialValues={initialValue}>
                    {({ form, values }) => (
                        <form className={cnEventEditPage('form')}>
                            <Field name="title">
                                {({ input: input_fields }) => (
                                    <input
                                        {...input_fields}
                                        className={cnEventEditPage('input')}
                                        type="text"
                                        placeholder="Название мероприятия"
                                    />
                                )}
                            </Field>
                            <Field name="description">
                                {({ input: input_fields }) => (
                                    <textarea
                                        {...input_fields}
                                        className={cnEventEditPage('input', { textarea: true })}
                                        placeholder="Описание мероприятия"
                                    />
                                )}
                            </Field>
                            <Field name="price">
                                {({ input: input_fields }) => {
                                    input_fields.onChange(
                                        input_fields.value < 1 && input_fields.value.length ? 1 : input_fields.value,
                                    );
                                    return (
                                        <input
                                            {...input_fields}
                                            className={cnEventEditPage('input')}
                                            type="number"
                                            placeholder="Цена"
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="event_date">
                                {({ input: input_fields }) => (
                                    <input
                                        {...input_fields}
                                        className={cnEventEditPage('input')}
                                        type="datetime-local"
                                    />
                                )}
                            </Field>
                            <Field name="duration">
                                {({ input: input_fields }) => {
                                    input_fields.onChange(
                                        input_fields.value < 1 && input_fields.value.length ? 1 : input_fields.value,
                                    );
                                    return (
                                        <input
                                            {...input_fields}
                                            className={cnEventEditPage('input')}
                                            type="number"
                                            placeholder="Длительность"
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="place">
                                {({ input: input_fields }) => (
                                    <input
                                        {...input_fields}
                                        className={cnEventEditPage('input')}
                                        type="text"
                                        placeholder="Место проведения"
                                    />
                                )}
                            </Field>
                            <Field name="latitude">
                                {({ input: input_fields }) => (
                                    <input
                                        {...input_fields}
                                        className={cnEventEditPage('input')}
                                        type="text"
                                        placeholder="Широта"
                                    />
                                )}
                            </Field>
                            <Field name="longitude">
                                {({ input: input_fields }) => (
                                    <input
                                        {...input_fields}
                                        className={cnEventEditPage('input')}
                                        type="text"
                                        placeholder="Долгота"
                                    />
                                )}
                            </Field>
                            <Field name="address">
                                {({ input: input_fields }) => (
                                    <input
                                        {...input_fields}
                                        className={cnEventEditPage('input')}
                                        type="text"
                                        placeholder="Адрес"
                                    />
                                )}
                            </Field>
                            {isCreateMode && (
                                <>
                                    <Field name="remaining_tickets">
                                        {({ input: input_fields }) => {
                                            input_fields.onChange(
                                                input_fields.value < 1 && input_fields.value.length
                                                    ? 1
                                                    : input_fields.value,
                                            );
                                            return (
                                                <input
                                                    {...input_fields}
                                                    className={cnEventEditPage('input')}
                                                    type="number"
                                                    placeholder="Кол-во билетов"
                                                />
                                            );
                                        }}
                                    </Field>
                                    <Field name="img">
                                        {({ input: input_fields }) => {
                                            return (
                                                <input
                                                    {...input_fields}
                                                    type="text"
                                                    className={cnEventEditPage('input')}
                                                    placeholder="Ссылка на обложку"
                                                />
                                            );
                                        }}
                                    </Field>
                                </>
                            )}

                            <button
                                type="button"
                                className={cnEventEditPage('button')}
                                disabled={false}
                                onClick={handleFormSubmit(values, form)}
                            >
                                {isCreateMode ? 'Создать' : 'Сохранить'}
                            </button>
                            {!isCreateMode && (
                                <button
                                    type="button"
                                    className={cnEventEditPage('button', { delete: true })}
                                    onClick={handleEventDelete}
                                >
                                    Отменить мероприятие
                                </button>
                            )}
                            <Link to="/" className={cnEventEditPage('button', { bottom: true })}>
                                Назад
                            </Link>
                        </form>
                    )}
                </Form>
            </div>
        </div>
    );
};
