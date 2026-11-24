import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';



function Page({ title }) {
  return <h1>{title}</h1>;
}

const routes = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About Ethel Cain' },
  { path: '/about/biography', title: 'Biography' },
  { path: '/about/discography', title: 'Discography' },
  { path: '/news', title: 'News' },
  { path: '/tour', title: 'Tour' },
  { path: '/shop', title: 'Shop' },
  { path: '/shop/albums', title: 'Albums' },
  { path: '/shop/merch', title: 'Merch' },
  { path: '/contacts', title: 'Contacts' },
];

function App() {
  return (
    <>
      <Header />
      <Routes>
        {routes.map(({ path, title }) => (
          <Route key={path} path={path} element={<Page title={title} />} />
        ))}
      </Routes>
    </>
  );
}

export default App;
