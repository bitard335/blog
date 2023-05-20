import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

import { fetchAuth } from '../../../store/reducers/userReducer';
import cl from '../../../formModule/formPage.module.scss';

const LoginPage = () => {
  const { formErrors, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const submitHandler = (data) => {
    dispatch(fetchAuth({ type: 'login', body: data }));
    reset();
  };

  useEffect(() => {
    Object.keys(formErrors).forEach((key) => {
      setError('email', { message: `${key} ${formErrors[key]}` });
      setError('password', { message: `${key} ${formErrors[key]}` });
    });
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
      <h2 className={cl.formPage__title}>Sign In</h2>
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
        <h6 className={cl.formPage__inputName}>Password</h6>
        <input
          className={cl.formPage__input}
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {errorPlug('password')}
      </label>

      <button className={cl.formPage__submit} type="submit">
        Login
      </button>

      <div className={cl.formPage__redirect}>
        Doesnt have an account? <Link to="/register">Sign up</Link>
      </div>
    </form>
  );
};

export default LoginPage;
