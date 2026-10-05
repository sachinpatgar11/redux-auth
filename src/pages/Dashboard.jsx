import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="content-page">
      <span className="eyebrow">PRIVATE AREA</span>

      <h1>Welcome, {user?.firstName || user?.username}!</h1>

      <p className="muted">
        You have accessed a protected page because the demo application
        currently has an authenticated session.
      </p>

      <div className="feature-grid">
        <article className="feature-card">
          <h3>Authentication</h3>
          <p>Your demo login state is active.</p>
        </article>

        <article className="feature-card">
          <h3>Profile</h3>
          <p>View the user information returned by the API.</p>
          <Link to="/profile">View Profile →</Link>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
