import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';

import {
  ordersSelectors,
  ordersOperations,
  ordersActions,
} from '../../redux/orders';
import { tabsActions, tabsSelectors } from '../../redux/tabs';
import { numOrderOperations, numOrderSelectors } from '../../redux/numOrder/';

import LineOrder from '../../components/LineOrder/LineOrder';
import CheckBox from '../../components/CheckBox/CheckBox';

import s from './OrdersPage.module.scss';
import AddBtn from '../../components/Buttons/AddBtn/AddBtn';
import RemoveBtn from '../../components/Buttons/RemoveBtn/RemoveBtn';
import EditBtn from '../../components/Buttons/EditBtn/EditBtn';

import notification from 'toastr';

// import routes from '../../routes';
class OrdersPage extends React.Component {
  componentDidMount() {
    this.props.allOrders();
  }

  handleAddNewOrder = name => {
    const isTab = this.props.tabsList.find(
      item => item.name === 'Заказ № ***?',
    );

    if (isTab) {
      notification.warning(
        'Перед созданием нового заказа, сохраните предыдущий заказ',
        'Предупреждение',
      );
      return;
    } else {
      this.props.addTab({
        name: 'Заказ № ***?',
        path: `/orders/new-order`,
      });

      if (this.props.widthLineTabs > 1300) {
        const futurePositionLeft = this.props.widthLineTabs - 1212;
        this.props.onMoveSlideLeft(-futurePositionLeft);
      }

      this.props.onClearTemporaryStorageLocation();

      this.props.getCurrentNumOrder();

      this.props.history.replace('/orders/new-order');
    }
  };

  render() {
    const { visibleOrders, filterOrderValue, onFilterOrders } = this.props;

    return (
      <div className={s.orderPage}>
        <div className={s.ordersSettings}>
          <input
            type="text"
            className={s.ordersSearch}
            value={filterOrderValue}
            onChange={({ target }) => onFilterOrders(target.value)}
          />

          <div className={s.settingButtons}>
            <AddBtn
              data={{ isSaved: false }}
              onCreate={this.handleAddNewOrder}
            />

            <EditBtn />

            <RemoveBtn data={{ isSaved: false }} />
          </div>
        </div>

        <div className={s.tableTitletLine}>
          <CheckBox choiceOption="checkAllOrders" />
          <span>№</span>
          <span>Клиент</span>
          <span>Позиций</span>
          <span>Количество</span>
          <span>Сумма</span>
          <span>Предоплата</span>
          <span>Дата</span>
          <span>Статус</span>
          <span>Заметки</span>
        </div>

        <div className={s.windowOrders}>
          <Scrollbar
            style={{
              width: 1567,
              height: 550,
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.233)',
            }}
          >
            <ul className={s.customerOrderList}>
              {visibleOrders
                .map((item, idx) => {
                  return (
                    <LineOrder
                      key={item._id}
                      idx={idx}
                      id={item.numOrder}
                      order={item}
                    />
                  );
                })
                .reverse()}
            </ul>
          </Scrollbar>
        </div>
      </div>
    );
  }
}

const mSTP = state => ({
  ordersList: ordersSelectors.getOrdersList(state),
  currentOrder: numOrderSelectors.getCurrentNum(state),
  tabsList: tabsSelectors.getTabsList(state),
  dataOfTemporaryStorageLocation: ordersSelectors.getDataOfTemporaryStorageLocation(
    state,
  ),
  widthLineTabs: tabsSelectors.getWidthLineTabs(state),
  filterOrderValue: ordersSelectors.getFilterOrdersValue(state),
  visibleOrders: ordersSelectors.getVisibleOrders(state),
});

const mDTP = {
  onMoveSlideLeft: tabsActions.moveSlideLeft,
  getCurrentNumOrder: numOrderOperations.getCurrentNumOrder,
  addTab: tabsActions.addTabOrder,
  allOrders: ordersOperations.getAllOrders,
  onClearTemporaryStorageLocation: ordersActions.clearTemporaryStorageLocation,
  onFilterOrders: ordersActions.filterOrders,
};

export default withRouter(connect(mSTP, mDTP)(OrdersPage));
