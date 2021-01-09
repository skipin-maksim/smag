import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';

import { contactsSelectors } from '../../../redux/contacts';
import { ordersActions, ordersSelectors } from '../../../redux/orders';

import CloseBtn from '../../buttons/CloseBtn/CloseBtn';
import Spinner from '../../Spinner/Spinner';

import s from './ClientsInModal.module.scss';

export default function ClientsInModal({ onCloseModal }) {
  const isLoading = useSelector(contactsSelectors.getIsLoading);
  const filterValue = useSelector(ordersSelectors.getFilterValue);
  const filterContacts = useSelector(ordersSelectors.getVisibleClients);

  const dispatch = useDispatch();

  const onChoiseClient = useCallback(
    contact => {
      dispatch(ordersActions.choiseClient(contact));
    },
    [dispatch],
  );

  const onFilterClients = useCallback(
    value => {
      dispatch(ordersActions.filterClients(value));
    },
    [dispatch],
  );

  const handleCloseModal = contact => {
    onChoiseClient(contact);
    onCloseModal();
  };

  return (
    <div className={s.modalClients}>
      <CloseBtn
        onClick={onCloseModal}
        additionalClassName={s.contarctorClose}
      />

      <input
        type="text"
        placeholder="поиск"
        className={s.searchInput}
        onChange={({ target }) => onFilterClients(target.value.toLowerCase())}
        value={filterValue}
      />

      <Scrollbar style={{ width: 549, height: 299 }}>
        <ul className={s.list}>
          {filterContacts
            .map(contact => (
              <li
                key={contact._id}
                onClick={() => {
                  handleCloseModal(contact);
                }}
              >
                {` ${contact.secondName} ${contact.firstName}  ${contact.thirdName}`}
              </li>
            ))
            .sort(function (a, b) {
              if (a.props.children > b.props.children) {
                return 1;
              }
              if (a.props.children < b.props.children) {
                return -1;
              }
              return 0;
            })}
        </ul>
      </Scrollbar>
      {isLoading && <Spinner />}
    </div>
  );
}
