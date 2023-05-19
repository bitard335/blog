import { Route, Routes } from 'react-router-dom';

import Header from '../header/header';
import ArticlePage from '../pages/articlePage/articlePage';
import ArticleList from '../pages/articleList/articleList';
import LoginPage from '../pages/loginPage/loginPage';
import RegisterPage from '../pages/registerPage/registerPage';
import RedirectComponent from '../../hoc/redirectComponent';

import cl from './app.module.scss';

const App = () => {
  return (
    <div className={cl.app}>
      <Header />

      <Routes>
        <Route path="/list" element={<ArticleList />} />
        <Route path="/list/:slug" element={<ArticlePage />} />
        <Route
          path="/login"
          element={
            <RedirectComponent>
              <LoginPage />
            </RedirectComponent>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectComponent>
              <RegisterPage />
            </RedirectComponent>
          }
        />
        <Route path="*" Component={() => <h2>Page does not found</h2>} />
      </Routes>
    </div>
  );
};

export default App;
