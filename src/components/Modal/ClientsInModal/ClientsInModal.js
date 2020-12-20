import React from 'react';
import { connect } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';

import { contactsSelectors } from '../../../redux/contacts';
import { ordersActions, ordersSelectors } from '../../../redux/orders';

import CloseBtn from '../../Buttons/CloseBtn';
import Spinner from '../../Spinner/Spinner';

import s from './ClientsInModal.module.scss';

const ClientsInModal = ({
  filterContacts,
  onCloseModal,
  onChoiseClient,
  onFilterClients,
  filterValue,
  isLoading,
}) => {
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
        onChange={({ target }) => onFilterClients(target.value)}
        value={filterValue}
      />

      <Scrollbar style={{ width: 549, height: 299 }}>
        <ul className={s.list}>
          {filterContacts.map(contact => (
            <li
              key={contact._id}
              onClick={() => {
                handleCloseModal(contact);
              }}
            >
              {` ${contact.secondName} ${contact.firstName}  ${contact.thirdName}`}
            </li>
          ))}
        </ul>
      </Scrollbar>
      {isLoading && <Spinner />}
    </div>
  );
};

const mSTP = state => ({
  isLoading: contactsSelectors.getIsLoading(state),
  filterContacts: ordersSelectors.getVisibleClients(state),
  filterValue: ordersSelectors.getFilterValue(state),
});
const mDTP = {
  onChoiseClient: ordersActions.choiseClient,
  onFilterClients: ordersActions.filterClients,
};

export default connect(mSTP, mDTP)(ClientsInModal);
