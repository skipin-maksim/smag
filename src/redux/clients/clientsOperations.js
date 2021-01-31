import axios from 'axios';
import { clientsActions } from './';

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

const removeClients = clients => async dispatch => {
  dispatch(clientsActions.removeClientsRequest());

  try {
    const updateClients = await clients.filter(client => {
      if (client.isChecked === true) {
        axios.delete(`${baseUrl}/clients/${client._id}`);

        // eslint-disable-next-line array-callback-return
        return;
      }
      return client;
    });

    dispatch(clientsActions.removeClientsSuccess(updateClients));
  } catch (error) {
    dispatch(clientsActions.removeClientsError());
    console.error(error);
  }
};

export default { getClients, createClient, removeClients };
