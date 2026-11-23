import { useEffect, useState } from 'react';

const slides = ['/images/hero-1.jpg', '/images/hero-2.jpg', '/images/hero-3.jpg'];

function Header() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((i) => (i + 1) % slides.length), 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <nav className="menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li>
            <a href="#">About Ethel Cain</a>
            <ul>
              <li><a href="#">Biography</a></li>
              <li><a href="#">Discography</a></li>
            </ul>
          </li>
          <li><a href="#">News</a></li>
          <li><a href="#">Tour</a></li>
          <li>
            <a href="#">Shop</a>
            <ul>
              <li><a href="#">Albums</a></li>
              <li><a href="#">Merch</a></li>
            </ul>
          </li>
          <li><a href="#">Contacts</a></li>
        </ul>
      </nav>

      <div className="slider">
        {slides.map((src, i) => (
          <img key={src} src={src} alt="Ethel Cain" className={i === current ? 'active' : ''} />
        ))}
      </div>
    </header>
  );
}

export default Header;
