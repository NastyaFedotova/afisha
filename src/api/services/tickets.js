import { deleteApiRequest, getApiRequest, patchApiRequest, postApiRequest } from '..';

export const createBookedTickets = async (params) => {
    return await postApiRequest(`/tickets/`, params);
};

export const getTickets = async (params) => {
    return await getApiRequest(`/tickets/`, {
        params: {
            user_id: params?.user_id,
            ticket_status: params?.ticket_status,
        },
    });
};

export const patchTickets = async (params) => {
    const { id_ticket, ...param } = params;
    return await patchApiRequest(`/tickets/${id_ticket}/`, param);
};

export const deleteTickets = async (id_ticket) => {
    return await deleteApiRequest(`/tickets/${id_ticket}/`);
};
