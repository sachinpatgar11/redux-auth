import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <section className="hero">
      <span className="eyebrow">REACT AUTHENTICATION PROJECT</span>

      <h1>
        Secure access.
        <br />
        Simple experience.
      </h1>

      <p>
        Explore login, registration, protected routes, Redux state management,
        and session persistence.
      </p>

      {isAuthenticated ? (
        <Link to="/dashboard" className="btn">
          Go to Dashboard
        </Link>
      ) : (
        <div className="hero-actions">
          <Link to="/login" className="btn">
            Get Started
          </Link>

          <Link to="/register" className="btn btn-secondary">
            Create Account
          </Link>
        </div>
      )}

      {isAuthenticated && (
        <p className="success-message">
          Welcome back, {user?.firstName || user?.username}!
        </p>
      )}

      <div className="feature-grid">
        <article className="feature-card">
          <h3>Authentication</h3>
          <p>Validate credentials through an API.</p>
        </article>

        <article className="feature-card">
          <h3>Protected Routes</h3>
          <p>Control access to private pages.</p>
        </article>

        <article className="feature-card">
          <h3>Redux Toolkit</h3>
          <p>Manage shared authentication state.</p>
        </article>
      </div>
    </section>
  );
};

export default Home;
