import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../redux/auth';

import Logo from '../CompanyBlock/Logo';

import s from './CompanyBlock.module.scss';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function CompanyBlock() {
  const history = useHistory();
  const dispatch = useDispatch();

  const changeAuthenticated = useCallback(
    status => dispatch(authActions.authenticated(status)),
    [dispatch],
  );

  const handleLogout = () => {
    changeAuthenticated(false);
    history.replace('/login');
  };

  return (
    <div className={s.companyBlock}>
      <Logo />
      <h2 className={s.companyName}>Emanuela Ferretti</h2>
      <button type={'button'} className={s.logoutBtn} onClick={handleLogout}>
        <ExitToAppIcon style={{ color: '#fff' }} />
      </button>
    </div>
  );
}
