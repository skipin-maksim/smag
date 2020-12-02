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
    } else if (Number(this.props.history.location.pathname.slice(8))) {
      this.props.onGetOrderById(this.props.history.location.pathname.slice(8));
    }
  }

  handleOnCloseTab = (name, path, idxItem) => {
    this.props.tabsList.reduce((previous, current) => {
      if (idxItem === 0 && this.props.tabsList.length === 1) {
        this.props.history.replace('/');
        this.props.removeTab(name);
        return current;
      }
      if (
        idxItem === 0 &&
        this.props.tabsList[1] &&
        this.props.history.location.pathname === path
      ) {
        this.props.removeTab(name);
        this.props.history.replace(this.props.tabsList[1].path);
        return current;
      }

      if (
        current.path === path &&
        this.props.history.location.pathname === path
      ) {
        this.props.history.replace(previous.path);

        if (Number(previous.path.slice(8))) {
          console.log('не число, удали табу');
          this.props.onGetOrderById(previous.path.slice(8));
        }
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
    console.log(tabId);
    if (tabId.slice(8) === 'new-order' || tabId === '/orders') {
      // this.props.onClearAllProducts();
      console.log(this.props.dataOfTemporaryStorageLocation);
      this.props.onGetDataOfTemporaryStorageLocation(
        this.props.dataOfTemporaryStorageLocation,
      );
      console.log('new-order');
      return;
    } else {
      this.props.onGetOrderById(tabId.slice(8));

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
          onClick={({ target }) => this.testHandleClickTab(target.name)}
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
