import { createAction } from '@reduxjs/toolkit';

const authenticated = createAction('AUTH/authenticated');

export default {
  authenticated,
};
