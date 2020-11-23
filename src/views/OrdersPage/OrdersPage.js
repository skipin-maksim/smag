import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { ordersSelectors, ordersOperations } from '../../redux/orders';
import { tabsActions } from '../../redux/tabs';
import LineOrder from '../../components/LineOrder/LineOrder';

import s from './OrdersPage.module.scss';
import CheckBox from '../../components/CheckBox/CheckBox';

class OrdersPage extends React.Component {
  componentDidMount() {
    this.props.allOrders();
  }

  handleAddLineProduct = () => {
    this.props.addTab({
      name: 'Заказ № ***?',
      path: '/orders/new-order',
    });
  };

  render() {
    const {
      ordersList,
      // currentOrder: { valueStr: currentOrder },
    } = this.props;

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
              <Link
                to={'orders/new-order'}
                onClick={this.handleAddLineProduct}
                className={`${s.settingButton} ${s.addBtn}`}
              >
                <AddIcon style={{ color: '#98C379', fontSize: 21 }} />
                <div className="visually-hidden">Добавить заказ</div>
              </Link>
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
  currentOrder: ordersSelectors.getCurrentOrderNum(state),
});

const mDTP = {
  // addOrder: ordersActions.addOrder,
  addTab: tabsActions.addTabOrder,
  allOrders: ordersOperations.getAllOrders,
};

export default connect(mSTP, mDTP)(OrdersPage);
