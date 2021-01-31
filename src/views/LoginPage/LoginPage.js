import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions, authOperations } from '../../redux/auth';

import s from './LoginPage.module.scss';

export default function RootViews() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  // const changeAuthenticated = useCallback(
  //   status => dispatch(authActions.authenticated(status)),
  //   [dispatch],
  // );

  const onLogin = useCallback(
    data => {
      dispatch(authOperations.logIn(data));
    },
    [dispatch],
  );

  const handleOnChangeInput = target => {
    const { name, value } = target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log(formData);

    onLogin(formData);

    // if (formData.login === 'Admin' && formData.password === 'Admin') {
    //   changeAuthenticated(true);
    //   history.replace('/');
    //   return;
    // }
  };
  return (
    <div className={s.rootWrapper}>
      <form className={s.rootInner} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type={'text'}
          name={'email'}
          value={formData.email}
          onChange={({ target }) => handleOnChangeInput(target)}
        />
        <input
          className={s.input}
          type={'password'}
          name={'password'}
          value={formData.password}
          onChange={({ target }) => handleOnChangeInput(target)}
        />

        <button type={'submit'} className={s.login}>
          Войти
        </button>
      </form>
    </div>
  );
}
