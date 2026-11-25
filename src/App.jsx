import { Route, Routes } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs.jsx';
import Header from './components/Header.jsx';
import About from './pages/About.jsx';
import Biography from './pages/Biography.jsx';
import Cart from './pages/Cart.jsx';
import Contacts from './pages/Contacts.jsx';
import Discography from './pages/Discography.jsx';
import Gallery from './pages/Gallery.jsx';
import Home from './pages/Home.jsx';
import Merch from './pages/Merch.jsx';
import News from './pages/News.jsx';
import NotFound from './pages/NotFound.jsx';
import Shop from './pages/Shop.jsx';
import ShopHome from './pages/ShopHome.jsx';
import Tour from './pages/Tour.jsx';

const pages = {
  '/': <Home />,
  '/about': <About />,
  '/about/biography': <Biography />,
  '/about/discography': <Discography />,
  '/about/gallery': <Gallery />,
  '/news': <News />,
  '/tour': <Tour />,
  '/shop': <ShopHome />,
  '/shop/albums': <Shop />,
  '/shop/merch': <Merch />,
  '/cart': <Cart />,
  '/contacts': <Contacts />,
};

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Breadcrumbs />
        <div className="content">
          <Routes>
            {Object.entries(pages).map(([path, element]) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
