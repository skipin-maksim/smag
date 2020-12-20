import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../CompanyBlock/Logo';

import routes from '../../routes';

import s from './CompanyBlock.module.scss';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function CompanyBlock() {
  return (
    <div className={s.companyBlock}>
      <Logo />
      <h2 className={s.companyName}>Emanuela Ferretti</h2>
      <Link className={s.logoutBtn} to={routes.RootPage}>
        <ExitToAppIcon />
      </Link>
    </div>
  );
}
