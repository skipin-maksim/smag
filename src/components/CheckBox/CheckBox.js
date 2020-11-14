import React from 'react';
import { connect } from 'react-redux';

import { ordersActions, ordersSelectors } from '../../redux/orders/';

import s from './CheckBox.module.scss';

const CheckBox = ({ choiceOption, getProductLineById, onChangeInput }) => {
  const currentCheckId = getProductLineById ? getProductLineById.id : 0;

  let currentCheckValue;

  if (getProductLineById) {
    currentCheckValue = getProductLineById.checkProduct;
  }

  return (
    <label className={s.checkboxOther}>
      <input
        type="checkbox"
        name="checkProduct"
        onChange={({ target }) => {
          onChangeInput({
            id: currentCheckId,
            value: target.checked,
            name: target.name,
            choiceOption: choiceOption,
          });
        }}
        checked={currentCheckValue}
      />
      <span></span>
    </label>
  );
};

const mSTP = (state, { id }) => ({
  getProductLineById: ordersSelectors.getProductLineById(state, id),
});

const mDTP = {
  onChangeInput: ordersActions.changeLineProductInput,
};

export default connect(mSTP, mDTP)(CheckBox);
