import { useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import ArticleHead from '../../articleHead/articleHead';

import cl from './articlePage.module.scss';

const ArticlePage = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { body, ...rest } = location.state;

  return (
    <div className={cl.articlePage + ' centered'}>
      <ArticleHead {...rest} transparent selectedPage />
      <div className={cl.articlePage__body}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticlePage;
