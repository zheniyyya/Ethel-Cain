function SearchField({ label = 'Search', value, onChange, placeholder }) {
  return (
    <label className="field">
      {label}
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchField;
