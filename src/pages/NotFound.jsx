import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="content-page not-found">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p className="muted">The page you're looking for doesn't exist.</p>
      <Link className="btn" to="/">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
