import { createAction } from '@reduxjs/toolkit';

const openModal = createAction('modal/openModal');
const closeModal = createAction('modal/closeModal');

export default { openModal, closeModal };
