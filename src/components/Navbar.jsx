import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link
        className="flex items-center"
        to={isAuthenticated ? "/tickets" : "/login"}
      >
        <h1 className="text-2xl font-bold item">Ticket Manager</h1>
      </Link>
      <ul className="flex gap-x-2 flex-wrap gap-3 m-3">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile">Welcome {user.username}</Link>
            </li>
            <li>
              <Link
                to="/dependencies"
                className="bg-indigo-500 px-2 py-1 rounded-sm"
              >
                Dependencias
              </Link>
            </li>
            <li>
              <Link
                to="/add-ticket"
                className="bg-indigo-500 px-2 py-1 rounded-sm"
              >
                Add Ticket
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-red-500 px-1 py-1 rounded-sm"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
