import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import { fetchAuth } from '../../../store/reducers/userReducer';
import cl from '../../../formModule/formPage.module.scss';

const EditProfilePage = () => {
  const { formErrors, isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const submitHandler = (data) => {
    dispatch(fetchAuth({ token: user.token, type: 'edit', body: data })).then((response) => {
      if (!response.error) navigator('/articles');
    });
    reset();
  };

  useEffect(() => {
    if (formErrors) {
      Object.keys(formErrors).forEach((key) => {
        setError(key, { message: `${key} ${formErrors[key]}` });
      });
    }
  }, [formErrors]);

  const errorPlug = (name) => (errors[name] ? <div className={cl.formPage__error}>{errors[name]?.message}</div> : null);

  if (isLoading)
    return (
      <div className={cl.formPage + ' centered'}>
        <Spin size="large" className="centered" />
      </div>
    );

  return (
    <form className={cl.formPage + ' centered'} onSubmit={handleSubmit(submitHandler)}>
      <h2 className={cl.formPage__title}>Edit Profile</h2>
      <label>
        <h6 className={cl.formPage__inputName}>Username</h6>
        <input
          className={cl.formPage__input}
          {...register('username', {
            required: 'Username is required',
            pattern: {
              value: /^[a-z0-9]*$/,
              message: 'You can only use lowercase English letters and numbers',
            },
            minLength: {
              value: 3,
              message: 'Your username needs to be at least 3 characters.',
            },
            maxLength: {
              value: 22,
              message: 'Your username must contain no more than 22 characters.',
            },
          })}
        />
        {errorPlug('username')}
      </label>
      <label>
        <h6 className={cl.formPage__inputName}>Email address</h6>
        <input
          className={cl.formPage__input}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email is invalid',
            },
          })}
        />
        {errorPlug('email')}
      </label>
      <label>
        <h6 className={cl.formPage__inputName}>New password</h6>
        <input
          className={cl.formPage__input}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must contain no more than 40 characters.',
            },
          })}
        />
        {errorPlug('password')}
      </label>
      <label>
        <h6 className={cl.formPage__inputName}>Avatar image (url)</h6>
        <input
          className={cl.formPage__input}
          {...register('image', {
            required: 'Image is required',
          })}
        />
        {errorPlug('image')}
      </label>

      <button className={cl.formPage__submit} type="submit">
        Edit
      </button>
    </form>
  );
};

export default EditProfilePage;
