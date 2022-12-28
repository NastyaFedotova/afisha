import { deleteApiRequest, getApiRequest, patchApiRequest, postApiRequest } from '..';

export const getEvents = async (values) => {
    return await getApiRequest(`/events/`, {
        params: {
            event_ids: values?.event_ids?.join(','),
            name: values?.title,
            price_min: values?.priceMin,
            price_max: values?.priceMax,
        },
    });
};

export const getEventById = async (event_id) => {
    return await getApiRequest(`/events/${event_id}/`);
};

export const getEventsPriceRange = async () => {
    return await getApiRequest('/events/price_range/');
};

export const patchEventById = async (params) => {
    const { id_event, ...param } = params;
    return await patchApiRequest(`/events/${id_event}/`, param);
};

export const createEvent = async (params) => {
    return await postApiRequest(`/events/`, params);
};

export const deleteEvent = async (id_event) => {
    return await deleteApiRequest(`/events/${id_event}/`);
};
