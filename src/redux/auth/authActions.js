import { createAction } from '@reduxjs/toolkit';

const authenticated = createAction('AUTH_authenticated');

export default {
  authenticated,
};
