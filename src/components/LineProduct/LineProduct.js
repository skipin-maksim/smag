import React from 'react';
import { connect } from 'react-redux';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders/';

import lineColorPick from '../../helpers/lineColorPick';
import { CheckBox } from '../CheckBox/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import colorsList from '../../data/colorsList';
import s from '../../views/NewOrderPage/NewOrderPage.module.scss';

const LineOrderProduct = ({ id, idx, getProductLineById, ...actions }) => {
  const {
    onChangeInput,
    onChangeInputQuantity,
    onCalculateSum,
    onCalculateTotalSum,
    onCalculateTotalQuantity,
    onGetArticlePrice,
  } = actions;

  const handleArticle = (artValue, name) => {
    onChangeInput({ value: artValue, name });

    onGetArticlePrice(artValue);
  };

  const handleQuantity = (artValue, name) => {
    onChangeInputQuantity({ value: artValue, name });

    onCalculateSum();
    onCalculateTotalQuantity();
    onCalculateTotalSum();
  };

  const handleDiscount = (artValue, name) => {
    onChangeInput({ value: artValue, name });

    onCalculateSum();
    onCalculateTotalSum();
  };

  return (
    <li className={`${lineColorPick(idx)} ${s.lineProduct}`}>
      <CheckBox
        name="checkProduct"
        isChecked={getProductLineById.checkProduct}
        onChange={onChangeInput}
      />
      <span className={s.numSpan}>{idx + 1}</span>
      <input
        autoComplete="off"
        autoFocus
        type="text"
        placeholder="артикул"
        onChange={({ target }) => handleArticle(target.value, target.name)}
        value={getProductLineById.vendorCode}
        name="vendorCode"
        className={s.nameSpan}
      />
      <Autocomplete
        disabled={!getProductLineById.vendorCode}
        defaultValue={
          getProductLineById.color ? getProductLineById.color : 'выберите цвет'
        }
        className={s.colorSpan}
        style={{ textAlign: 'center' }}
        options={colorsList.map(option => option.title)}
        renderInput={params => (
          <div ref={params.InputProps.ref}>
            <input
              {...params.inputProps}
              type="text"
              name="color"
              value={params.inputProps.value}
              onBlur={({ target }) =>
                onChangeInput({
                  ...params.inputProps,
                  name: target.name,
                  id: id,
                })
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
        disabled={!getProductLineById.vendorCode}
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
        disabled={!getProductLineById.vendorCode}
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
});

export default connect(mSTP, mDTP)(LineOrderProduct);
