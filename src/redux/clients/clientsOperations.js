import axios from 'axios';
import { clientsActions } from '.';

const baseUrl = 'https://smagserver.herokuapp.com';

const getClients = () => async dispatch => {
  dispatch(clientsActions.getAllClientsRequest());

  try {
    const { data } = await axios(`${baseUrl}/clients`);

    //TODO перенести сортировку сюда!

    dispatch(clientsActions.getAllClientsSuccess(data.clients));
  } catch (error) {
    dispatch(clientsActions.getAllClientsError(error));
  }
};

const createClient = postData => async dispatch => {
  dispatch(clientsActions.createClientRequest());

  try {
    const { data } = await axios.post(`${baseUrl}/clients`, postData);

    dispatch(clientsActions.createClientSuccess(data.client));
    return data;
  } catch (error) {
    dispatch(clientsActions.createClientError(error.response.data));

    console.error(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getClients, createClient };
