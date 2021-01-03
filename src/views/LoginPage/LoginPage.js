import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../redux/auth';

import s from './LoginPage.module.scss';

export default function RootViews() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const changeAuthenticated = useCallback(
    status => dispatch(authActions.authenticated(status)),
    [dispatch],
  );

  const handleOnChangeInput = target => {
    const { name, value } = target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (formData.login === 'Admin' && formData.password === 'Admin') {
      changeAuthenticated(true);
      history.replace('/');
      return;
    }
  };
  return (
    <div className={s.rootWrapper}>
      <form className={s.rootInner} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type={'text'}
          name={'login'}
          value={formData.login}
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
