import { cn } from '@bem-react/classname';
import { CalendarIcon, GeoIcon } from '../../assets';
import moment from 'moment';

import './EventCard.scss';

const cnEventCard = cn('event-card');

export const EventCard = ({ event }) => {
    return (
        <div className={cnEventCard()}>
            <img className={cnEventCard('img')} src={event.img} />
            <div className={cnEventCard('about')}>
                <div className={cnEventCard('title')}>{event.name}</div>
                <div className={cnEventCard('info')}>
                    <CalendarIcon width={14} height={14} />
                    <div className={cnEventCard('duration')}>
                        {moment(event.date_event).format('D MMMM YYYY, HH:mm')}
                    </div>
                </div>
                <div className={cnEventCard('info')}>
                    <GeoIcon />
                    <div className={cnEventCard('price')}>{event.place}</div>
                </div>
            </div>
        </div>
    );
};
