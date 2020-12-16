import React, { useEffect } from 'react';
import sizeMe from 'react-sizeme';

import Tab from './Tab';

import s from './HeaderComponent.module.scss';

function LineListTabs({ tabsList, stylePosition, size, getComponentWidth }) {
  useEffect(() => {
    getComponentWidth(size.width);
  }, [getComponentWidth, size]);

  return (
    <ul className={s.lineListTabs} style={{ left: stylePosition }}>
      {tabsList.map(({ name, path }, idx) => {
        return <Tab key={name} name={name} path={path} idx={idx} />;
      })}
    </ul>
  );
}

export default sizeMe({ monitorHeight: true })(LineListTabs);
