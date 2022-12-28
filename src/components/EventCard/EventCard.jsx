import { cn } from '@bem-react/classname';
import { CalendarIcon, GeoIcon, TicketIcon } from '../../assets';
import moment from 'moment';

import './EventCard.scss';
import { Link } from 'react-router-dom';

const cnEventCard = cn('event-card');

export const EventCard = ({ event, isStaff }) => {
    return (
        <div className={cnEventCard()}>
            <img className={cnEventCard('img')} src={event.img} />
            <div className={cnEventCard('about')}>
                <div className={cnEventCard('title')}>{`${event.title} ${event.cancelled ? '(Отменено)' : ''}`}</div>
                <div className={cnEventCard('info')}>
                    <CalendarIcon width={14} height={14} />
                    <div className={cnEventCard('description')}>
                        {moment(event.event_date).format('D MMMM YYYY, HH:mm')}
                    </div>
                </div>
                <div className={cnEventCard('info')}>
                    <GeoIcon />
                    <div className={cnEventCard('description')}>{event.place}</div>
                </div>
                <div className={cnEventCard('info')}>
                    <TicketIcon height={18} />
                    <div className={cnEventCard('description')}>{`${event.remaining_tickets} билетов`}</div>
                </div>
                {isStaff && !event.cancelled && moment().add(1, 'week').isBefore(event.event_date) && (
                    <Link to={`/event/edit/${event.id}`} className={cnEventCard('edit')}>
                        Редактирование
                    </Link>
                )}
            </div>
        </div>
    );
};
