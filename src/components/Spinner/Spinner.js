import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import s from './Spinner.module.scss';

export default function Spinner() {
  return (
    <div className={s.loaderWrapper}>
      <div className={s.loader}>
        <PulseLoader size={15} margin={10} color={'#1C2B4A'} />
      </div>
    </div>
  );
}
