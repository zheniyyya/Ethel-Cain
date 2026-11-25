import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let ignore = false;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load data (${response.status})`);
        return response.json();
      })
      .then((data) => {
        if (!ignore) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        console.error(error);
        if (!ignore) {
          setState({
            data: null,
            loading: false,
            error: 'Could not load the data. Please try again later.',
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
}
