import React from 'react';

import lineColorPick from '../../helpers/lineColorPick';

import s from './Line.module.scss';

export default function Line({
  children,
  additionalClassName = 'defaultLine',
  idx,
  gridClass,
}) {
  const isAdditionalClassName =
    additionalClassName === 'defaultLine' ? '' : s[additionalClassName];
  return (
    <li
      className={`${s.line} ${lineColorPick(
        idx,
      )} ${isAdditionalClassName} ${gridClass}`}
    >
      {children}
    </li>
  );
}
