import { cn } from '@bem-react/classname';
import { CalendarIcon, GeoIcon, TicketIcon } from '../../assets';
import moment from 'moment';

import './EventCard.scss';

const cnEventCard = cn('event-card');

export const EventCard = ({ event }) => {
    return (
        <div className={cnEventCard()}>
            <img className={cnEventCard('img')} src={event.img} />
            <div className={cnEventCard('about')}>
                <div className={cnEventCard('title')}>{event.title}</div>
                <div className={cnEventCard('info')}>
                    <CalendarIcon width={14} height={14} />
                    <div className={cnEventCard('description')}>
                        {moment(event.date_event).format('D MMMM YYYY, HH:mm')}
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
            </div>
        </div>
    );
};
