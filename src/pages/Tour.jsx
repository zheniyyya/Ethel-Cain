import Pagination from '../components/Pagination.jsx';
import SearchField from '../components/SearchField.jsx';
import SelectField from '../components/SelectField.jsx';
import Status from '../components/Status.jsx';
import { useCart } from '../context/cart.js';
import { useFetch } from '../hooks/useFetch.js';
import { useListView } from '../hooks/useListView.js';
import { formatDate } from '../utils/formatDate.js';
import { formatPrice } from '../utils/formatPrice.js';
import { today } from '../utils/today.js';
import { uniqueValues } from '../utils/uniqueValues.js';

const sortOptions = [
  {
    value: 'upcoming',
    label: 'Upcoming first',
    compare: (a, b) => {
      if (a.when !== b.when) return a.when === 'Upcoming' ? -1 : 1;
      return a.when === 'Upcoming' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    },
  },
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

const whenOptions = [
  { value: 'all', label: 'All shows' },
  { value: 'Upcoming', label: 'Upcoming' },
  { value: 'Past', label: 'Past' },
];

function TicketAction({ show }) {
  const { addItem, quantityOf, soldOf } = useCart();

  if (show.when === 'Past') return <span className="tour__status">Past</span>;
  if (!show.price) return <span className="tour__status">On sale soon</span>;

  const key = `ticket-${show.id}`;
  const max = show.tickets - soldOf(key);
  const left = max - quantityOf(key);

  if (max <= 0) return <span className="tour__status tour__status--sold">Sold out</span>;

  const buy = () =>
    addItem({
      key,
      title: `${show.city} · ${formatDate(show.date)}`,
      image: '/images/merch/poster-willoughby-tucker-tour-2026.webp',
      variant: 'Ticket, general admission',
      price: show.price,
      max,
    });

  return (
    <div className="tour__tickets">
      <span className="tour__price">{formatPrice(show.price)}</span>
      {left > 0 && left <= 10 && <span className="tour__left">Only {left} left</span>}
      <button type="button" className="button" disabled={left <= 0} onClick={buy}>
        {left > 0 ? 'Tickets' : 'All in cart'}
      </button>
    </div>
  );
}

function Tour() {
  const { data, loading, error } = useFetch('/data/tour.json');
  const shows = (data ?? []).map((show) => ({
    ...show,
    when: show.date >= today ? 'Upcoming' : 'Past',
  }));
  const { listRef, ...list } = useListView(shows, {
    pageSize: 10,
    searchKeys: ['city', 'country', 'venue'],
    sortOptions,
  });

  if (loading || error) return <Status loading={loading} error={error} />;

  const countryOptions = [
    { value: 'all', label: 'All countries' },
    ...uniqueValues(shows, 'country').map((country) => ({ value: country, label: country })),
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
          label="Shows"
          value={list.filters.when ?? 'all'}
          onChange={(value) => list.changeFilter('when', value)}
          options={whenOptions}
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
                {show.demo && <span className="tour__demo">Demo date</span>}
              </h2>
              {show.venue && <p className="tour__venue">{show.venue}</p>}
            </div>
            <TicketAction show={show} />
          </li>
        ))}
      </ul>
      <Pagination page={list.page} totalPages={list.totalPages} onChange={list.changePage} />
    </section>
  );
}

export default Tour;
