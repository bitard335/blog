import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import ArticleHead from '../../articleHead/articleHead';
import { fetchArticles } from '../../../store/reducers/articlesReducer';

import cl from './articleList.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();

  const { articles, totalCount } = useSelector((state) => state.articles);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(fetchArticles({ page, limit }));
  }, [page, totalCount]);

  const elements = articles.map((elem, index) => {
    const slug = elem.slug;

    return (
      <li key={index} className={cl.articleList__item}>
        <ArticleHead {...elem} />
      </li>
    );
  });

  return (
    <ul className={cl.articleList + ' centered'}>
      {elements}
      <Pagination current={page} total={totalCount} pageSize={limit} onChange={(page) => setPage(page)} />
    </ul>
  );
};

export default ArticleList;
