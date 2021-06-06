import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clientsActions, clientsSelectors } from '../../redux/clients';
import { ordersSelectors } from '../../redux/orders';

import CheckBox from '../CheckBox/CheckBox';
import Line from '../Line/Line';
import Modal from '../Modal/Modal';
import AddEditClientModal from '../Modal/AddEditClientModal/AddEditClientModal';

import s from './LineClient.module.scss';
import sw from '../../components/WindowTable/TitleTableClient/TitleTableClient.module.scss';

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

  const [isModalClient, setIsModalClient] = useState(false);
  const dispatch = useDispatch();

  const allOrders = useSelector(ordersSelectors.getOrdersList);
  const onGetClientById = useSelector(state =>
    clientsSelectors.getClientById(state, _id),
  );

  const clientOrders = allOrders.filter(
    ({ clientInfo }) =>
      clientInfo.secondName === secondName && clientInfo.tel === tel,
  );

  const checkboxClientSwitch = useCallback(
    checkboxValue =>
      dispatch(clientsActions.checkboxClientSwitch({ ...checkboxValue, _id })),
    [dispatch, _id],
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

  const toggleModal = () => {
    setIsModalClient(!isModalClient);
  };

  return (
    <>
      <Line gridClass={sw.grid} idx={idx}>
        {/* <li className={`${s.clientLine} ${lineColorPick(idx)} ${sw.grid}`}> */}
        <CheckBox
          id={_id}
          name="checkClient"
          isChecked={onGetClientById.isChecked}
          onChange={checkboxClientSwitch}
        />
        <span>{idx + 1}</span>
        <span
          onClick={toggleModal}
          className={s.clickableInput}
        >{`${secondName} ${firstName} ${thirdName}`}</span>
        <span>{totalOrders}</span>
        <span>{totalDataOfClientOrder.quantity.toLocaleString('ru')}</span>
        <span>{totalDataOfClientOrder.sum.toLocaleString('ru')}</span>
        <span className={`${s.debt} ${isBadDebt}`}>
          {debt.toLocaleString('ru')}
        </span>
        <span>{city}</span>
        <span>{post}</span>
        <span>{email}</span>
        {/* </li> */}
      </Line>
      {isModalClient && (
        <Modal
          children={
            <AddEditClientModal
              clientInfo={client}
              onCloseModal={toggleModal}
            />
          }
          onCloseModal={toggleModal}
        />
      )}
    </>
  );
}
