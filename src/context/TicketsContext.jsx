import { createContext, useContext, useState } from "react";
import {
  createTicketRequest,
  deleteTicketRequest,
  getTicketRequest,
  getTicketsRequest,
  updateTicketRequest,
  assignTicketRequest,
} from "../api/tickets";

const TicketContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }

  return context;
};

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const res = await getTicketsRequest();
      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTicket = async (ticket) => {
    const res = await createTicketRequest(ticket);
    if (res.status === 201) setTickets([...tickets, res.data]);
    console.log(res.data);
  };

  const deleteTicket = async (id) => {
    try {
      const res = await deleteTicketRequest(id);
      if (res.status === 204)
        setTickets(tickets.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTicket = async (id) => {
    try {
      const res = await getTicketRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTicket = async (id, ticket) => {
    try {
      await updateTicketRequest(id, ticket);
    } catch (error) {
      console.log(error);
    }
  };

  const assignTicket = async (id, ticket) => {
    try {
      await assignTicketRequest(id, ticket);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        getTickets,
        createTicket,
        deleteTicket,
        getTicket,
        updateTicket,
        assignTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
