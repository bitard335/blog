import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';

import Like from '../like/like';
import Author from '../author/author';

import cl from './articleHead.module.scss';

const ArticleHead = (props) => {
  const { transparent, description, createdAt, author, favoritesCount, title, tagList, slug, favorited, selectedPage } =
    props;

  const navigator = useNavigate();

  const tagsClass = classNames(cl.article__tag, {
    [cl.transparent]: transparent,
  });
  const previewTextClass = classNames(cl.article__desc, {
    [cl.transparent]: transparent,
  });

  const tagElements = tagList.map((tag, index) => {
    return (
      <li className={tagsClass} key={index}>
        {tag}
      </li>
    );
  });

  const onNavigate = (event) => {
    if (!selectedPage) navigator(slug, { state: props });
  };

  return (
    <div className={cl.article}>
      <div className={cl.article__info}>
        <div>
          <h2 className={cl.article__title} onClick={onNavigate}>
            {title}
          </h2>
          <Like favoritesCount={favoritesCount} slug={slug} favorited={favorited} />
        </div>
        <div>
          <ul className={cl.article__tags}>{tagElements}</ul>
        </div>
        <main className={previewTextClass}>{description}</main>
      </div>
      <Author id={5} createdAt={createdAt} {...author} />
    </div>
  );
};

export default ArticleHead;
