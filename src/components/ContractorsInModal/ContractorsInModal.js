import React from 'react';
import { connect } from 'react-redux';
import { contactsSelectors } from '../../redux/contacts';
import { modalActions } from '../../redux/modal';
import CloseBtn from '../Buttons/CloseBtn';

import s from './ContractorsInModal.module.scss';

const ContractorsInModal = ({ allContacts, onCloseModal }) => {
  console.log(allContacts);
  return (
    <div className={s.modalContractors}>
      <input type="text" placeholder="поиск" className={s.searchInput} />
      <CloseBtn onClick={onCloseModal} />
      <ul className={s.list}>
        {allContacts.map(contact => (
          <li key={contact.id}>
            {` ${contact.secondName} ${contact.firstName}  ${contact.thirdName}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mSTP = state => ({
  allContacts: contactsSelectors.getAllContactsList(state),
});
const mDTP = {
  onCloseModal: modalActions.closeModal,
};

export default connect(mSTP, mDTP)(ContractorsInModal);
