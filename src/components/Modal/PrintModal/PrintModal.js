import React from 'react';
import logoImg from '../../../assets/images/logo3.png';

import s from './PrintModal.module.scss';

export default function PrintModal({ currentOrder }) {
  return (
    <div className={s.modalPrint}>
      <div className={s.infoBlock}>
        <img className={s.logo} src={logoImg} alt="logo" />
        <ul className={s.infoMag}>
          <li>
            {'моб. (it)'} <span>+39 393 070 62 45</span>
          </li>
          <li>
            {'моб. (ua)'} <span>+38 393 070 62 45</span>
          </li>
          <li>
            {'моб. (ua)'} <span>+38 393 070 62 45</span>
          </li>
          <li>
            email <span>emanuelaferretti.tm@gmail.com</span>
          </li>
          <li>
            www <span>eferretti.com</span>
          </li>
          <li>
            адрес <span>г.Винница</span>
          </li>
        </ul>
      </div>

      <div className={s.orderInfoBlock}>
        <div className={s.numOrder}>{`Заказ №${currentOrder.numOrder}`} </div>

        <ul className={s.calculatedTotals}>
          <li>
            <span className={s.liTitle}>Единиц:</span>
            <span>
              {currentOrder.calculatedTotals.quantity.toLocaleString('ru')}
            </span>
          </li>
          <li>
            <span className={s.liTitle}>На сумму:</span>{' '}
            <span>
              {currentOrder.calculatedTotals.sum.toLocaleString('ru')}
            </span>
          </li>
          <li>
            <span className={s.liTitle}>Предоплата:</span>{' '}
            <span>{currentOrder.prepayment.toLocaleString('ru')}</span>
          </li>
          <li>
            <span className={s.liTitle}>Остаток:</span>{' '}
            <span>
              {currentOrder.calculatedTotals.remainderPaid < 0
                ? 0
                : currentOrder.calculatedTotals.remainderPaid.toLocaleString(
                    'ru',
                  )}
            </span>
          </li>
        </ul>
      </div>

      <ul className={s.clientInfoBlock}>
        <li>
          <span className={s.clientInfoTitle}>Клиент:</span>
          <span>{`${currentOrder.clientInfo.secondName} ${currentOrder.clientInfo.firstName} ${currentOrder.clientInfo.thirdName}`}</span>
        </li>
        <li>
          <span className={s.clientInfoTitle}>Город:</span>
          <span>{`${currentOrder.clientInfo.city}`}</span>
        </li>
        <li>
          <span className={s.clientInfoTitle}>Email:</span>
          <span>{`${currentOrder.clientInfo.email}`}</span>
        </li>
        <li>
          <span className={s.clientInfoTitle}>Телефон:</span>
          <span>{`${currentOrder.clientInfo.tel}`}</span>
        </li>
        <li>
          <span className={s.clientInfoTitle}>Доставка:</span>
          <span>{`Новая Почта ${currentOrder.clientInfo.post}`}</span>
        </li>
      </ul>

      <ul className={s.customerOrderList}>
        <li className={`${s.lineProduct}, ${s.lineTitle}`}>
          <span>№</span>
          <span>Артикул</span>
          <span>Цвет</span>
          <span>Кол-во</span>
          <span>Цена</span>
          <span>Скидка</span>
          <span>Сумма</span>
          <span>Заметки</span>
        </li>
        {currentOrder.items.map((item, idx) => {
          const isLast = idx === 27 ? s.lineMargin : s.lineProduct;

          return (
            <li className={isLast} key={item.id}>
              <span>{idx + 1}</span>
              <span>{item.vendorCode}</span>
              <span>{item.color}</span>
              <span className={s.quantity}>
                {item.quantity.toLocaleString('ru')}
              </span>
              <span>{item.price.toLocaleString('ru')}</span>
              <span>{item.discount}</span>
              <span>{item.sum.toLocaleString('ru')}</span>
              <span>{item.note}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
