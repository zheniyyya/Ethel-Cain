import { Link, NavLink } from 'react-router-dom';

function MenuTree({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.to}>
          {item.to.includes('#') ? (
            <Link to={item.to}>{item.title}</Link>
          ) : (
            <NavLink to={item.to} end>
              {item.title}
            </NavLink>
          )}
          {item.children && <MenuTree items={item.children} />}
        </li>
      ))}
    </ul>
  );
}

function Sidebar({ items, label = 'Site map' }) {
  return (
    <aside className="sidebar">
      <nav aria-label={label}>
        <MenuTree items={items} />
      </nav>
    </aside>
  );
}

export default Sidebar;
