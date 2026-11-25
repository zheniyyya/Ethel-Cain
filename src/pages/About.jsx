import SectionOverview from '../components/SectionOverview.jsx';
import { useFetch } from '../hooks/useFetch.js';

const links = [
  {
    to: '/about/biography',
    image: '/images/hero-3.jpg',
    title: 'Biography',
    text: 'Growing up in a Southern Baptist family in Florida and becoming Ethel Cain.',
  },
  {
    to: '/about/discography',
    image: '/images/albums/preachers-daughter.webp',
    title: 'Discography',
    text: "Every EP and album, from Carpet Bed to Willoughby Tucker, I'll Always Love You.",
  },
];

function About() {
  const { data: albums } = useFetch('/data/albums.json');

  const years = albums ? albums.map((album) => album.year) : [];
  const facts = albums && [
    { value: albums.length, label: 'Releases' },
    { value: Math.min(...years), label: 'First release' },
    { value: Math.max(...years), label: 'Latest release' },
  ];

  return (
    <SectionOverview
      title="About Ethel Cain"
      lead="Ethel Cain is the stage name of Hayden Anhedönia, an American singer, songwriter and producer. Her music blends Southern gothic storytelling, slow-burning rock and haunted ambient soundscapes, all told through the life of a fictional woman named Ethel."
      facts={facts}
      links={links}
    />
  );
}

export default About;
