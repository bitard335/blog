import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Checkbox, Spin } from 'antd';

import { fetchAuth } from '../../../store/reducers/userReducer';
import cl from '../../../formModule/formPage.module.scss';

const RegisterPage = () => {
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
    dispatch(fetchAuth({ type: 'register', body: data }));
    reset();
  };

  useEffect(() => {
    Object.keys(formErrors).forEach((key) => {
      setError(key, { message: `${key} ${formErrors[key]}` });
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
      <h2 className={cl.formPage__title}>Create new account</h2>
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
        <h6 className={cl.formPage__inputName}>Password</h6>
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
        <h6 className={cl.formPage__inputName}>Repeat password</h6>
        <input
          className={cl.formPage__input}
          {...register('repeat-password', {
            required: 'Repeat your password',
            validate: (value, formValues) => value === formValues.password || 'Passwords are incorrect',
          })}
        />
        {errorPlug('repeat-password')}
      </label>
      <label className={cl.formPage__checkboxLabel}>
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

      <button className={cl.formPage__submit} type="submit">
        Create
      </button>

      <div className={cl.formPage__redirect}>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </form>
  );
};

export default RegisterPage;
