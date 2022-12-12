import { getApiRequest } from '..';

export const getEvents = async (values) => {
    return await getApiRequest(`/events/`, {
        params: {
            name: values?.name,
            price_min: values?.priceMin,
            price_max: values?.priceMax,
        },
    });
};

export const getEventById = async (event_id) => {
    return await getApiRequest(`/events/${event_id}/`);
};

export const getEventsPriceRange = async ()=>{
    return await getApiRequest('/events-price-range/')
}