function Pagination({ page, totalPages, onChange }) {
  if (totalPages < 2) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          className={number === page ? 'is-active' : ''}
          aria-current={number === page ? 'page' : undefined}
          onClick={() => onChange(number)}
        >
          {number}
        </button>
      ))}
      <button type="button" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}

export default Pagination;
