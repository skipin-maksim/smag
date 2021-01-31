import { createAction } from '@reduxjs/toolkit';

const authenticated = createAction('AUTH_authenticated');

const logInRequest = createAction('AUTH_logInRequest');
const logInSuccess = createAction('AUTH_logInSuccess');
const logInError = createAction('AUTH_logInError');

const getCurrentUserRequest = createAction('AUTH_getCurrentUserSuccess');
const getCurrentUserSuccess = createAction('AUTH_getCurrentUserSuccess');
const getCurrentUserError = createAction('AUTH_getCurrentUserError');

export default {
  authenticated,

  logInRequest,
  logInSuccess,
  logInError,

  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
};
