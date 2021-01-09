import { createAction } from '@reduxjs/toolkit';

const getAllClientsRequest = createAction('CONTACTS_getAllClientsRequest');
const getAllClientsSuccess = createAction('CONTACTS_getAllClientsSuccess');
const getAllClientsError = createAction('CONTACTS_getAllClientsError');

export default {
  getAllClientsRequest,
  getAllClientsSuccess,
  getAllClientsError,
};
