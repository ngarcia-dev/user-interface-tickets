import axios from "./axios";

export const getTicketsRequest = () => axios.get("/tickets");

export const getTicketsInternalSecRequest = () =>
  axios.get("/tickets-internalsec");

export const getTicketsDependencyRequest = () =>
  axios.get("/tickets-dependency");

export const getTicketRequest = (id) => axios.get(`/tickets/${id}`);

export const createTicketRequest = (ticket) => axios.post("/tickets", ticket);

export const updateTicketRequest = (id, ticket) =>
  axios.patch(`/tickets/${id}`, ticket);

export const deleteTicketRequest = (id) => axios.delete(`/tickets/${id}`);

export const assignTicketRequest = (id, ticket) =>
  axios.patch(`/tickets/${id}/assign`, ticket);
