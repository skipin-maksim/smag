import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { tabsActions } from '../../redux/tabs/';

import LineListTabs from './LineListTabs';

import s from './HeaderComponent.module.scss';

export default function HeaderComponent() {
  const tabsList = useSelector(state => state.tabs.items);
  const widthLineTabs = useSelector(state => state.tabs.positionData.width);
  const leftPositionLineTabs = useSelector(
    state => state.tabs.positionData.left,
  );

  const dispatch = useDispatch();
  const onMoveSlideLeft = useCallback(
    () => dispatch(tabsActions.moveSlideLeft(leftPositionLineTabs + 202)),
    [dispatch, leftPositionLineTabs],
  );
  const onMoveSlideRight = useCallback(
    () => dispatch(tabsActions.moveSlideLeft(leftPositionLineTabs - 202)),
    [dispatch, leftPositionLineTabs],
  );
  const getComponentWidthDispatch = useCallback(
    data => dispatch(tabsActions.widthLineTabs(data)),
    [dispatch],
  );

  const moveLeft = () => {
    if (leftPositionLineTabs === 0) {
      return;
    } else {
      onMoveSlideLeft();
    }
  };

  const moveRight = () => {
    if (widthLineTabs - -leftPositionLineTabs <= 1500) {
      return;
    } else if (widthLineTabs > 1500) {
      onMoveSlideRight();
    }
  };

  const getComponentWidth = data => {
    getComponentWidthDispatch(data);
  };

  return (
    <header className={s.headerLineTabs}>
      <button className={`${s.sliderBtn} ${s.leftBtn}`} onClick={moveLeft}>
        <ChevronLeftIcon style={{ color: '#fff', fontSize: 40 }} />
      </button>
      <div className={s.wrapperLineListTabs}>
        <LineListTabs
          getComponentWidth={getComponentWidth}
          tabsList={tabsList}
          stylePosition={leftPositionLineTabs}
        />
      </div>
      <button className={`${s.sliderBtn} ${s.rightBtn}`} onClick={moveRight}>
        <ChevronRightIcon style={{ color: '#fff', fontSize: 40 }} />
      </button>
    </header>
  );
}
