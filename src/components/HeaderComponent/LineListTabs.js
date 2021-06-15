import React from 'react';

import Tab from './Tab';

import s from './HeaderComponent.module.scss';

export default function LineListTabs({ tabsList, stylePosition, size }) {
  const scrollTabsList = e => {
    e.currentTarget.scrollTo({
      top: 0,
      left: e.currentTarget.scrollLeft + e.deltaY,
      behaviour: 'smooth',
    });
  };

  return (
    <ul
      className={s.lineListTabs}
      style={{ left: stylePosition }}
      onWheel={scrollTabsList}
    >
      {tabsList.map(({ name, path, label }, idx) => {
        return (
          <Tab key={name} name={name} path={path} idx={idx} label={label} />
        );
      })}
    </ul>
  );
}
