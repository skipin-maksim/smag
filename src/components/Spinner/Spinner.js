import React from 'react';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Spinner.module.scss';

export default function spinner() {
  return (
    <>
      <Loader
        className={s.spinner}
        type="Puff"
        color="#1c2b4a"
        height={30}
        width={30}
      />
    </>
  );
}
