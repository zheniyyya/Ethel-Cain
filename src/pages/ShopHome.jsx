import SectionOverview from '../components/SectionOverview.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { formatPrice } from '../utils/formatPrice.js';

const links = [
  {
    to: '/shop/albums',
    image: '/images/albums/willoughby-tucker.jpg',
    title: 'Albums',
    text: 'Every EP and album on vinyl, CD and digital.',
  },
  {
    to: '/shop/merch',
    image: '/images/merch/tshirt-daughters-of-cain.jpeg',
    title: 'Merch',
    text: 'T-shirts, posters and a tote bag. Limited stock, so grab your size early.',
  },
];

function ShopHome() {
  const { data: albums } = useFetch('/data/albums.json');
  const { data: merch } = useFetch('/data/merch.json');

  const prices =
    albums && merch
      ? [...albums.flatMap((album) => Object.values(album.prices)), ...merch.map((item) => item.price)]
      : [];

  const facts = albums &&
    merch && [
      { value: albums.length, label: 'Albums & EPs' },
      { value: merch.length, label: 'Merch items' },
      { value: formatPrice(Math.min(...prices)), label: 'Prices from' },
    ];

  return (
    <SectionOverview
      title="Shop"
      lead="Records on vinyl, CD and digital, plus T-shirts, posters and a tote bag. This is a fan project, so orders here are for demonstration only and no payment is taken."
      facts={facts}
      links={links}
    />
  );
}

export default ShopHome;
