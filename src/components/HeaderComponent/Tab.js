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
    // const { pathname } = this.props.history.location;
    /*
        Проверяемб находимся ли мы на странице нового заказа?
        И если да => забираем данные из временного места хранения 
        ----- erders -> temporaryStorageLocation

        Если нет => берем заказ с сервера по id
    */
    // if (pathname.slice(8) === 'new-order') {
    //   this.props.onGetDataOfTemporaryStorageLocation(
    //     this.props.dataOfTemporaryStorageLocation,
    //   );
    // } else if (Number(pathname.slice(8))) {
    //   this.props.onGetOrderById(pathname.slice(8));
    // }
    // this.getDataOrderById(pathname);
  }

  handleOnCloseTab = (name, path, idxItem) => {
    const { pathname } = this.props.history.location;
    /*
        Ниже, условия при закрытии Табы. Куда должен перенестись роут.
        Влево от закрываемогоб, вправо или остаться на текущей
    */
    this.props.tabsList.reduce((previous, current) => {
      if (idxItem === 0 && this.props.tabsList.length === 1) {
        this.props.history.replace('/');
        this.props.removeTab(name);
        return current;
      }
      if (idxItem === 0 && this.props.tabsList[1] && pathname === path) {
        this.props.removeTab(name);
        this.props.history.replace(this.props.tabsList[1].path);
        return current;
      }

      if (current.path === path && pathname === path) {
        this.props.history.replace(previous.path);

        if (Number(previous.path.slice(8))) {
          this.props.onGetOrderById(previous.path.slice(8));
        }
        this.props.removeTab(name);
        return current;
      }

      if (current.path !== path && pathname !== path) {
        this.props.removeTab(name);
        return current;
      }

      return current;
    }, this.props.tabsList[0]);
  };

  getDataOrderById = tabId => {
    const currentId = tabId.slice(8);

    if (currentId === 'new-order') {
      this.props.onGetDataOfTemporaryStorageLocation(
        this.props.dataOfTemporaryStorageLocation,
      );

      return;
    } else if (currentId === '') {
      return;
    } else {
      this.props.onClearCurrentOrder();
      this.props.onGetOrderById(currentId);

      if (!this.props.currentOrder.isSaved)
        this.props.onSaveToTemporaryStorageLocation(this.props.currentOrder);
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
          onClick={({ target }) => this.getDataOrderById(target.name)}
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
  currentOrder: ordersSelectors.getCurrentOrder(state),
  dataOfTemporaryStorageLocation: ordersSelectors.getDataOfTemporaryStorageLocation(
    state,
  ),
});

const mDTP = {
  removeTab: tabsActions.removeTab,
  onClearCurrentOrder: ordersActions.clearCurrentOrder,
  onGetOrderById: ordersOperations.getOrderById,

  onSaveToTemporaryStorageLocation: tabsActions.saveToTemporaryStorageLocation,
  onGetDataOfTemporaryStorageLocation:
    tabsActions.getDataOfTemporaryStorageLocation,
};

export default withRouter(connect(mSTP, mDTP)(Tab));
