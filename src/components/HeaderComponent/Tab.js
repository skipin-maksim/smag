import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabsSelectors, tabsActions } from '../../redux/tabs/';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders';

import CloseBtn from '../Buttons/CloseBtn';

import s from './HeaderComponent.module.scss';
class Tab extends React.Component {
  componentDidMount() {
    if (this.props.history.location.pathname.slice(8) === 'new-order') {
      this.props.onGetDataOfTemporaryStorageLocation(
        this.props.dataOfTemporaryStorageLocation,
      );
    } else {
      this.props.onGetOrderById(this.props.history.location.pathname.slice(8));
    }
  }

  handleOnCloseTab = (name, path, idxItem) => {
    this.props.tabsList.reduce((previous, current) => {
      if (
        idxItem === 0 &&
        this.props.tabsList[1] &&
        this.props.history.location.pathname === path
      ) {
        this.props.history.replace(this.props.absList[1].path);
        return current;
      }

      if (
        current.path === path &&
        this.props.history.location.pathname === path
      ) {
        this.props.history.replace(previous.path);
        this.props.removeTab(name);
        return current;
      }

      if (
        current.path !== path &&
        this.props.history.location.pathname !== path
      ) {
        this.props.removeTab(name);
        return current;
      }

      return current;
    }, this.props.tabsList[0]);
  };

  testHandleClickTab = tabId => {
    if (tabId === 'new-order') {
      // this.props.onClearAllProducts();
      this.props.onGetDataOfTemporaryStorageLocation(
        this.props.dataOfTemporaryStorageLocation,
      );
      console.log('new-order');
      return;
    } else {
      this.props.onGetOrderById(tabId);

      this.props.onSaveToTemporaryStorageLocation(this.props.allProducts);
    }
  };

  render() {
    const { name, idx, path } = this.props;

    return (
      <li className={s.tabLi}>
        <NavLink
          exact
          name={path}
          to={path}
          className={s.tab}
          activeClassName={s.tabActive}
          onClick={({ target }) =>
            this.testHandleClickTab(target.name.slice(8))
          }
        >
          {name}
        </NavLink>

        <CloseBtn
          onClick={this.handleOnCloseTab}
          name={name}
          path={path}
          idx={idx}
        />
      </li>
    );
  }
}

const mSTP = (state, ownProps) => ({
  tabsList: tabsSelectors.getTabsList(state),
  allProducts: ordersSelectors.getOrdersAllProducts(state),
  dataOfTemporaryStorageLocation: ordersSelectors.getDataOfTemporaryStorageLocation(
    state,
  ),
});

const mDTP = {
  removeTab: tabsActions.removeTab,
  onClearAllProducts: ordersActions.clearAllProducts,
  onGetOrderById: ordersOperations.getOrderById,
  onSaveToTemporaryStorageLocation: tabsActions.saveToTemporaryStorageLocation,
  onGetDataOfTemporaryStorageLocation:
    tabsActions.getDataOfTemporaryStorageLocation,
};

export default withRouter(connect(mSTP, mDTP)(Tab));
