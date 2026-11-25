import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/cart.js';

const slides = ['/images/hero-1.jpg', '/images/hero-2.jpg', '/images/hero-3.jpg'];

function Header() {
  const [current, setCurrent] = useState(0);
  const { count } = useCart();

  useEffect(() => {
    const id = setInterval(() => setCurrent((i) => (i + 1) % slides.length), 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <nav className="menu">
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li>
            <NavLink to="/about" end>About Ethel Cain</NavLink>
            <ul>
              <li><NavLink to="/about/biography">Biography</NavLink></li>
              <li><NavLink to="/about/discography">Discography</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/news">News</NavLink></li>
          <li><NavLink to="/tour">Tour</NavLink></li>
          <li>
            <NavLink to="/shop" end>Shop</NavLink>
            <ul>
              <li><NavLink to="/shop/albums">Albums</NavLink></li>
              <li><NavLink to="/shop/merch">Merch</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/contacts">Contacts</NavLink></li>
          <li><NavLink to="/cart">Cart{count > 0 && ` (${count})`}</NavLink></li>
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
