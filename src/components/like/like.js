import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import cl from './like.module.scss';

const Like = ({ slug, favoritesCount, favorited }) => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.user);

  const [isLiked, setLike] = useState(favorited);

  const onLikeHandler = (event) => {
    if (isAuth) {
      if (!isLiked) console.log('лайкнули');
      else console.log('сняли лайк');

      setLike(!isLiked);
    }
  };

  return (
    <label className={cl.like}>
      <input className={cl.like__input} onChange={onLikeHandler} type="checkbox" checked={isLiked} />
      <p className={cl.like__favoriteCount}>{favoritesCount}</p>
    </label>
  );
};

export default Like;
