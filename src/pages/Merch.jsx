import SafeImage from '../components/SafeImage.jsx';
import { useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import SearchField from '../components/SearchField.jsx';
import SelectField from '../components/SelectField.jsx';
import Status from '../components/Status.jsx';
import { useCart } from '../context/cart.js';
import { useFetch } from '../hooks/useFetch.js';
import { useListView } from '../hooks/useListView.js';
import { formatPrice } from '../utils/formatPrice.js';
import { uniqueValues } from '../utils/uniqueValues.js';

const sortOptions = [
  {
    value: 'featured',
    label: 'Featured',
    compare: (a, b) => a.id - b.id,
  },
  {
    value: 'price-asc',
    label: 'Price: low to high',
    compare: (a, b) => a.price - b.price || a.id - b.id,
  },
  {
    value: 'price-desc',
    label: 'Price: high to low',
    compare: (a, b) => b.price - a.price || a.id - b.id,
  },
  {
    value: 'title',
    label: 'Title: A to Z',
    compare: (a, b) => a.title.localeCompare(b.title),
  },
];

function MerchCard({ product }) {
  const { addItem, quantityOf, soldOf } = useCart();
  const [selected, setSelected] = useState(null);

  const sizes = Object.keys(product.stock);
  const keyOf = (size) => `merch-${product.id}-${size}`;
  const left = (size) => product.stock[size] - soldOf(keyOf(size)) - quantityOf(keyOf(size));

  const size = selected && left(selected) > 0 ? selected : sizes.find((name) => left(name) > 0);
  const soldOut = size === undefined;

  const add = () =>
    addItem({
      key: keyOf(size),
      title: product.title,
      image: product.image,
      variant: size,
      price: product.price,
      max: product.stock[size] - soldOf(keyOf(size)),
    });

  return (
    <li className={`product${soldOut ? ' product--sold-out' : ''}`}>
      <div className="product__media">
        <SafeImage className="product__cover" src={product.image} alt={product.title} loading="lazy" />
        {soldOut && <span className="product__badge">Sold out</span>}
      </div>
      <h2 className="product__title">{product.title}</h2>
      <p className="product__info">{product.category}</p>

      {sizes.length > 1 ? (
        <div className="product__options" role="group" aria-label="Size">
          {sizes.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={name === size}
              disabled={left(name) <= 0}
              title={left(name) <= 0 ? 'Sold out' : undefined}
              onClick={() => setSelected(name)}
            >
              {name}
            </button>
          ))}
        </div>
      ) : (
        <p className="product__variant">{sizes[0]}</p>
      )}

      {!soldOut && left(size) <= 2 && <p className="product__low">Only {left(size)} left</p>}

      <p className="product__price">{formatPrice(product.price)}</p>
      <button type="button" className="button" disabled={soldOut} onClick={add}>
        {soldOut ? 'Sold out' : 'Add to cart'}
      </button>
    </li>
  );
}

function Merch() {
  const { data, loading, error } = useFetch('/data/merch.json');
  const { listRef, ...list } = useListView(data ?? [], {
    pageSize: 10,
    searchKeys: ['title', 'category'],
    sortOptions,
  });

  if (loading || error) return <Status loading={loading} error={error} />;

  const categoryOptions = [
    { value: 'all', label: 'All products' },
    ...uniqueValues(data, 'category').map((category) => ({ value: category, label: category })),
  ];

  return (
    <section className="shop" ref={listRef}>
      <h1>Merch</h1>

      <div className="controls">
        <SearchField value={list.query} onChange={list.changeQuery} placeholder="Product name" />
        <SelectField
          label="Category"
          value={list.filters.category ?? 'all'}
          onChange={(value) => list.changeFilter('category', value)}
          options={categoryOptions}
        />
        <SelectField
          label="Sort by"
          value={list.sort}
          onChange={list.changeSort}
          options={sortOptions}
        />
      </div>

      {list.total === 0 && <p>No products found.</p>}
      <ul className="products">
        {list.items.map((product) => (
          <MerchCard key={product.id} product={product} />
        ))}
      </ul>
      <Pagination page={list.page} totalPages={list.totalPages} onChange={list.changePage} />
    </section>
  );
}

export default Merch;
