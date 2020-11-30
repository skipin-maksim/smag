import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabsSelectors, tabsActions } from '../../redux/tabs/';
import { ordersActions, ordersSelectors } from '../../redux/orders';

import CloseBtn from '../Buttons/CloseBtn';

import s from './HeaderComponent.module.scss';

let orderId;

class Tab extends React.Component {
  componentDidMount() {
    this.props.onGetOrderForView(this.getCurrentOrderObjById());
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

  getCurrentOrderObjById = () => {
    if (this.props.history.location.pathname === '/orders/new-order') {
      this.props.onClearAllProducts();
    } else {
      orderId = this.props.history.location.pathname.slice(8);

      return this.props.orderById;
    }
  };

  render() {
    const { name, idx, path, onGetOrderForView } = this.props;

    // TODO -- код ниже, не ломает, но запуска сдесь быть не должно!!!
    this.props.onGetOrderForView(this.getCurrentOrderObjById());

    return (
      <li className={s.tabLi}>
        <NavLink
          exact
          name={path}
          to={path}
          className={s.tab}
          activeClassName={s.tabActive}
          onClick={() => onGetOrderForView(this.getCurrentOrderObjById())}
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
  orderById: ordersSelectors.getOrderById(state, orderId),
});

const mDTP = {
  removeTab: tabsActions.removeTab,
  onGetOrderForView: ordersActions.getOrderForView,
  onClearAllProducts: ordersActions.clearAllProducts,
};

export default withRouter(connect(mSTP, mDTP)(Tab));
