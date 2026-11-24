import { Link, useLocation } from 'react-router-dom';
import { routes } from '../routes.js';

function Breadcrumbs() {
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);
  const paths = ['/', ...segments.map((_, i) => '/' + segments.slice(0, i + 1).join('/'))];

  const crumbs = paths
    .map((path) => routes.find((route) => route.path === path))
    .filter(Boolean);

  if (crumbs.length < 2) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map(({ path, title }, i) => (
          <li key={path}>
            {i === crumbs.length - 1 ? (
              <span aria-current="page">{title}</span>
            ) : (
              <Link to={path}>{title}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
