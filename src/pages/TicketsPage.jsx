import { useEffect } from "react";
import { useTickets } from "../context/TicketsContext";
import TicketsCard from "../components/TicketsCard";

function TicketsPage() {
  const { getTickets, tickets } = useTickets();

  useEffect(() => {
    getTickets();
  }, []);

  if (tickets.length === 0) return <h1>No tickets</h1>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tickets.map((ticket) => (
        <TicketsCard ticket={ticket} key={ticket.id} />
      ))}
    </div>
  );
}

export default TicketsPage;
