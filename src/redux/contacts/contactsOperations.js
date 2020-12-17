import axios from 'axios';
import { contactsActions } from './';

const baseUrl = 'http://localhost:2000';

const getContacts = () => async dispatch => {
  dispatch(contactsActions.getAllContactsRequest());

  try {
    const { data } = await axios(`${baseUrl}/clients`);

    dispatch(contactsActions.getAllContactsSuccess(data));
  } catch (error) {
    dispatch(contactsActions.getAllContactsError(error));
  }
};

export default { getContacts };
