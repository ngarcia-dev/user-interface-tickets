import { useTickets } from "../context/TicketsContext";
import { Link } from "react-router-dom";
import { Card, Heading, Text, Badge, Flex, Button } from "@radix-ui/themes";
import { OpenInNewWindowIcon, TrashIcon } from "@radix-ui/react-icons";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TicketsCard({ ticket }) {
  const { deleteTicket } = useTickets();

  return (
    <Card className="hover:opacity-70">
      <Flex justify="between" align="center">
        <Heading>{ticket.title}</Heading>
        <Flex gap="3">
          <Button
            color="red"
            onClick={() => {
              deleteTicket(ticket.id);
            }}
            className="hover:cursor-pointer"
          >
            <TrashIcon />
          </Button>
          <Link to={`/tickets/${ticket.id}`}>
            <Button className="hover:cursor-pointer">
              <OpenInNewWindowIcon />
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Text>{ticket.description}</Text>
      <Flex justify="between">
        <Text>{dayjs(ticket.updatedAt).utc().format("DD/MM/YYYY HH:mm")}</Text>
        <Flex gap="3">
          <Badge color={ticket.status === "open" ? "green" : "red"}>
            {ticket.status}
          </Badge>
          <Badge color={ticket.executorTicket === null ? "violet" : "blue"}>
            {ticket.executorTicket === null ? "Not assigned" : "Assigned"}
          </Badge>
        </Flex>
      </Flex>
    </Card>
  );
}

export default TicketsCard;
