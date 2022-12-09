import { getApiRequest } from '..';

export const getEvents = async () => {
    return await getApiRequest(`/events/`);
};

export const getEventById = async (event_id) => {
    return await getApiRequest(`/events/${event_id}/`);
};
