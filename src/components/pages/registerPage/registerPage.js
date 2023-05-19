import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { fetchAuth } from '../../../store/reducers/userReducer';

import cl from './registerPage.module.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submitHandler = (data) => {
    console.log({ data });
    dispatch(fetchAuth({ type: 'register', body: data }));
  };

  return (
    <form className={cl.registerPage + ' centered'} onSubmit={handleSubmit(submitHandler)}>
      <input
        onInput={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
        {...register('email', { required: true })}
      />
      <input
        onInput={(event) => {
          setName(event.target.value);
        }}
        value={name}
        {...register('username', { required: true })}
      />
      <input
        onInput={(event) => {
          setPass(event.target.value);
        }}
        value={pass}
        {...register('password', { required: true })}
      />
      <button type="submit">регистрация</button>
    </form>
  );
};

export default RegisterPage;
