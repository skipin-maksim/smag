import React from 'react';
import { useSelector } from 'react-redux';

import { tabsSelectors } from '../../redux/tabs/';

import LineListTabs from './LineListTabs';

import s from './HeaderComponent.module.scss';

export default function HeaderComponent() {
  const tabsList = useSelector(tabsSelectors.getTabsList);

  return (
    <header className={s.headerLineTabs}>
      <div className={s.wrapperLineListTabs}>
        <LineListTabs tabsList={tabsList} />
      </div>
    </header>
  );
}
