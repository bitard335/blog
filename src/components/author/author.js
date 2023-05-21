import { Link } from 'react-router-dom';

import cl from './author.module.scss';

const Author = ({ image, username, createdAt, inHeader }) => {
  const date = new Date(createdAt);
  const datePlug = createdAt ? (
    <div className={cl.author__date}>
      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
    </div>
  ) : null;

  const linkPlug = inHeader ? (
    <Link to="/editProfile">
      <div className={cl.author__name}>{username}</div>
    </Link>
  ) : (
    <div className={cl.author__name}>{username}</div>
  );
  return (
    <div className={cl.author}>
      <div className={cl.author__userInfo}>
        {linkPlug}
        {datePlug}
      </div>
      <img className={cl.author__image} src={image} alt="UserImage" />
    </div>
  );
};

export default Author;
