import { useTickets } from "../context/TicketsContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TicketsCard({ ticket }) {
  const { deleteTicket } = useTickets();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{ticket.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              deleteTicket(ticket._id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            to={`/tickets/${ticket._id}`}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{ticket.description}</p>
      <p>{dayjs(ticket.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
}

export default TicketsCard;
