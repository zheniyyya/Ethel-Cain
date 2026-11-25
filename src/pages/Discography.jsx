import SafeImage from '../components/SafeImage.jsx';
import Status from '../components/Status.jsx';
import { useFetch } from '../hooks/useFetch.js';

function Discography() {
  const { data: albums, loading, error } = useFetch('/data/albums.json');

  if (loading || error) return <Status loading={loading} error={error} />;

  return (
    <>
      <h1>Discography</h1>
      <ul className="albums">
        {albums.map((album) => (
          <li key={album.id} className="album">
            <SafeImage className="album__cover" src={album.cover} alt={album.title} loading="lazy" />
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
