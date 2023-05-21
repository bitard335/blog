import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectComponent = ({ children }) => {
  const { isAuth } = useSelector((state) => state.user);

  if (isAuth) {
    return <Navigate to="/articles" replace={true} />;
  }
  return <>{children}</>;
};

export default RedirectComponent;
