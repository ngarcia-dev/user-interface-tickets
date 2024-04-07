import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function DependenciesCard({ dependency }) {
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{dependency.name}</h1>
        <div className="flex gap-x-2 items-center">
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            to={`/dependencies/${dependency.id}`}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{dependency.description}</p>
    </div>
  );
}

export default DependenciesCard;
