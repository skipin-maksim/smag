import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { tabsActions, tabsSelectors } from '../../redux/tabs/';

import LineListTabs from './LineListTabs';

import s from './HeaderComponent.module.scss';

function HeaderComponent({
  tabsList,
  widthLineTabs,
  leftPositionLineTabs,
  onMoveSlideLeft,
  onWidthLineTabs,
}) {
  const moveLeft = () => {
    if (leftPositionLineTabs === 0) {
      return;
    } else {
      onMoveSlideLeft(leftPositionLineTabs + 200);
    }
  };

  const moveRight = () => {
    if (widthLineTabs - -leftPositionLineTabs <= 1500) {
      return;
    }

    if (widthLineTabs > 1500) {
      onMoveSlideLeft(leftPositionLineTabs - 200);
    }
  };

  const getComponentWidth = data => {
    onWidthLineTabs(data);
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

const mSTP = state => ({
  tabsList: tabsSelectors.getTabsList(state),
  widthLineTabs: tabsSelectors.getWidthLineTabs(state),
  leftPositionLineTabs: tabsSelectors.getLeftPositionLineTabs(state),
});

const mDTP = {
  onWidthLineTabs: tabsActions.widthLineTabs,
  onMoveSlideLeft: tabsActions.moveSlideLeft,
};

export default withRouter(connect(mSTP, mDTP)(HeaderComponent));
