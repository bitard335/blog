import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { addArticle } from '../../../store/reducers/articlesReducer';
import Button from '../../button/button';
import cl from '../../../formModule/formPage.module.scss';

const CreateArticlePage = () => {
  const { user } = useSelector((state) => state.user);
  const [tagsState, setTags] = useState([]);
  const tagInput = useRef();
  const navigator = useNavigate();

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

  console.log(user);

  const removeTag = (id) => {
    const slicedTags = tagsState.filter((tag) => tag.id !== id);
    setTags(slicedTags);
  };

  const submitHandler = (data) => {
    const tags = tagsState.map((tag) => tag.tag);
    const dataWithTags = { ...data, tagList: tags };
    dispatch(addArticle({ token: user?.token, body: dataWithTags }));
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

  const errorPlug = (name) => (errors[name] ? <div className={cl.formPage__error}>{errors[name]?.message}</div> : null);

  return (
    <form className={cl.formPage + ' centered'} style={{ width: 938 }} onSubmit={handleSubmit(submitHandler)}>
      <h2 className={cl.formPage__title}>Create new Article</h2>
      <label>
        <h6 className={cl.formPage__inputName}>Title</h6>
        <input className={cl.formPage__input} {...register('title', { required: 'Title is required' })} />
        {errorPlug('title')}
      </label>
      <label>
        <h6 className={cl.formPage__inputName}>Short Description</h6>
        <input className={cl.formPage__input} {...register('description', { required: 'Description is required' })} />
        {errorPlug('description')}
      </label>
      <label>
        <h6 className={cl.formPage__inputName}>Text</h6>
        <textarea
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

export default CreateArticlePage;
