import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        AuthApp
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        <Link to="/">Home</Link>

        {isAuthenticated && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <span className="welcome">
              Hi, {user?.firstName || user?.username}
            </span>
            <button onClick={handleLogout} className="btn btn-small">
              Logout
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
