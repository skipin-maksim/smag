import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabsSelectors } from '../../redux/tabs/';

import Tab from './Tab';

import s from './HeaderComponent.module.scss';

class HeaderComponent extends React.Component {
  render() {
    const { tabsList } = this.props;

    return (
      <header className={s.headerLineTabs}>
        <ul className={s.lineListTabs}>
          {tabsList.map(({ name, path }, idx) => {
            return <Tab key={name} name={name} path={path} idx={idx} />;
          })}
        </ul>
      </header>
    );
  }
}

const mSTP = state => ({
  tabsList: tabsSelectors.getTabsList(state),
});

export default withRouter(connect(mSTP)(HeaderComponent));
