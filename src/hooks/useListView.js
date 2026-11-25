import { useRef, useState } from 'react';

export function useListView(items, { pageSize = 10, searchKeys = [], sortOptions }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(sortOptions[0].value);
  const [page, setPage] = useState(1);
  const listRef = useRef(null);

  const search = query.trim().toLowerCase();
  const compare = sortOptions.find((option) => option.value === sort).compare;

  const result = items
    .filter((item) =>
      Object.entries(filters).every(([key, value]) => value === 'all' || item[key] === value),
    )
    .filter((item) =>
      searchKeys
        .map((key) => item[key])
        .join(' ')
        .toLowerCase()
        .includes(search),
    )
    .sort(compare);

  const totalPages = Math.ceil(result.length / pageSize);
  const pageItems = result.slice((page - 1) * pageSize, page * pageSize);

  const changeQuery = (value) => {
    setQuery(value);
    setPage(1);
  };

  const changeFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const changeSort = (value) => {
    setSort(value);
    setPage(1);
  };

  const changePage = (nextPage) => {
    setPage(nextPage);
    listRef.current?.scrollIntoView();
  };

  return {
    items: pageItems,
    total: result.length,
    page,
    totalPages,
    query,
    filters,
    sort,
    listRef,
    changeQuery,
    changeFilter,
    changeSort,
    changePage,
  };
}
