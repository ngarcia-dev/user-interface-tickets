import axios from "./axios";

export const getTicketsRequest = () => axios.get("/tickets");

export const getTicketRequest = (id) => axios.get(`/tickets/${id}`);

export const createTicketRequest = (ticket) => axios.post("/tickets", ticket);

export const updateTicketRequest = (id, ticket) => axios.put(`/tickets/${id}`, ticket);

export const deleteTicketRequest = (id) => axios.delete(`/tickets/${id}`);

export const assignTicketRequest = (id, ticket) => axios.put(`/tickets/${id}/assign`, ticket);