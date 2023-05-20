import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchAuth } from '../../../store/reducers/userReducer';

import cl from './loginPage.module.scss';

const LoginPage = () => {
  const { formErrors } = useSelector((state) => state.user);
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
    dispatch(fetchAuth({ type: 'register', body: data }));
    reset();
  };

  useEffect(() => {
    Object.keys(formErrors).forEach((key) => {
      setError(key, { message: `${key} ${formErrors[key]}` });
    });
  }, [formErrors]);

  const errorPlug = (name) =>
    errors[name] ? <div className={cl.loginPage__error}>{errors[name]?.message}</div> : null;

  return (
    <form className={cl.loginPage + ' centered'} onSubmit={handleSubmit(submitHandler)}>
      <h2 className={cl.loginPage__title}>Sign In</h2>
      <label>
        <h6 className={cl.loginPage__inputName}>Email address</h6>
        <input
          className={cl.loginPage__input}
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
        <h6 className={cl.loginPage__inputName}>Password</h6>
        <input
          className={cl.loginPage__input}
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {errorPlug('password')}
      </label>

      <button className={cl.loginPage__submit} type="submit">
        Create
      </button>

      <div className={cl.loginPage__redirect}>
        Doesnt have an account? <Link to="/register">Sign up</Link>
      </div>
    </form>
  );
};

export default LoginPage;
