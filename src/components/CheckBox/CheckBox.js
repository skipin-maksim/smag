import React from 'react';
import { connect } from 'react-redux';

import { ordersActions } from '../../redux/orders/';

import s from './CheckBox.module.scss';

const CheckBox = ({ onChangeInput }) => {
  return (
    <label className={s.checkboxOther}>
      <input
        type="checkbox"
        name="checkProduct"
        onChange={({ target }) =>
          onChangeInput({ value: target.checked, name: target.name })
        }
      />
      <span></span>
    </label>
  );
};

const mDTP = {
  onChangeInput: ordersActions.changeLineProductInput,
};

export default connect(null, mDTP)(CheckBox);
