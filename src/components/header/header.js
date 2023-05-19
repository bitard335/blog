import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../button/button';

import cl from './header.module.scss';

const Header = () => {
  const { isAuth } = useSelector((state) => state.user);

  return (
    <header className={cl.header}>
      <h6 className={cl.header__title}>Realworld Blog</h6>
      <Link to={'/login'}>
        <Button>Sign in</Button>
      </Link>
      <Link to={'/register'}>
        <Button green bordered>
          Sign up
        </Button>
      </Link>
    </header>
  );
};

export default Header;
