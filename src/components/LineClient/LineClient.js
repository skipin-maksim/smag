import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import lineColorPick from '../../helpers/lineColorPick';
import { ordersOperations, ordersSelectors } from '../../redux/orders';

import CheckBox from '../CheckBox/CheckBox';

import s from './LineClient.module.scss';

export default function LineClient({ client, idx }) {
  const {
    _id,
    city,
    debt,
    email,
    firstName,
    post,
    secondName,
    tel,
    thirdName,
  } = client;
  const dispatch = useDispatch();

  const allOrders = useSelector(ordersSelectors.getOrdersList);

  const getAllOrders = useCallback(() => {
    dispatch(ordersOperations.getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const clientOrders = allOrders.filter(
    ({ clientInfo }) =>
      clientInfo.secondName === secondName && clientInfo.tel === tel,
  );

  const totalOrders = clientOrders.length;
  const totalDataOfClientOrder = clientOrders.reduce(
    (acc, { calculatedTotals }) => {
      const { quantity, sum } = calculatedTotals;
      const { quantity: accQuantity, sum: accSum } = acc;

      return {
        quantity: accQuantity + quantity,
        sum: accSum + sum,
      };
    },
    { quantity: 0, sum: 0 },
  );

  const isBadDebt = debt < 0 ? s.badDebt : s.goodDebt;

  return (
    <li className={`${s.clientLine} ${lineColorPick(idx)}`}>
      <CheckBox
        id={_id}
        // name="checkOrder"
        // isChecked={currentLineOrderById.isCheckedOrder}
        // onChange={onChangeCheckbox}
      />
      <span>{idx + 1}</span>
      <span>{`${secondName} ${firstName} ${thirdName}`}</span>
      <span>{totalOrders}</span>
      <span>{totalDataOfClientOrder.quantity.toLocaleString('ru')}</span>
      <span>{totalDataOfClientOrder.sum.toLocaleString('ru')}</span>
      <span className={`${s.debt} ${isBadDebt}`}>
        {debt.toLocaleString('ru')}
      </span>
      <span>{city}</span>
      <span>{post}</span>
      <span>{email}</span>
    </li>
  );
}

// _id
// :
// "5fdf2f1d619af701b07c5d46"
// city
// :
// "Полтава"
// debt
// :
// -415
// email
// :
// "vadim@gmail.com"
// firstName
// :
// "Вадим"
// post
// :
// "Новая Почта 20"
// secondName
// :
// "Семенов"
// tel
// :
// "+38 050 521 85 95"
// thirdName
// :
// "Викторович"
// updatedAt
// :
