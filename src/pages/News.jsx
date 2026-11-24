import { useEffect, useState } from 'react';

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch('/data/news.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load news');
        return response.json();
      })
      .then((data) => {
        if (!ignore) setNews([...data].sort((a, b) => b.date.localeCompare(a.date)));
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="news">
      <h1>News</h1>
      <ul className="news__list">
        {news.map((item) => (
          <li key={item.id} className="news__item">
            <p className="news__meta">
              <time dateTime={item.date}>{formatDate(item.date)}</time>
              <span className="news__category">{item.category}</span>
            </p>
            <h2 className="news__title">{item.title}</h2>
            <p className="news__text">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default News;
