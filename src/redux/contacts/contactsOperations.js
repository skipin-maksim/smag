import axios from 'axios';
import { contactsActions } from './';

const baseUrl = 'https://smagserver.herokuapp.com';

const getContacts = () => async dispatch => {
  dispatch(contactsActions.getAllContactsRequest());

  try {
    const { data } = await axios(`${baseUrl}/clients`);

    dispatch(contactsActions.getAllContactsSuccess(data.clients));
  } catch (error) {
    dispatch(contactsActions.getAllContactsError(error));
  }
};

export default { getContacts };
