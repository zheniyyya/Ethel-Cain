const location = {
  name: 'Tallahassee, Florida',
  lat: 30.4383,
  lon: -84.2807,
};

const delta = 0.05;
const bbox = [
  location.lon - delta,
  location.lat - delta / 2,
  location.lon + delta,
  location.lat + delta / 2,
].join(',');

const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.lat},${location.lon}`;
const mapLink = `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}#map=13/${location.lat}/${location.lon}`;

function Contacts() {
  return (
    <section className="contacts">
      <h1>Contacts</h1>

      <div className="contacts__grid">
        <div className="contacts__info">
          <p className="contacts__lead">
            This fan site is run from {location.name}, the city where Ethel Cain was born. Write to
            us with news, photos from shows or questions about the shop.
          </p>

          <dl className="contacts__list">
            <dt>Email</dt>
            <dd>
              <a href="mailto:hello@ethelcain-fans.example">hello@ethelcain-fans.example</a>
            </dd>

            <dt>Location</dt>
            <dd>{location.name}, USA</dd>

            <dt>Official site</dt>
            <dd>
              <a href="https://daughtersofcain.com" target="_blank" rel="noreferrer">
                daughtersofcain.com
              </a>
            </dd>
          </dl>
        </div>

        <figure className="contacts__map">
          <iframe
            title={`Map of ${location.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <figcaption>
            <a href={mapLink} target="_blank" rel="noreferrer">
              Open larger map
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default Contacts;
