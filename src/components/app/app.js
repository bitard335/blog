import { Navigate, Route, Routes } from 'react-router-dom';

import Header from '../header/header';
import ArticlePage from '../pages/articlePage/articlePage';
import ArticleList from '../pages/articleList/articleList';
import LoginPage from '../pages/loginPage/loginPage';
import RegisterPage from '../pages/registerPage/registerPage';
import RedirectComponent from '../../hoc/redirectComponent';
import EditProfilePage from '../pages/editProfilePage/editProfilePage';
import { EditArticlePage, CreateArticlePage } from '../pages/articlePageForm/articlePageForm';

import cl from './app.module.scss';

const App = () => {
  return (
    <div className={cl.app}>
      <Header />

      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
        <Route path="/createArticle" element={<CreateArticlePage />} />
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
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path="*" element={<Navigate to="/articles" />} />
      </Routes>
    </div>
  );
};

export default App;
