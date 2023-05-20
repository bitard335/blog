import cl from './author.module.scss';

const Author = ({ image, username, createdAt }) => {
  const date = new Date(createdAt);
  const datePlug = createdAt ? (
    <div className={cl.author__date}>
      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
    </div>
  ) : null;
  return (
    <div className={cl.author}>
      <div className={cl.author__userInfo}>
        <div className={cl.author__name}>{username}</div>
        {datePlug}
      </div>
      <img className={cl.author__image} src={image} alt="UserImage" />
    </div>
  );
};

export default Author;
