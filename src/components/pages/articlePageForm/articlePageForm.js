import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { article } from '../../../store/reducers/articlesReducer';
import Button from '../../button/button';
import cl from '../../../formModule/formPage.module.scss';

export const ArticlePageForm = ({ type, placeholders, slug }) => {
  const { user } = useSelector((state) => state.user);
  const [tagsState, setTags] = useState([]);
  const [createStatus, setCreateStatus] = useState();
  const tagInput = useRef();
  const navigator = useNavigate();

  useEffect(() => {
    const defaultTags = placeholders?.tagList
      ? placeholders.tagList.map((tag, index) => ({ tag: tag, id: index }))
      : [];

    setTags(defaultTags);
  }, [placeholders?.tagList]);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const addTag = (evt) => {
    evt.preventDefault();
    const newTag = tagInput.current.value;
    tagInput.current.value = '';

    if (newTag.trim()) setTags((tags) => [...tags, { tag: newTag, id: tags.length }]);
  };

  const removeTag = (id) => {
    const slicedTags = tagsState.filter((tag) => tag.id !== id);
    setTags(slicedTags);
  };

  const submitHandler = (data) => {
    const tags = tagsState.map((tag) => tag.tag);
    const dataWithTags = { ...data, tagList: tags };
    setCreateStatus('loading');
    dispatch(article({ type: type, token: user?.token, slug: slug, body: dataWithTags }))
      .then((response) => {
        const slug = response.payload?.article?.slug;

        setCreateStatus('fulfilled');
        navigator('/articles/' + slug);
      })
      .catch((err) => {
        setCreateStatus('rejected');
      });
    reset();
    setTags([]);
  };

  const addedTags = tagsState.map((tagElem, index) => {
    const { tag } = tagElem;

    return (
      <li key={index} className={cl.formPage__tag}>
        <div className={cl.formPage__input}>{tag}</div>
        <Button
          bordered
          red
          style={{ height: 40 }}
          onClick={(evt) => {
            evt.preventDefault();
            removeTag(index);
          }}
        >
          Delete
        </Button>
      </li>
    );
  });

  if (createStatus === 'loading') {
    return (
      <form className={cl.formPage + ' centered'} style={{ width: 938 }} onSubmit={handleSubmit(submitHandler)}>
        <Spin size="large" />
      </form>
    );
  }
  const errorPlug = (name) => (errors[name] ? <div className={cl.formPage__error}>{errors[name]?.message}</div> : null);

  const formTitle = type === 'edit' ? 'Edit Article' : 'Create new Article';

  return (
    <form className={cl.formPage + ' centered'} style={{ width: 938 }} onSubmit={handleSubmit(submitHandler)}>
      <h2 className={cl.formPage__title}>{formTitle}</h2>
      <label>
        <h6 className={cl.formPage__inputName}>Title</h6>
        <input
          className={cl.formPage__input}
          defaultValue={placeholders?.title}
          {...register('title', { required: 'Title is required' })}
        />
        {errorPlug('title')}
      </label>
      <label>
        <h6 className={cl.formPage__inputName}>Short Description</h6>
        <input
          className={cl.formPage__input}
          defaultValue={placeholders?.description}
          {...register('description', { required: 'Description is required' })}
        />
        {errorPlug('description')}
      </label>
      <label>
        <h6 className={cl.formPage__inputName}>Text</h6>
        <textarea
          defaultValue={placeholders?.body}
          className={cl.formPage__input}
          style={{ height: 168 }}
          {...register('body', { required: 'Text is required' })}
        />
        {errorPlug('body')}
      </label>
      <h6 className={cl.formPage__inputName}>Tags</h6>
      <ul className={cl.formPage__tagList}>
        {addedTags}
        <li className={cl.formPage__tag}>
          <input ref={tagInput} className={cl.formPage__input} />
          <Button bordered blue style={{ height: 40 }} onClick={addTag}>
            Add
          </Button>
        </li>
      </ul>
      {errorPlug('tags')}

      <button className={cl.formPage__submit} type="submit">
        Send
      </button>
    </form>
  );
};

export default ArticlePageForm;
export const CreateArticlePage = () => <ArticlePageForm type="create" />;
export const EditArticlePage = () => {
  const { slug } = useParams();
  const location = useLocation();

  return <ArticlePageForm type="edit" slug={slug} placeholders={location?.state} />;
};
