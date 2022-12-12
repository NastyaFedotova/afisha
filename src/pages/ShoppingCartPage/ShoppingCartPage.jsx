import React, { useCallback, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { useLoader } from '../../hooks/useLoader';
import moment from 'moment';
import './ShoppingCartPage.scss';
import { useDispatch } from 'react-redux';
import { deleteTicketsAction, getTicketsAction, patchTicketsAction } from '../../store/actions/tickets';
import { getEventsAction } from '../../store/actions/events';
import { resetEventsState } from '../../store/reducers/events';
import { resetTicketsState } from '../../store/reducers/tickets';
import { Link } from 'react-router-dom';

const cnShoppingCartPage = cn('shopping-cart-page');

export const ShoppingCartPage = () => {
    const dispatch = useDispatch();

    const { tickets, getTicketsStatus, updateTicketStatus, deleteTicketStatus } = useSelector((store) => store.tickets);
    const { events, getEventsStatus } = useSelector((store) => store.events);

    useLoader([getEventsStatus, getTicketsStatus, updateTicketStatus, deleteTicketStatus]);

    useEffect(() => {
        if (getTicketsStatus === 'initial') {
            dispatch(getTicketsAction({ user_id: 1, ticket_status: 'booked' }));
        }
    }, [dispatch, getTicketsStatus]);

    useEffect(() => {
        if (getEventsStatus === 'initial' && Boolean(tickets?.length)) {
            dispatch(getEventsAction({ event_ids: tickets.map((ticket) => ticket.id_event) }));
        }
    }, [dispatch, getEventsStatus, tickets]);

    const handleBoughtTickets = useCallback(
        (id_ticket) => () => {
            dispatch(patchTicketsAction({ id_ticket: id_ticket, ticket_status: 'bought', date_of_buying: moment() }));
        },
        [dispatch],
    );

    const handleRemoveTicketFromShoppingCart = useCallback(
        (id_ticket) => () => {
            dispatch(deleteTicketsAction(id_ticket));
        },
        [dispatch],
    );

    useEffect(
        () => () => {
            dispatch(resetEventsState());
            dispatch(resetTicketsState());
        },
        [dispatch],
    );
    return (
        <div className={cnShoppingCartPage()}>
            <div className={cnShoppingCartPage('breadcrumbs')}>
                <Link to={'/'}>Афиша</Link>
                <div>{'/'}</div>
                <div>Корзина покупок</div>
            </div>
            <div className={cnShoppingCartPage('scroll-container')}>
                <div className={cnShoppingCartPage('container')}>
                    <div className={cnShoppingCartPage('title')}>Забронированные билеты</div>
                    <div className={cnShoppingCartPage('orders')}>
                        {Boolean(events?.length) &&
                            Boolean(tickets?.length) &&
                            tickets.map((ticket, index) => {
                                const event = events.find((event) => event.id_event === ticket.id_event);
                                return (
                                    <div key={index}>
                                        <div className={cnShoppingCartPage('mainInfo')}>
                                            <img src={event.img} className={cnShoppingCartPage('img')} />
                                            <div className={cnShoppingCartPage('info')}>
                                                <div className={cnShoppingCartPage('info-row')}>
                                                    <div className={cnShoppingCartPage('info-title')}>Название:</div>
                                                    <span className={cnShoppingCartPage('info-description')}>
                                                        {event.name}
                                                    </span>
                                                </div>
                                                <div className={cnShoppingCartPage('info-row')}>
                                                    <div className={cnShoppingCartPage('info-title')}>Дата:</div>
                                                    <span className={cnShoppingCartPage('info-description')}>
                                                        {moment(event.date_event).format('D MMMM YYYY, HH:mm')}
                                                    </span>
                                                </div>
                                                {event.place && (
                                                    <div className={cnShoppingCartPage('info-row')}>
                                                        <div className={cnShoppingCartPage('info-title')}>Место:</div>
                                                        <span className={cnShoppingCartPage('info-description')}>
                                                            {event.place}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className={cnShoppingCartPage('info-row')}>
                                                    <div className={cnShoppingCartPage('info-title')}>
                                                        Кол-во билетов:
                                                    </div>
                                                    <span className={cnShoppingCartPage('info-description')}>
                                                        {`${ticket.count}шт.`}
                                                    </span>
                                                </div>
                                                <div className={cnShoppingCartPage('info-row')}>
                                                    <div className={cnShoppingCartPage('info-title')}>
                                                         Суммарная стоимость:
                                                    </div>
                                                    <span className={cnShoppingCartPage('info-description')}>
                                                        {`${ticket.count * event.price}руб.`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cnShoppingCartPage('buttons')}>
                                            <button
                                                type="button"
                                                className={cnShoppingCartPage('button', { action: true })}
                                                onClick={handleBoughtTickets(ticket.id_ticket)}
                                            >
                                                Купить
                                            </button>
                                            <button
                                                type="button"
                                                className={cnShoppingCartPage('button')}
                                                onClick={handleRemoveTicketFromShoppingCart(ticket.id_ticket)}
                                            >
                                                Убрать из корзины
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};
