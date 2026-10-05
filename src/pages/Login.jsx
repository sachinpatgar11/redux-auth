import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearAuthError, login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      const destination = location.state?.from;

      // Only accept a local application path.
      const safePath =
        destination?.pathname?.startsWith("/") &&
        !destination.pathname.startsWith("//")
          ? destination.pathname
          : "/dashboard";

      navigate(safePath, { replace: true });
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">WELCOME BACK</span>
        <h1>Login to your account</h1>
        <p className="muted">
          Enter your demo account credentials to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn-full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="form-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <div className="demo-credentials">
          <strong>Demo credentials</strong>
          <p>Username: emilys</p>
          <p>Password: emilyspass</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
