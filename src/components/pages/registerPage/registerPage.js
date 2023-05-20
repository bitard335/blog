import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';

import { fetchAuth } from '../../../store/reducers/userReducer';

import cl from './registerPage.module.scss';

const RegisterPage = () => {
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
    errors[name] ? <div className={cl.registerPage__error}>{errors[name]?.message}</div> : null;

  return (
    <form className={cl.registerPage + ' centered'} onSubmit={handleSubmit(submitHandler)}>
      <h2 className={cl.registerPage__title}>Create new account</h2>
      <label>
        <h6 className={cl.registerPage__inputName}>Email address</h6>
        <input
          className={cl.registerPage__input}
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
        <h6 className={cl.registerPage__inputName}>Username</h6>
        <input
          className={cl.registerPage__input}
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
            max: {
              value: 22,
              message: 'Your username must contain no more than 22 characters.',
            },
          })}
        />
        {errorPlug('username')}
      </label>
      <label>
        <h6 className={cl.registerPage__inputName}>Password</h6>
        <input
          className={cl.registerPage__input}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            max: {
              value: 10,
              message: 'Your password must contain no more than 40 characters.',
            },
          })}
        />
        {errorPlug('password')}
      </label>
      <label>
        <h6 className={cl.registerPage__inputName}>Repeat password</h6>
        <input
          className={cl.registerPage__input}
          {...register('repeat-password', {
            required: 'Repeat your password',
            validate: (value, formValues) => value === formValues.password || 'Passwords are incorrect',
          })}
        />
        {errorPlug('repeat-password')}
      </label>
      <label className={cl.registerPage__checkboxLabel}>
        <Controller
          name="checkbox"
          control={control}
          rules={{ required: 'Checkbox is required' }}
          render={({ field }) => {
            return (
              <Checkbox {...field} checked={field.value}>
                <p>I agree to the processing of my personal information</p>
              </Checkbox>
            );
          }}
        />
        {errorPlug('checkbox')}
      </label>

      <button className={cl.registerPage__submit} type="submit">
        Create
      </button>

      <div className={cl.registerPage__redirect}>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </form>
  );
};

export default RegisterPage;
