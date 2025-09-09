import { Link, useNavigate } from "react-router";
import { useUser } from "~/context/UserContext";
import { useApi } from "~/hooks/axios";

export function Navbar() {
  const { logout } = useUser();
  const navigate = useNavigate();
  const { get } = useApi();

  const handleLogout = async () => {
    logout();
    get("auth/logout");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to='/posts' className="btn btn-ghost text-xl mr-2">Posts</Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
