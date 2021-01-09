import axios from 'axios';
import { clientsActions } from '.';

const baseUrl = 'https://smagserver.herokuapp.com';

const getClients = () => async dispatch => {
  dispatch(clientsActions.getAllClientsRequest());

  try {
    const { data } = await axios(`${baseUrl}/clients`);

    dispatch(clientsActions.getAllClientsSuccess(data.clients));
  } catch (error) {
    dispatch(clientsActions.getAllClientsError(error));
  }
};

export default { getClients };
