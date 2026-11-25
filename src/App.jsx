import { Route, Routes } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs.jsx';
import Header from './components/Header.jsx';
import About from './pages/About.jsx';
import Biography from './pages/Biography.jsx';
import Cart from './pages/Cart.jsx';
import Discography from './pages/Discography.jsx';
import Home from './pages/Home.jsx';
import Merch from './pages/Merch.jsx';
import News from './pages/News.jsx';
import Shop from './pages/Shop.jsx';
import ShopHome from './pages/ShopHome.jsx';
import Tour from './pages/Tour.jsx';
import { routes } from './routes.js';

function Page({ title }) {
  return <h1>{title}</h1>;
}

const pages = {
  '/': <Home />,
  '/about': <About />,
  '/about/biography': <Biography />,
  '/about/discography': <Discography />,
  '/news': <News />,
  '/tour': <Tour />,
  '/shop': <ShopHome />,
  '/shop/albums': <Shop />,
  '/shop/merch': <Merch />,
  '/cart': <Cart />,
};

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Breadcrumbs />
        <div className="content">
          <Routes>
            {routes.map(({ path, title }) => (
              <Route key={path} path={path} element={pages[path] ?? <Page title={title} />} />
            ))}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
