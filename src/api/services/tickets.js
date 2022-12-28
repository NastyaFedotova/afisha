import { deleteApiRequest, getApiRequest, patchApiRequest, postApiRequest } from '..';

export const createBookedTickets = async (create_params) => {
    return await postApiRequest(`/tickets/`, create_params);
};

export const getTickets = async (get_params) => {
    return await getApiRequest(`/tickets/`, {
        params: {
            user_id: get_params?.user_id, //фильтр
            ticket_status: get_params?.ticket_status, //фильтр
            event_id: get_params?.event_id,
            status: get_params?.status
        },
    });
};

export const patchTickets = async (patch_params) => {
    //const { id_ticket, ticket_status, date_of_buying } = params;
    const { id_ticket, ...patch_param } = patch_params;
    // {
    //     ticket_status:ticket_status,
    //     date_of_buying:date_of_buying
    // }
    return await patchApiRequest(`/tickets/${id_ticket}/`, patch_param);
};

export const deleteTickets = async (id_ticket) => {
    return await deleteApiRequest(`/tickets/${id_ticket}/`);
};

export const getTicketStatuses = async () => {
    return await getApiRequest(`/tickets/ticket_statuses/`);
};
