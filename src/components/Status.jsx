function Status({ loading, error }) {
  if (error) {
    return (
      <p className="status status--error" role="alert">
        {error}
      </p>
    );
  }

  if (loading) {
    return (
      <p className="status" role="status">
        Loading...
      </p>
    );
  }

  return null;
}

export default Status;
