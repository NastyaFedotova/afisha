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

    const { tickets, getTicketsStatus, updateTicketStatus, deleteTicketStatus, patchEventByIdStatus } = useSelector(
        (store) => store.tickets,
    );
    const { events, getEventsStatus } = useSelector((store) => store.events);

    useLoader([getEventsStatus, getTicketsStatus, updateTicketStatus, deleteTicketStatus, patchEventByIdStatus]);

    const {user} =useSelector((store)=>store.user)

    useEffect(() => {
        if (getTicketsStatus === 'initial') {
            dispatch(getTicketsAction({ user_id: user?.id, status: 'BOOKED' }));
        }
    }, [dispatch, getTicketsStatus, user?.id]);

    useEffect(() => {
        if (getEventsStatus === 'initial' && Boolean(tickets?.length)) {
            dispatch(getEventsAction({ event_ids: tickets.map((ticket) => ticket.event) }));
        }
    }, [dispatch, getEventsStatus, tickets]);

    const handleBoughtTickets = useCallback(
        (id_ticket) => () => {
            dispatch(
                patchTicketsAction({
                    id_ticket: id_ticket,
                    status: 'BOUGHT',
                    buying_date: moment(),
                }),
            );
        },
        [dispatch],
    );

    const handleRemoveTicketFromShoppingCart = useCallback(
        (id_ticket, id_event, remaining_tickets) => () => {
            dispatch(deleteTicketsAction({ id_ticket, id_event, remaining_tickets }));
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
                                const event = events.find((event) => event.id === ticket.event);
                                return (
                                    <div key={index}>
                                        {event.remaining_tickets}
                                        <div className={cnShoppingCartPage('mainInfo')}>
                                            <img src={event.img} className={cnShoppingCartPage('img')} />
                                            <div className={cnShoppingCartPage('info')}>
                                                <div className={cnShoppingCartPage('info-row')}>
                                                    <div className={cnShoppingCartPage('info-title')}>Название:</div>
                                                    <span className={cnShoppingCartPage('info-description')}>
                                                        {event.title}
                                                    </span>
                                                </div>
                                                <div className={cnShoppingCartPage('info-row')}>
                                                    <div className={cnShoppingCartPage('info-title')}>Дата:</div>
                                                    <span className={cnShoppingCartPage('info-description')}>
                                                        {moment(event.event_date).format('D MMMM YYYY, HH:mm')}
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
                                                onClick={handleBoughtTickets(ticket.id)}
                                            >
                                                Оплатить
                                            </button>
                                            <button
                                                type="button"
                                                className={cnShoppingCartPage('button')}
                                                onClick={handleRemoveTicketFromShoppingCart(
                                                    ticket.id,
                                                    event.id,
                                                    event.remaining_tickets + ticket.count,
                                                )}
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
