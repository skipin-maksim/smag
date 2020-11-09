import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { ordersSelectors } from '../../redux/orders';
import { tabsActions } from '../../redux/tabs';
import CustomerOrderItem from '../../components/CustomerOrderItem/CustomerOrderItem';

import s from './OrdersPage.module.scss';

class OrdersPage extends React.Component {
  handleAddLineProduct = () => {
    // this.props.addOrder();
    const { valueStr: currentOrder } = this.props.currentOrder;

    this.props.addTab({
      name: `Заказ №${currentOrder}`,
      path: `/orders/${currentOrder}`,
    });
  };

  render() {
    const {
      ordersList,
      currentOrder: { valueStr: currentOrder },
    } = this.props;

    console.log(currentOrder);

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
                to={`orders/${currentOrder}`}
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
            {ordersList.map((item, idx) => {
              return <CustomerOrderItem key={item.id} idx={idx} id={item.id} />;
            })}
          </ul>
        </div>

        <div className={s.orderWrapper}></div>
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
  addTab: tabsActions.addTab,
};

export default connect(mSTP, mDTP)(OrdersPage);
