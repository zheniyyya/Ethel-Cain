import { useLocation } from 'react-router-dom';

const networks = [
  {
    name: 'X',
    link: (url, text) => `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
  },
  {
    name: 'Facebook',
    link: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    name: 'Telegram',
    link: (url, text) => `https://t.me/share/url?url=${url}&text=${text}`,
  },
];

function ShareButtons({ text }) {
  const { pathname } = useLocation();
  const url = encodeURIComponent(window.location.origin + pathname);
  const message = encodeURIComponent(text);

  return (
    <div className="share">
      <span className="share__label">Share</span>
      <ul className="share__list">
        {networks.map((network) => (
          <li key={network.name}>
            <a
              href={network.link(url, message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${network.name}`}
            >
              {network.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShareButtons;
