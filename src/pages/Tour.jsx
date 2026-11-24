import { useRef, useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { formatDate } from '../utils/formatDate.js';

const PAGE_SIZE = 10;

function Tour() {
  const { data, loading, error } = useFetch('/data/tour.json');
  const [page, setPage] = useState(1);
  const sectionRef = useRef(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const shows = [...data].sort((a, b) => a.date.localeCompare(b.date));
  const totalPages = Math.ceil(shows.length / PAGE_SIZE);
  const visibleShows = shows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (nextPage) => {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView();
  };

  return (
    <section className="tour" ref={sectionRef}>
      <h1>Tour</h1>
      {shows.length === 0 && <p>No shows yet.</p>}
      <ul className="tour__list">
        {visibleShows.map((show) => (
          <li key={show.id} className="tour__item">
            <time className="tour__date" dateTime={show.date}>
              {formatDate(show.date)}
            </time>
            <div>
              <h2 className="tour__city">
                {show.city}, {show.country}
              </h2>
              {show.venue && <p className="tour__venue">{show.venue}</p>}
            </div>
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} onChange={changePage} />
    </section>
  );
}

export default Tour;
