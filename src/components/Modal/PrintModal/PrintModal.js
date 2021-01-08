import React from 'react';
import logoImg from '../../../assets/images/logo-print.svg';

import s from './PrintModal.module.scss';

export default function PrintModal({ currentOrder }) {
  return (
    <div className={s.modalPrint}>
      <div className={s.infoBlock}>
        <img className={s.logo} src={logoImg} alt="logo" />
        <ul className={s.infoMag}>
          <li>+39 393 070 62 45</li>
          <li>+38 393 070 62 45</li>
          <li>+38 393 070 62 45</li>
          <li>emanuelaferretti.tm@gmail.com</li>
          <li>eferretti.com</li>
          <li>г.Винница</li>
        </ul>
      </div>

      <div className={s.orderInfoBlock}>
        <ul className={s.clientInfoBlock}>
          <li>
            {`${currentOrder.clientInfo.secondName} ${currentOrder.clientInfo.firstName} ${currentOrder.clientInfo.thirdName}`}
          </li>
          <li>{currentOrder.clientInfo.city}</li>
          <li>{currentOrder.clientInfo.email}</li>
          <li>{currentOrder.clientInfo.tel}</li>
          <li>{currentOrder.clientInfo.post}</li>
        </ul>

        <ul className={s.calculatedTotals}>
          <li className={s.numOrder}>{`Заказ №${currentOrder.numOrder}`} </li>
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
            <span className={s.liTitle}>Остаток к оплате:</span>{' '}
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

      <div className={s.noteForOrder}>Заметки: {currentOrder.noteForOrder}</div>
    </div>
  );
}
