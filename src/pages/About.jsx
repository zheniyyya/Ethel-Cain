import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';

function About() {
  const { data: albums } = useFetch('/data/albums.json');

  const years = albums ? albums.map((album) => album.year) : [];
  const facts = albums && [
    { value: albums.length, label: 'Releases' },
    { value: Math.min(...years), label: 'First release' },
    { value: Math.max(...years), label: 'Latest release' },
  ];

  return (
    <section className="about">
      <h1>About Ethel Cain</h1>

      <p className="about__lead">
        Ethel Cain is the stage name of Hayden Anhedönia, an American singer, songwriter and
        producer. Her music blends Southern gothic storytelling, slow-burning rock and haunted
        ambient soundscapes, all told through the life of a fictional woman named Ethel.
      </p>

      {facts && (
        <ul className="about__facts">
          {facts.map((fact) => (
            <li key={fact.label}>
              <span className="about__fact-value">{fact.value}</span>
              <span className="about__fact-label">{fact.label}</span>
            </li>
          ))}
        </ul>
      )}

      <ul className="about__links">
        <li>
          <Link to="/about/biography" className="about__card">
            <img src="/images/hero-3.jpg" alt="" loading="lazy" />
            <div className="about__card-body">
              <h2>Biography</h2>
              <p>Growing up in a Southern Baptist family in Florida and becoming Ethel Cain.</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/about/discography" className="about__card">
            <img src="/images/albums/preachers-daughter.webp" alt="" loading="lazy" />
            <div className="about__card-body">
              <h2>Discography</h2>
              <p>Every EP and album, from Carpet Bed to Willoughby Tucker, I'll Always Love You.</p>
            </div>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default About;
