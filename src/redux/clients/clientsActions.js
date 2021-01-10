import { createAction } from '@reduxjs/toolkit';

const getAllClientsRequest = createAction('CLIENTS_getAllClientsRequest');
const getAllClientsSuccess = createAction('CLIENTS_getAllClientsSuccess');
const getAllClientsError = createAction('CLIENTS_getAllClientsError');

const checkboxClientSwitch = createAction('CLIENTS_checkboxClientSwitch');

export default {
  getAllClientsRequest,
  getAllClientsSuccess,
  getAllClientsError,

  checkboxClientSwitch,
};
