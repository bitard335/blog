import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../store/reducers/userReducer';
import Button from '../button/button';
import Author from '../author/author';

import cl from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((state) => state.user);
  const image = user?.image || 'https://avatars.mds.yandex.net/get-images-cbir/2375609/Xs7Iwv-aOKDn8SfMBpHxjg2184/ocr';

  const userAuth = isAuth ? (
    <>
      <Link to={'/createArticle'}>
        <Button green small bordered>
          create Article
        </Button>
      </Link>
      <Author image={image} {...user} inHeader />
      <Button
        bordered
        onClick={() => {
          dispatch(logOut());
        }}
      >
        Log Out
      </Button>
    </>
  ) : (
    <>
      <Link to={'/login'}>
        <Button>Sign in</Button>
      </Link>
      <Link to={'/register'}>
        <Button green bordered>
          Sign up
        </Button>
      </Link>
    </>
  );

  return (
    <header className={cl.header}>
      <Link to={'/articles'}>
        <h6 className={cl.header__title}>Realworld Blog</h6>
      </Link>
      {userAuth}
    </header>
  );
};

export default Header;
