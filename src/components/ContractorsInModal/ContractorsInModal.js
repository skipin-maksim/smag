import React from 'react';
import { connect } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';
// import { contactsSelectors } from '../../redux/contacts';
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
}) => {
  const tes = contact => {
    onCloseModal();

    onChoiseContractor(contact);
  };
  return (
    <div className={s.modalContractors}>
      <input
        type="text"
        placeholder="поиск"
        className={s.searchInput}
        onChange={({ target }) => onFilterContractors(target.value)}
        value={filterValue}
      />
      <CloseBtn onClick={onCloseModal} />
      <Scrollbar style={{ width: 549, height: 299 }}>
        <ul className={s.list}>
          {filterContacts.map(contact => (
            <li key={contact.id} onClick={() => tes(contact)}>
              {` ${contact.secondName} ${contact.firstName}  ${contact.thirdName}`}
            </li>
          ))}
        </ul>
      </Scrollbar>
    </div>
  );
};

const mSTP = state => ({
  // allContacts: contactsSelectors.getAllContactsList(state),
  filterContacts: ordersSelectors.getVisibleContractors(state),
  filterValue: ordersSelectors.getFilterValue(state),
});
const mDTP = {
  onCloseModal: modalActions.closeModal,
  onChoiseContractor: ordersActions.choiseContractor,
  onFilterContractors: ordersActions.filterContractors,
};

export default connect(mSTP, mDTP)(ContractorsInModal);
