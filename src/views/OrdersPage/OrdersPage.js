import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
class OrdersPage extends React.Component {
  // const onMoveSlideRight = useCallback(
  //   () => dispatch(tabsActions.moveSlideLeft(leftPositionLineTabs - 200)),
  //   [dispatch, leftPositionLineTabs],
  // );
  componentDidMount() {
    this.props.allOrders();
  }

  handleAddNewOrder = name => {
    const isTab = this.props.tabsList.find(
      item => item.name === 'Заказ № ***?',
    );

    if (isTab) {
      alert('Перед созданием нового заказа, сохраните предыдущий заказ');
      return;
    } else {
      this.props.addTab({
        name: 'Заказ № ***?',
        path: '/orders/new-order',
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
    const { ordersList } = this.props;

    return (
      <div className={s.orderPage}>
        <div className={s.ordersSettings}>
          <div className={s.contractorsBlock}>
            <input type="text" className={s.ordersSearch} />
            <Tooltip title={'Выбрать контрагента'} arrow>
              <button
                type="button"
                className={`${s.settingButton} ${s.dotsBtn}`}
              >
                <MoreHorizIcon style={{ color: '#fff' }} />
              </button>
            </Tooltip>
          </div>

          <div className={s.settingButtons}>
            <Tooltip title={'Добавить заказ'} arrow>
              <button
                name={'addNewOrder'}
                to={'orders/new-order'}
                onClick={({ target }) => this.handleAddNewOrder(target.name)}
                className={`${s.settingButton} ${s.addBtn}`}
              >
                <AddIcon style={{ color: '#98C379', fontSize: 21 }} />
                <div className="visually-hidden">Добавить заказ</div>
              </button>
            </Tooltip>

            <Tooltip title={'Изменить заказ'} arrow>
              <button
                type="button"
                // onClick={this.handleAddLineProduct}
                className={`${s.settingButton} ${s.changeBtn}`}
              >
                <EditIcon style={{ color: '#D19A66', fontSize: 21 }} />
                <div className="visually-hidden">Изменить заказ</div>
              </button>
            </Tooltip>

            <Tooltip title={'Удалить заказ'} arrow>
              <button
                type="button"
                // onClick={this.handleAddLineProduct}
                className={`${s.settingButton} ${s.removeBtn}`}
              >
                <DeleteForeverIcon style={{ color: '#DE6A73', fontSize: 21 }} />
                <div className="visually-hidden">Удалить заказ</div>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className={s.tableTitletLine}>
          <CheckBox choiceOption="checkAllOrders" />
          <span>№</span>
          <span>Контрагент</span>
          <span>Позиций</span>
          <span>Количество</span>
          <span>Сумма</span>
          <span>Предоплата</span>
          <span>Дата</span>
          <span>Заметки</span>
        </div>
        <div className={s.windowOrders}>
          <ul className={s.customerOrderList}>
            {ordersList.map((item, idx) => {
              return (
                <LineOrder key={item.id} idx={idx} id={item.id} order={item} />
              );
            })}
          </ul>
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
});

const mDTP = {
  onMoveSlideLeft: tabsActions.moveSlideLeft,
  getCurrentNumOrder: numOrderOperations.getCurrentNumOrder,
  addTab: tabsActions.addTabOrder,
  allOrders: ordersOperations.getAllOrders,
  onClearTemporaryStorageLocation: ordersActions.clearTemporaryStorageLocation,
};

export default withRouter(connect(mSTP, mDTP)(OrdersPage));
