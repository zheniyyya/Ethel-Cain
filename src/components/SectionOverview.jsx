import SafeImage from './SafeImage.jsx';
import { Link } from 'react-router-dom';

function SectionOverview({ title, lead, facts, links }) {
  return (
    <section className="overview">
      <h1>{title}</h1>
      <p className="overview__lead">{lead}</p>

      {facts && (
        <ul className="overview__facts">
          {facts.map((fact) => (
            <li key={fact.label}>
              <span className="overview__fact-value">{fact.value}</span>
              <span className="overview__fact-label">{fact.label}</span>
            </li>
          ))}
        </ul>
      )}

      <ul className="overview__links">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="overview__card">
              <SafeImage src={link.image} alt="" loading="lazy" />
              <div className="overview__card-body">
                <h2>{link.title}</h2>
                <p>{link.text}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SectionOverview;
