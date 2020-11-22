import React from 'react';
import { connect } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';
import PulseLoader from 'react-spinners/PulseLoader';
import { contactsSelectors } from '../../redux/contacts';
import { modalActions } from '../../redux/modal';
import { ordersActions, ordersSelectors } from '../../redux/orders';
import CloseBtn from '../Buttons/CloseBtn';

import s from './ContractorsInModal.module.scss';

const ContractorsInModal = ({
  filterContacts,
  onCloseModal,
  onChoiseContractor,
  onFilterContractors,
  filterValue,
  isLoading,
}) => {
  const handleCloseModal = contact => {
    onChoiseContractor(contact);
    onCloseModal();
  };

  return (
    <div className={s.modalContractors}>
      <CloseBtn onClick={onCloseModal} />

      <input
        type="text"
        placeholder="поиск"
        className={s.searchInput}
        onChange={({ target }) => onFilterContractors(target.value)}
        value={filterValue}
      />

      <Scrollbar style={{ width: 549, height: 299 }}>
        <div className={s.loader}>
          <PulseLoader
            size={15}
            margin={10}
            color={'#1C2B4A'}
            loading={isLoading}
          />
        </div>

        <ul className={s.list}>
          {filterContacts.map(contact => (
            <li key={contact.id} onClick={() => handleCloseModal(contact)}>
              {` ${contact.secondName} ${contact.firstName}  ${contact.thirdName}`}
            </li>
          ))}
        </ul>
      </Scrollbar>
    </div>
  );
};

const mSTP = state => ({
  isLoading: contactsSelectors.getIsLoading(state),
  filterContacts: ordersSelectors.getVisibleContractors(state),
  filterValue: ordersSelectors.getFilterValue(state),
});
const mDTP = {
  onCloseModal: modalActions.closeModal,
  onChoiseContractor: ordersActions.choiseContractor,
  onFilterContractors: ordersActions.filterContractors,
};

export default connect(mSTP, mDTP)(ContractorsInModal);
