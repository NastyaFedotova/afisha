import { cn } from '@bem-react/classname';

import './EventCard.scss';

const cnEventCard = cn('event-card');

export const EventCard = ({ event }) => {
    return (
        <div className={cnEventCard()}>
            <img className={cnEventCard('img')} src={event.img} />
            <div className={cnEventCard('about')}>
                <div className={cnEventCard('title')}>{event.name}</div>
                <div className={cnEventCard('duration')}>{`Длительность - ${event.duration}ч.`}</div>
                <div className={cnEventCard('price')}>{`Цена - ${event.price}руб.`}</div>
            </div>
        </div>
    );
};
