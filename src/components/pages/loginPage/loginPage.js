import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { fetchAuth } from '../../../store/reducers/userReducer';

import cl from './loginPage.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const { register, handleSubmit } = useForm();

  const submitHandler = (data) => {
    console.log({ data });
    dispatch(fetchAuth({ type: 'login', body: data }));
    setEmail('');
    setPass('');
  };

  return (
    <form className={cl.loginPage + ' centered'} onSubmit={handleSubmit(submitHandler)}>
      <input
        onInput={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
        {...register('email', { required: true })}
      />
      <input
        onInput={(event) => {
          setPass(event.target.value);
        }}
        value={pass}
        {...register('password', { required: true })}
      />
      <button type="submit" className={cl.loginPage__submit}>
        ЛОГИН
      </button>
    </form>
  );
};

export default LoginPage;
