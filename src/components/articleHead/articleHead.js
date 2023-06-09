import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { article } from '../../store/reducers/articlesReducer';
import Like from '../like/like';
import Author from '../author/author';
import Button from '../button/button';

import cl from './articleHead.module.scss';

const ArticleHead = (props) => {
  const { transparent, description, createdAt, author, title, tagList, slug, selectedPage, userIsAuthor } = props;

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const img = author?.image;
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

  const deleteHandler = () => {
    dispatch(article({ type: 'delete', slug: slug, token: user.token })).then((response) => {
      navigator('/articles');
    });
  };

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
          <Like slug={slug} />
        </div>
        <div>
          <ul className={cl.article__tags}>{tagElements}</ul>
        </div>
        <main className={previewTextClass}>{description}</main>
      </div>
      <div className={cl.article__userBlock}>
        <Author image={img} createdAt={createdAt} {...author} />
        {userIsAuthor ? (
          <div>
            <Popconfirm
              okText="Yes"
              cancelText="No"
              title="Are you sure to delete this article?"
              placement="rightTop"
              onConfirm={deleteHandler}
            >
              <Button bordered red small>
                Delete
              </Button>
            </Popconfirm>
            <Button
              bordered
              green
              small
              onClick={() => {
                navigator('edit', { state: props });
              }}
            >
              Edit
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ArticleHead;
