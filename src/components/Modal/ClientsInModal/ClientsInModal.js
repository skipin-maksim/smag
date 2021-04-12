import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';

import { clientsSelectors } from '../../../redux/clients';
import { ordersActions, ordersSelectors } from '../../../redux/orders';

import Spinner from '../../Spinner/Spinner';
import InnerModal from '../InnerModal/InnerModal';

import s from './ClientsInModal.module.scss';

export default function ClientsInModal({ onCloseModal }) {
  const isLoading = useSelector(clientsSelectors.getIsLoading);
  const filterValue = useSelector(ordersSelectors.getFilterValue);
  const filterClients = useSelector(ordersSelectors.getVisibleClients);

  const dispatch = useDispatch();

  const onChoiceClient = useCallback(
    client => {
      dispatch(ordersActions.choiseClient(client));
    },
    [dispatch],
  );

  const onFilterClients = useCallback(
    value => {
      dispatch(ordersActions.filterClients(value));
    },
    [dispatch],
  );

  const handleCloseModal = client => {
    onChoiceClient(client);
    onCloseModal();
  };

  return (
    <InnerModal onCloseModal={onCloseModal} title={'Выбор клиента'}>
      <input
        type="text"
        placeholder="поиск"
        className={s.searchInput}
        onChange={({ target }) => onFilterClients(target.value.toLowerCase())}
        value={filterValue}
      />

      <Scrollbar style={{ width: 409, height: 299 }}>
        <ul className={s.list}>
          {filterClients.map(client => (
            <li
              key={client._id}
              onClick={() => {
                handleCloseModal(client);
              }}
            >
              {` ${client.secondName} ${client.firstName}  ${client.thirdName}`}
            </li>
          ))}
        </ul>
      </Scrollbar>
      {isLoading && <Spinner />}
    </InnerModal>
  );
}
