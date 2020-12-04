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
import s from '../../views/NewOrderPage/NewOrderPage.module.scss';

const LineOrderProduct = ({
  id,
  idx,
  getProductLineById,
  allProducts,
  ...actions
}) => {
  const {
    onChangeInput,
    onChangeInputQuantity,
    onCalculateSum,
    onCalculateTotalSum,
    onCalculateTotalQuantity,
    onCalculateRemainderPaid,
    onGetArticlePrice,
    onSaveToTemporaryStorageLocation,
  } = actions;

  const handleQuantity = (artValue, name) => {
    onChangeInputQuantity({ value: artValue, name });

    onCalculateSum();
    onCalculateTotalQuantity();
    onCalculateTotalSum();
    onCalculateRemainderPaid();

    if (!allProducts.isSaved) onSaveToTemporaryStorageLocation(allProducts);
  };

  const handleDiscount = (artValue, name) => {
    onChangeInput({ value: artValue, name });

    onCalculateSum();
    onCalculateTotalSum();
    onCalculateRemainderPaid();

    if (!allProducts.isSaved) onSaveToTemporaryStorageLocation(allProducts);
  };

  const handleVendorCode = async target => {
    await onGetArticlePrice(target.value);

    onCalculateSum();
    onCalculateTotalSum();
    onCalculateRemainderPaid();

    if (!allProducts.isSaved) onSaveToTemporaryStorageLocation(allProducts);
  };

  const handleOnBlurColor = (value, name, id) => {
    onChangeInput({
      value,
      name,
      id,
    });

    if (!allProducts.isSaved) onSaveToTemporaryStorageLocation(allProducts);
  };

  const handleOnBlurNote = () => {
    if (!allProducts.isSaved) onSaveToTemporaryStorageLocation(allProducts);
  };

  return (
    <li className={`${lineColorPick(idx)} ${s.lineProduct}`}>
      <CheckBox
        name="checkProduct"
        isChecked={getProductLineById.checkProduct}
        onChange={onChangeInput}
        isDisabled={allProducts.isSaved}
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
        disabled={allProducts.isSaved}
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
              disabled={allProducts.isSaved || !getProductLineById.vendorCode}
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
        disabled={allProducts.isSaved || !getProductLineById.vendorCode}
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
        disabled={allProducts.isSaved || !getProductLineById.vendorCode}
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
        disabled={!getProductLineById.vendorCode}
      />
    </li>
  );
};

const mSTP = (state, { id }) => ({
  getProductLineById: ordersSelectors.getProductLineById(state, id),
  allProducts: ordersSelectors.getOrdersAllProducts(state),
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
  onGetArticlePrice: vendorCode => {
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
