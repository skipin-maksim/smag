import { createAction } from '@reduxjs/toolkit';

const getAllContactsRequest = createAction('CONTACTS_getAllContactsRequest');
const getAllContactsSuccess = createAction('CONTACTS_getAllContactsSuccess');
const getAllContactsError = createAction('CONTACTS_getAllContactsError');

export default {
  getAllContactsRequest,
  getAllContactsSuccess,
  getAllContactsError,
};
