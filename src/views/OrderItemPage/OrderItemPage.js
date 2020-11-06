import React from 'react';
import { Link } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import LineOrderProduct from '../../components/LineOrderProduct/LineOrderProduct';
import s from './OrderItemPage.module.scss';

export default function OrderItemPage() {
  return (
    <div className={s.orderPage}>
      <div className={s.ordersSettings}>
        <div className={s.contractorsBlock}>
          <input type="text" className={s.ordersSearch} />
          <Tooltip title={'Выбрать контрагента'} arrow>
            <button type="button" className={`${s.settingButton} ${s.dotsBtn}`}>
              <MoreHorizIcon style={{ color: '#fff' }} />
            </button>
          </Tooltip>
        </div>

        <div className={s.settingButtons}>
          <Tooltip title={'Добавить товар'} arrow>
            <Link
              to={`/`}
              // onClick={this.handleAddLineProduct}
              className={`${s.settingButton} ${s.addBtn}`}
            >
              <AddIcon style={{ color: '#98C379', fontSize: 21 }} />
              <div className="visually-hidden">Добавить заказ</div>
            </Link>
          </Tooltip>

          <Tooltip title={'Удалить товар'} arrow>
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
        <span className={s.nameSpan}>Артикул</span>
        <span className={s.positionsSpan}>Цвет</span>
        <span className={s.quantitySpan}>Количество</span>
        <span className={s.sumSpan}>Скидка </span>
        <span className={s.prepaymentSpan}>Сумма</span>
        <span className={s.noteSpan}>Примечание</span>
      </div>
      <div className={s.windowOrders}>
        <ul className={s.customerOrderList}>
          <LineOrderProduct />
          {/* {ordersList.map((item, idx) => {
            return <CustomerOrderItem key={item.id} idx={idx} id={item.id} />;
          })} */}
        </ul>
      </div>

      <div className={s.orderWrapper}></div>
    </div>
  );
}
