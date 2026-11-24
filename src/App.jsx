import { Route, Routes } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs.jsx';
import Header from './components/Header.jsx';
import Discography from './pages/Discography.jsx';
import { routes } from './routes.js';

function Page({ title }) {
  return <h1>{title}</h1>;
}

const pages = {
  '/about/discography': <Discography />,
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
