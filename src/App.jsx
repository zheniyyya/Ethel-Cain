import { Route, Routes } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs.jsx';
import Header from './components/Header.jsx';
import { routes } from './routes.js';

function Page({ title }) {
  return <h1>{title}</h1>;
}

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Breadcrumbs />
        <div className="content">
          <Routes>
            {routes.map(({ path, title }) => (
              <Route key={path} path={path} element={<Page title={title} />} />
            ))}
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
