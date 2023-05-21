import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { blogAPI } from '../../services/blogAPI';

import cl from './like.module.scss';

const Like = ({ slug }) => {
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((state) => state.user);

  const [likesCount, setLikesCount] = useState();
  const [isLiked, setLike] = useState(false);

  useEffect(() => {
    if (slug) {
      blogAPI.getArticle(slug, user?.token).then((response) => {
        const favoritesCount = response.article.favoritesCount;
        const isFavorited = response.article.favorited;
        setLikesCount(favoritesCount);
        setLike(isFavorited);
      });
    }
  }, [user]);

  const onLikeHandler = (event) => {
    if (isAuth) {
      const favorite = !isLiked ? blogAPI.addLike(slug, user?.token) : blogAPI.removeLike(slug, user?.token);
      favorite.then((response) => {
        const favoritesCount = response.article.favoritesCount;
        setLikesCount(favoritesCount);
        setLike(!isLiked);
      });
    }
  };

  return (
    <label className={cl.like}>
      <input className={cl.like__input} onChange={onLikeHandler} type="checkbox" checked={isLiked} />
      <p className={cl.like__favoriteCount}>{likesCount}</p>
    </label>
  );
};

export default Like;
