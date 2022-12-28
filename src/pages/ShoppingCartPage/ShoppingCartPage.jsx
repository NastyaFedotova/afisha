import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { useLoader } from '../../hooks/useLoader';
import moment from 'moment';
import './ShoppingCartPage.scss';
import { useDispatch } from 'react-redux';
import {
    deleteTicketsAction,
    getCancelledTicketsAction,
    getTicketsAction,
    getTicketStatusesAction,
    patchCancelledTicketsAction,
    patchTicketsAction,
} from '../../store/actions/tickets';
import { getEventsAction, patchEventByIdAction } from '../../store/actions/events';
import { resetEventsState } from '../../store/reducers/events';
import { resetTicketsState } from '../../store/reducers/tickets';
import { Link } from 'react-router-dom';
import { DropdownSelect } from '../../components/DropdownSelect/DropdownSelect';
import { useRole } from '../../hooks/useRole';

const cnShoppingCartPage = cn('shopping-cart-page');

export const ShoppingCartPage = () => {
    const dispatch = useDispatch();

    const [dropdownValue, setDropdownValue] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const {
        tickets,
        getTicketsStatus,
        updateTicketStatus,
        deleteTicketStatus,
        patchEventByIdStatus,
        getTicketStatusesStatus,
        ticketStatuses,
        cancelledTickets,
        getCancelledTicketStatus,
    } = useSelector((store) => store.tickets);
    const { events, getEventsStatus } = useSelector((store) => store.events);

    const { isStaff } = useRole();

    useLoader([
        getEventsStatus,
        getTicketsStatus,
        updateTicketStatus,
        deleteTicketStatus,
        patchEventByIdStatus,
        getTicketStatusesStatus,
        getCancelledTicketStatus,
    ]);

    const { user } = useSelector((store) => store.user);

    useEffect(() => {
        if (getTicketsStatus === 'initial') {
            dispatch(getTicketsAction({ user_id: user?.id }));
        }
    }, [dispatch, getTicketsStatus, user?.id]);

    useEffect(() => {
        if (getCancelledTicketStatus === 'initial') {
            dispatch(getCancelledTicketsAction());
        }
    }, [dispatch, getCancelledTicketStatus, getTicketsStatus, user.id]);

    useEffect(() => {
        if (getEventsStatus === 'initial' && Boolean(tickets?.length)) {
            dispatch(getEventsAction({ event_ids: tickets?.map((ticket) => ticket.event) }));
        }
    }, [dispatch, getEventsStatus, tickets]);

    useEffect(() => {
        if (getTicketStatusesStatus === 'initial') {
            dispatch(getTicketStatusesAction());
        }
    }, [dispatch, getTicketStatusesStatus]);

    const handleBoughtTickets = useCallback(
        (id_ticket, remaining_tickets) => () => {
            switch (dropdownValue) {
                case 'BOOKED':
                    dispatch(
                        patchTicketsAction({
                            id_ticket: id_ticket,
                            status: 'BOUGHT',
                            buying_date: moment(),
                        }),
                    );
                    return;
                case 'CANCELLED':
                    dispatch(
                        patchTicketsAction({
                            id_ticket: id_ticket,
                            status: 'REFUND',
                            remaining_tickets,
                        }),
                    );
                    return;
                default:
                    return;
            }
        },
        [dispatch, dropdownValue],
    );

    const handleRemoveTicketFromShoppingCart = useCallback(
        (id_ticket, id_event, remaining_tickets) => () => {
            switch (dropdownValue) {
                case 'BOOKED':
                    dispatch(patchEventByIdAction({ id_event, remaining_tickets }));
                    dispatch(deleteTicketsAction(id_ticket));
                    return;
                case 'BOUGHT':
                    dispatch(
                        patchTicketsAction({
                            id_ticket: id_ticket,
                            status: 'CANCELLED',
                        }),
                    );
                    return;
                case 'CANCELLED':
                    dispatch(
                        patchCancelledTicketsAction({
                            id_ticket: id_ticket,
                            status: 'BOUGHT',
                        }),
                    );
                    return;
                default:
                    return;
            }
        },
        [dispatch, dropdownValue],
    );

    const handleDropDownChange = useCallback(
        (value) => {
            setDropdownValue(ticketStatuses?.find((status) => status.label === value)?.value);
        },
        [ticketStatuses],
    );

    const dropdownOptions = useMemo(() => ticketStatuses?.map((status) => status.label), [ticketStatuses]);

    const handleStartDateChange = useCallback((event) => {
        setStartDate(event.target.value);
    }, []);

    const handleEndDateChange = useCallback((event) => {
        setEndDate(event.target.value);
    }, []);

    const ticketsFiltered = useMemo(() => {
        return dropdownValue === 'CANCELLED' && isStaff
            ? cancelledTickets
            : tickets?.filter(
                  (ticket) =>
                      ticket?.status === dropdownValue &&
                      (startDate && dropdownValue === 'BOUGHT'
                          ? moment(ticket?.date_of_signing).isSameOrAfter(startDate, 'days')
                          : true) &&
                      (endDate && dropdownValue === 'BOUGHT'
                          ? moment(ticket?.date_of_signing).isSameOrBefore(endDate, 'days')
                          : true),
              ) ?? [];
    }, [cancelledTickets, dropdownValue, endDate, isStaff, startDate, tickets]);

    const redButtonText = useMemo(() => {
        switch (dropdownValue) {
            case 'BOUGHT':
                return 'Запросить возврат';
            case 'CANCELLED':
                return 'Отказать';
            default:
                return 'Убрать из корзины';
        }
    }, [dropdownValue]);

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
                    <div className={cnShoppingCartPage('filters')}>
                        {dropdownOptions?.length && (
                            <DropdownSelect options={dropdownOptions} onChange={handleDropDownChange} />
                        )}
                        {dropdownValue === 'BOUGHT' && (
                            <>
                                <input
                                    type="date"
                                    className={cnShoppingCartPage('date')}
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                                <input
                                    type="date"
                                    className={cnShoppingCartPage('date')}
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </>
                        )}
                    </div>
                    <div className={cnShoppingCartPage('orders')}>
                        {Boolean(events?.length) &&
                            Boolean(ticketsFiltered?.length) &&
                            ticketsFiltered.map((ticket, index) => {
                                const event = events.find((event) => event.id === ticket.event);
                                return (
                                    <div key={index}>
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
                                            {(dropdownValue === 'BOOKED' ||
                                                (isStaff && dropdownValue === 'CANCELLED')) && (
                                                <button
                                                    type="button"
                                                    className={cnShoppingCartPage('button', { action: true })}
                                                    onClick={handleBoughtTickets(
                                                        ticket.id,
                                                        event.remaining_tickets + ticket.count,
                                                    )}
                                                >
                                                    {dropdownValue === 'BOOKED' ? 'Оплатить' : 'Одобрить возврат'}
                                                </button>
                                            )}
                                            {(isStaff
                                                ? dropdownValue !== 'REFUND'
                                                : dropdownValue === 'BOOKED' || dropdownValue === 'BOUGHT') &&
                                                (dropdownValue === 'BOUGHT'
                                                    ? moment().add(3, 'day').isBefore(event.event_date)
                                                    : true) && (
                                                    <button
                                                        type="button"
                                                        className={cnShoppingCartPage('button')}
                                                        onClick={handleRemoveTicketFromShoppingCart(
                                                            ticket.id,
                                                            event.id,
                                                            event.remaining_tickets + ticket.count,
                                                        )}
                                                    >
                                                        {redButtonText}
                                                    </button>
                                                )}
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
