import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { ordersActions } from '../../redux/orders';
import CustomerOrderItem from '../../components/CustomerOrderItem/CustomerOrderItem';

import s from './OrdersPage.module.scss';

class OrdersPage extends React.Component {
  state = {};

  handleAddLineProduct = () => {
    this.props.addOrder();
    console.log('hi');
  };

  render() {
    return (
      <div className={s.orderPage}>
        <div className={s.ordersSettings}>
          <div className={s.contractorsBlock}>
            <input type="text" className={s.ordersSearch} />
            <Tooltip title={'Выбрать контрагента'} arrow>
              <button type="button">
                <MoreHorizIcon />
              </button>
            </Tooltip>
          </div>

          <div className={s.settingButtons}>
            <Tooltip title={'Добавить заказ'} arrow>
              <button
                type="button"
                onClick={this.handleAddLineProduct}
                className={`${s.settingButton} ${s.addBtn}`}
              >
                <AddIcon />
                <div className="visually-hidden">Добавить заказ</div>
              </button>
            </Tooltip>

            <Tooltip title={'Изменить заказ'} arrow>
              <button
                type="button"
                onClick={this.handleAddLineProduct}
                className={`${s.settingButton} ${s.changeBtn}`}
              >
                <EditIcon />
                <div className="visually-hidden">Изменить заказ</div>
              </button>
            </Tooltip>

            <Tooltip title={'Удалить заказ'} arrow>
              <button
                type="button"
                onClick={this.handleAddLineProduct}
                className={`${s.settingButton} ${s.removeBtn}`}
              >
                <DeleteForeverIcon />
                <div className="visually-hidden">Удалить заказ</div>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className={s.customerOrderTitletLine}>
          <span className={s.numSpan}>№</span>
          <span className={s.nameSpan}>Контрагент</span>
          <span className={s.positionsSpan}>Позиций</span>
          <span className={s.quantitySpan}>Количество</span>
          <span className={s.sumSpan}>Сумма</span>
          <span className={s.prepaymentSpan}>Предоплата</span>
        </div>
        <div className={s.windowOrders}>
          <ul className={s.customerOrderList}>
            <CustomerOrderItem />
          </ul>
        </div>

        <div className={s.orderWrapper}></div>
      </div>
    );
  }
}

const mDTP = {
  addOrder: ordersActions.addOrder,
};

export default connect(null, mDTP)(OrdersPage);
