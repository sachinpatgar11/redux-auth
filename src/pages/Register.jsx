import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearRegistrationStatus, register } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    registrationLoading,
    registrationError,
    registrationSuccess,
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearRegistrationStatus());
    };
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    const { confirmPassword, ...userData } = formData;

    const result = await dispatch(register(userData));

    if (register.fulfilled.match(result)) {
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">JOIN US</span>
        <h1>Create an account</h1>
        <p className="muted">
          Fill in the details to try the demo registration flow.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          {(validationError || registrationError) && (
            <p className="error-message" role="alert">
              {validationError || registrationError}
            </p>
          )}

          {registrationSuccess && (
            <div className="success-message" role="status">
              <p>
                Demo registration request succeeded. This does not create a
                persistent account. Use the provided demo credentials on the
                login page.
              </p>
              <Link to="/login">Go to Login</Link>
            </div>
          )}

          <button
            className="btn btn-full"
            type="submit"
            disabled={registrationLoading}
          >
            {registrationLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
