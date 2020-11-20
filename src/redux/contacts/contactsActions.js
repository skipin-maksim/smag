import { createAction } from '@reduxjs/toolkit';

const getAllContactsRequest = createAction('contacts/getAllContactsRequest');
const getAllContactsSuccess = createAction('contacts/getAllContactsSuccess');
const getAllContactsError = createAction('contacts/getAllContactsError');

export default {
  getAllContactsRequest,
  getAllContactsSuccess,
  getAllContactsError,
};
