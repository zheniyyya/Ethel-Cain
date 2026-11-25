import { useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import SearchField from '../components/SearchField.jsx';
import SelectField from '../components/SelectField.jsx';
import Status from '../components/Status.jsx';
import { useCart } from '../context/cart.js';
import { useFetch } from '../hooks/useFetch.js';
import { useListView } from '../hooks/useListView.js';
import { formatPrice } from '../utils/formatPrice.js';

const lowestPrice = (album) => Math.min(...Object.values(album.prices));

const sortOptions = [
  {
    value: 'newest',
    label: 'Newest first',
    compare: (a, b) => b.year - a.year || b.id - a.id,
  },
  {
    value: 'title',
    label: 'Title: A to Z',
    compare: (a, b) => a.title.localeCompare(b.title),
  },
  {
    value: 'price-asc',
    label: 'Price: low to high',
    compare: (a, b) => lowestPrice(a) - lowestPrice(b),
  },
  {
    value: 'price-desc',
    label: 'Price: high to low',
    compare: (a, b) => lowestPrice(b) - lowestPrice(a),
  },
];

function AlbumCard({ album }) {
  const { addItem } = useCart();
  const formats = Object.keys(album.prices);
  const [format, setFormat] = useState(formats[0]);

  return (
    <li className="product">
      <img className="product__cover" src={album.cover} alt={album.title} loading="lazy" />
      <h2 className="product__title">{album.title}</h2>
      <p className="product__info">
        {album.type} · {album.year}
      </p>

      <div className="product__options" role="group" aria-label="Format">
        {formats.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={name === format}
            onClick={() => setFormat(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <p className="product__price">{formatPrice(album.prices[format])}</p>
      <button
        type="button"
        className="button"
        onClick={() =>
          addItem({
            key: `album-${album.id}-${format}`,
            title: album.title,
            image: album.cover,
            variant: format,
            price: album.prices[format],
          })
        }
      >
        Add to cart
      </button>
    </li>
  );
}

function Shop() {
  const { data, loading, error } = useFetch('/data/albums.json');
  const { listRef, ...list } = useListView(data ?? [], {
    pageSize: 10,
    searchKeys: ['title', 'type'],
    sortOptions,
  });

  if (loading || error) return <Status loading={loading} error={error} />;

  return (
    <section className="shop" ref={listRef}>
      <h1>Albums</h1>

      <div className="controls">
        <SearchField value={list.query} onChange={list.changeQuery} placeholder="Album title" />
        <SelectField
          label="Sort by"
          value={list.sort}
          onChange={list.changeSort}
          options={sortOptions}
        />
      </div>

      {list.total === 0 && <p>No albums found.</p>}
      <ul className="products">
        {list.items.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </ul>
      <Pagination page={list.page} totalPages={list.totalPages} onChange={list.changePage} />
    </section>
  );
}

export default Shop;
