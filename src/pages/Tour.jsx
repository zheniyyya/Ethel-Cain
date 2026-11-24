import { useRef, useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { formatDate } from '../utils/formatDate.js';

const PAGE_SIZE = 10;

const sorters = {
  'date-asc': (a, b) => a.date.localeCompare(b.date),
  'date-desc': (a, b) => b.date.localeCompare(a.date),
  city: (a, b) => a.city.localeCompare(b.city) || a.date.localeCompare(b.date),
};

function Tour() {
  const { data, loading, error } = useFetch('/data/tour.json');
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState('all');
  const [sort, setSort] = useState('date-asc');
  const [query, setQuery] = useState('');
  const sectionRef = useRef(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const countries = [...new Set(data.map((show) => show.country))].sort();
  const search = query.trim().toLowerCase();
  const shows = data
    .filter((show) => country === 'all' || show.country === country)
    .filter((show) => `${show.city} ${show.country} ${show.venue}`.toLowerCase().includes(search))
    .sort(sorters[sort]);
  const totalPages = Math.ceil(shows.length / PAGE_SIZE);
  const visibleShows = shows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (nextPage) => {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView();
  };

  const changeCountry = (event) => {
    setCountry(event.target.value);
    setPage(1);
  };

  const changeSort = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const changeQuery = (event) => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <section className="tour" ref={sectionRef}>
      <h1>Tour</h1>

      <div className="tour__controls">
        <label className="tour__search">
          Search
          <input
            type="search"
            value={query}
            onChange={changeQuery}
            placeholder="City, country or venue"
          />
        </label>
        <label>
          Country
          <select value={country} onChange={changeCountry}>
            <option value="all">All countries</option>
            {countries.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select value={sort} onChange={changeSort}>
            <option value="date-asc">Date: earliest first</option>
            <option value="date-desc">Date: latest first</option>
            <option value="city">City: A to Z</option>
          </select>
        </label>
      </div>

      {shows.length === 0 && <p>No shows found.</p>}
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
