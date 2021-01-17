import { createAction } from '@reduxjs/toolkit';

const getAllClientsRequest = createAction('CLIENTS_getAllClientsRequest');
const getAllClientsSuccess = createAction('CLIENTS_getAllClientsSuccess');
const getAllClientsError = createAction('CLIENTS_getAllClientsError');

const createClientRequest = createAction('CLIENTS_createClientRequest');
const createClientSuccess = createAction('CLIENTS_createClientSuccess');
const createClientError = createAction('CLIENTS_createClientError');

const checkboxClientSwitch = createAction('CLIENTS_checkboxClientSwitch');

export default {
  getAllClientsRequest,
  getAllClientsSuccess,
  getAllClientsError,

  createClientRequest,
  createClientSuccess,
  createClientError,

  checkboxClientSwitch,
};
