import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { formatDate } from '../utils/formatDate.js';

const today = new Date().toISOString().slice(0, 10);

function Home() {
  const { data: albums } = useFetch('/data/albums.json');
  const { data: news } = useFetch('/data/news.json');
  const { data: tour } = useFetch('/data/tour.json');

  const latestAlbum = albums && [...albums].sort((a, b) => b.year - a.year || b.id - a.id)[0];
  const latestNews = news && [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const upcomingShows =
    tour && tour.filter((show) => show.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="home">
      <section className="home__intro">
        <h1>Ethel Cain</h1>
        <p className="home__lead">
          Southern gothic stories, slow-burning rock and haunted ambient soundscapes. Welcome to the
          fan site: biography, music, news and tour dates in one place.
        </p>
        <div className="home__actions">
          <Link to="/about/biography" className="button">
            Biography
          </Link>
          <Link to="/tour" className="button button--outline">
            Tour dates
          </Link>
        </div>
      </section>

      <div className="home__grid">
        {latestAlbum && (
          <section>
            <h2 className="home__heading">Latest release</h2>
            <Link to="/about/discography" className="home__release">
              <img src={latestAlbum.cover} alt={latestAlbum.title} loading="lazy" />
              <div>
                <h3>{latestAlbum.title}</h3>
                <p>
                  {latestAlbum.type} · {latestAlbum.year}
                </p>
              </div>
            </Link>
          </section>
        )}

        {latestNews && (
          <section>
            <h2 className="home__heading">Latest news</h2>
            <ul className="home__news">
              {latestNews.map((item) => (
                <li key={item.id}>
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                  <Link to="/news">{item.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {upcomingShows && upcomingShows.length > 0 && (
        <section>
          <h2 className="home__heading">Upcoming shows</h2>
          <ul className="home__shows">
            {upcomingShows.slice(0, 3).map((show) => (
              <li key={show.id}>
                <time dateTime={show.date}>{formatDate(show.date)}</time>
                <span>
                  {show.city}, {show.country}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/tour">All tour dates</Link>
        </section>
      )}
    </div>
  );
}

export default Home;
