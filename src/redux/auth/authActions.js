import { createAction } from '@reduxjs/toolkit';

const authenticated = createAction('AUTH_authenticated');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  authenticated,
};
