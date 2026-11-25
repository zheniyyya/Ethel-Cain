import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for has wandered off somewhere into the fields.</p>
      <Link to="/" className="button">
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
