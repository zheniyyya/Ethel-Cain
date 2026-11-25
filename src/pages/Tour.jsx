import Pagination from '../components/Pagination.jsx';
import SearchField from '../components/SearchField.jsx';
import SelectField from '../components/SelectField.jsx';
import Status from '../components/Status.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { useListView } from '../hooks/useListView.js';
import { formatDate } from '../utils/formatDate.js';
import { uniqueValues } from '../utils/uniqueValues.js';

const sortOptions = [
  {
    value: 'date-asc',
    label: 'Date: earliest first',
    compare: (a, b) => a.date.localeCompare(b.date),
  },
  {
    value: 'date-desc',
    label: 'Date: latest first',
    compare: (a, b) => b.date.localeCompare(a.date),
  },
  {
    value: 'city',
    label: 'City: A to Z',
    compare: (a, b) => a.city.localeCompare(b.city) || a.date.localeCompare(b.date),
  },
];

function Tour() {
  const { data, loading, error } = useFetch('/data/tour.json');
  const { listRef, ...list } = useListView(data ?? [], {
    pageSize: 10,
    searchKeys: ['city', 'country', 'venue'],
    sortOptions,
  });

  if (loading || error) return <Status loading={loading} error={error} />;

  const countryOptions = [
    { value: 'all', label: 'All countries' },
    ...uniqueValues(data, 'country').map((country) => ({ value: country, label: country })),
  ];

  return (
    <section className="tour" ref={listRef}>
      <h1>Tour</h1>

      <div className="controls">
        <SearchField
          value={list.query}
          onChange={list.changeQuery}
          placeholder="City, country or venue"
        />
        <SelectField
          label="Country"
          value={list.filters.country ?? 'all'}
          onChange={(value) => list.changeFilter('country', value)}
          options={countryOptions}
        />
        <SelectField
          label="Sort by"
          value={list.sort}
          onChange={list.changeSort}
          options={sortOptions}
        />
      </div>

      {list.total === 0 && <p>No shows found.</p>}
      <ul className="tour__list">
        {list.items.map((show) => (
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
      <Pagination page={list.page} totalPages={list.totalPages} onChange={list.changePage} />
    </section>
  );
}

export default Tour;
