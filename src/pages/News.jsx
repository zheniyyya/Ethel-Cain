import Status from '../components/Status.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { formatDate } from '../utils/formatDate.js';

function News() {
  const { data, loading, error } = useFetch('/data/news.json');

  if (loading || error) return <Status loading={loading} error={error} />;

  const news = [...data].sort((a, b) => b.date.localeCompare(a.date));

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
