import { useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';

import { blogAPI } from '../../../services/blogAPI';
import ArticleHead from '../../articleHead/articleHead';

import cl from './articlePage.module.scss';

const ArticlePage = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { user } = useSelector((state) => state.user);
  const [article, setArticle] = useState();
  const [status, setStatus] = useState('loading');

  const userIsAuthor = article?.author?.username === user.username;

  useEffect(() => {
    setStatus('loading');
    blogAPI
      .getArticle(slug)
      .then((response) => {
        setArticle(response.article);
        setStatus('fulfilled');
      })
      .catch((err) => {
        setStatus('rejected');
      });
  }, [slug]);

  if (status === 'rejected') {
    return <Alert type="error" message="Такого поста не существует" />;
  }

  const loading =
    status === 'loading' ? (
      <Spin size="large" style={{ marginLeft: '50%', marginTop: '25px' }} />
    ) : (
      <>
        <ArticleHead {...article} transparent selectedPage userIsAuthor={userIsAuthor} />
        <div className={cl.articlePage__body}>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      </>
    );

  return <div className={cl.articlePage + ' centered'}>{loading}</div>;
};

export default ArticlePage;
