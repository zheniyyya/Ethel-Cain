import Status from '../components/Status.jsx';
import { useFetch } from '../hooks/useFetch.js';

function Gallery() {
  const { data: photos, loading, error } = useFetch('/data/gallery.json');

  if (loading || error) return <Status loading={loading} error={error} />;

  return (
    <section className="gallery">
      <h1>Gallery</h1>
      <ul className="gallery__grid">
        {photos.map((photo) => (
          <li key={photo.id}>
            <figure className="gallery__item">
              <img src={photo.src} alt={photo.caption} width="300" height="300" loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Gallery;
