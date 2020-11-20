import React from 'react';
import { connect } from 'react-redux';
import { contactsSelectors } from '../../redux/contacts';

const ContractorsInModal = ({ allContacts }) => {
  console.log(allContacts);
  return (
    <div className="whiteLine">
      <input type="text" placeholder="поиск" />
      <ul>
        {allContacts.map(contact => (
          <li key={contact.id}>
            {`${contact.firstName} ${contact.secondName} ${contact.thirdName}`}
            <span>{contact.debt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mSTP = state => ({
  allContacts: contactsSelectors.getAllContactsList(state),
});
const mDTP = {};

export default connect(mSTP, mDTP)(ContractorsInModal);
