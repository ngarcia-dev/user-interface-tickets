import { useEffect } from "react";
import { useTickets } from "../context/TicketsContext";
import TicketsCard from "../components/TicketsCard";

import { Grid } from "@radix-ui/themes";

function TicketsPage() {
  const { getTickets, tickets } = useTickets();

  useEffect(() => {
    getTickets();
  }, []);

  if (tickets.length === 0) return <h1>No tickets</h1>;

  return (
    <div>
      <Grid
        columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
        gap="3"
        width="auto"
      >
        {tickets.map((ticket) => (
          <TicketsCard ticket={ticket} key={ticket.id} />
        ))}
      </Grid>
    </div>
  );
}

export default TicketsPage;
