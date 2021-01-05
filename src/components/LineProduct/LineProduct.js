import React from 'react';
import { connect } from 'react-redux';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders/';
import { tabsActions } from '../../redux/tabs/';

import lineColorPick from '../../helpers/lineColorPick';
import { CheckBox } from '../CheckBox/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import colorsList from '../../data/colorsList';
import s from './LineProduct.module.scss';

const LineOrderProduct = ({
  id,
  idx,
  getProductLineById,
  currentOrder,
  ...actions
}) => {
  const {
    onChangeInput,
    onChangeInputQuantity,
    onCalculateSum,
    onCalculateTotalSum,
    onCalculateTotalQuantity,
    onCalculateRemainderPaid,
    onGetVendorCodePrice,
    onSaveToTemporaryStorageLocation,
  } = actions;

  const handleQuantity = (vendorCodeValue, name) => {
    onChangeInputQuantity({ value: vendorCodeValue, name });

    onCalculateSum();
    onCalculateTotalQuantity();
    onCalculateTotalSum();
    onCalculateRemainderPaid();

    if (!currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);
  };

  const handleDiscount = (vendorCodeValue, name) => {
    onChangeInput({ value: vendorCodeValue, name });

    onCalculateSum();
    onCalculateTotalSum();
    onCalculateRemainderPaid();

    if (!currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);
  };

  const handleVendorCode = async target => {
    if (target.value) {
      await onGetVendorCodePrice(target.value);
    } else {
      return;
    }

    onCalculateSum();
    onCalculateTotalSum();
    onCalculateRemainderPaid();

    if (!currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);
  };

  const handleOnBlurColor = (value, name, id) => {
    onChangeInput({
      value,
      name,
      id,
    });

    if (!currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);
  };

  const handleOnBlurNote = () => {
    if (!currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);
  };

  return (
    <li className={`${lineColorPick(idx)} ${s.lineProduct}`}>
      <CheckBox
        id={id}
        name="checkProduct"
        isChecked={getProductLineById.checkProduct}
        onChange={onChangeInput}
        isDisabled={currentOrder.isSaved}
      />
      <span className={s.numSpan}>{idx + 1}</span>
      <input
        autoComplete="off"
        autoFocus
        type="text"
        placeholder="артикул"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        onBlur={({ target }) => handleVendorCode(target)}
        value={getProductLineById.vendorCode}
        name="vendorCode"
        className={s.nameSpan}
        disabled={currentOrder.isSaved}
      />
      <Autocomplete
        disabled={!getProductLineById.vendorCode}
        className={s.colorSpan}
        style={{ textAlign: 'center' }}
        options={colorsList.map(option => option.title)}
        renderInput={params => (
          <div ref={params.InputProps.ref}>
            <input
              {...params.inputProps}
              disabled={currentOrder.isSaved || !getProductLineById.vendorCode}
              type="text"
              name="color"
              placeholder="выберите цвет"
              value={
                params.inputProps.value
                  ? params.inputProps.value
                  : getProductLineById.color
              }
              onBlur={({ target }) =>
                handleOnBlurColor(params.inputProps.value, target.name, id)
              }
            />
          </div>
        )}
      />
      <input
        type="number"
        placeholder="количество"
        onChange={({ target }) => handleQuantity(target.value, target.name)}
        name="quantity"
        value={getProductLineById.quantity}
        className={s.quantitySpan}
        disabled={currentOrder.isSaved || !getProductLineById.vendorCode}
      />
      <input
        type="number"
        placeholder="цена"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        name="price"
        value={getProductLineById.price}
        className={`${s.priceSpan} ${
          getProductLineById.vendorCode && s.disabled
        }`}
        disabled
      />
      <input
        type="number"
        placeholder="скидка"
        onChange={({ target }) => handleDiscount(target.value, target.name)}
        name="discount"
        value={getProductLineById.discount}
        className={s.discountSpan}
        disabled={currentOrder.isSaved || !getProductLineById.vendorCode}
      />
      <input
        type="number"
        placeholder="number"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        name="sum"
        value={getProductLineById.sum}
        className={`${s.sumSpan} ${
          getProductLineById.vendorCode && s.disabled
        }`}
        disabled
      />
      <input
        autoComplete="off"
        type="text"
        placeholder="заметка"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        onBlur={handleOnBlurNote}
        name="note"
        value={getProductLineById.note}
        className={s.noteSpan}
        disabled={currentOrder.isSaved || !getProductLineById.vendorCode}
      />
    </li>
  );
};

const mSTP = (state, { id }) => ({
  getProductLineById: ordersSelectors.getProductLineById(state, id),
  currentOrder: ordersSelectors.getCurrentOrder(state),
});
const mDTP = (dispatch, { id }) => ({
  onChangeInput: values => {
    return dispatch(ordersActions.changeLineProductInput({ id, ...values }));
  },
  onChangeInputQuantity: values => {
    return dispatch(
      ordersActions.changeLineProductInputQuantity({ id, ...values }),
    );
  },
  onGetVendorCodePrice: vendorCode => {
    return dispatch(ordersOperations.getPriceByArt(vendorCode, id));
  },

  onCalculateSum: () => {
    return dispatch(ordersActions.calculateSum({ id }));
  },
  onCalculateTotalQuantity: () => {
    return dispatch(ordersActions.calculateTotalQuantity());
  },
  onCalculateTotalSum: () => {
    return dispatch(ordersActions.calculateTotalSum());
  },
  onCalculateRemainderPaid: () => {
    return dispatch(ordersActions.calculateRemainderPaid());
  },
  onSaveToTemporaryStorageLocation: data => {
    return dispatch(tabsActions.saveToTemporaryStorageLocation(data));
  },
});

export default connect(mSTP, mDTP)(LineOrderProduct);
