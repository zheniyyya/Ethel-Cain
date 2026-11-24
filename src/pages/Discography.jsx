import { useEffect, useState } from 'react';

function Discography() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch('/data/albums.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load discography');
        return response.json();
      })
      .then((data) => {
        if (!ignore) setAlbums(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Discography</h1>
      <ul className="albums">
        {albums.map((album) => (
          <li key={album.id} className="album">
            <img className="album__cover" src={album.cover} alt={album.title} loading="lazy" />
            <h2 className="album__title">{album.title}</h2>
            <p className="album__info">
              {album.type} · {album.year}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Discography;
