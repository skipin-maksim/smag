import React from 'react';
import { connect } from 'react-redux';
import { ordersActions, ordersSelectors } from '../../redux/orders';
import s from '../../views/OrderItemPage/OrderItemPage.module.scss';

import Autocomplete from '@material-ui/lab/Autocomplete';
import colorsList from '../../data/colorsList';

const LineOrderProduct = ({ onChangeInput, ...props }) => {
  const { id, art, quantity, price, discount, sum, note, colorDefault } = props;

  return (
    <li className={s.lineProduct}>
      <span className={s.numSpan}>1</span>
      <input type="checkbox" className={s.checkboxItem} />
      <input
        type="text"
        placeholder="артикул"
        onBlur={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        value={art}
        name="art"
        className={s.nameSpan}
      />
      <Autocomplete
        defaultValue={colorDefault}
        className={s.colorSpan}
        style={{ textAlign: 'center' }}
        options={colorsList.map(option => option.title)}
        renderInput={params => (
          <div ref={params.InputProps.ref}>
            <input
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
              {...params.inputProps}
            />
          </div>
        )}
      />
      <input
        type="number"
        placeholder="количество"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        name="quantity"
        value={quantity}
        className={s.quantitySpan}
      />
      <input
        type="number"
        placeholder="цена"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        name="price"
        value={price}
        className={s.priceSpan}
        disabled
      />
      <input
        type="number"
        placeholder="скидка"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        name="discount"
        value={discount}
        className={s.discountSpan}
      />
      <input
        type="number"
        placeholder="number"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        name="sum"
        value={sum}
        className={s.sumSpan}
        disabled
      />
      <input
        type="text"
        placeholder="заметка"
        onChange={({ target }) =>
          onChangeInput({ value: target.value, name: target.name })
        }
        name="note"
        value={note}
        className={s.noteSpan}
      />
    </li>
  );
};

const mSTP = (state, { id }) => ({
  getProductLineById: ordersSelectors.getProductLineById(state, id),
});
const mDTP = (dispatch, { id }) => ({
  onChangeInput: values =>
    dispatch(ordersActions.changeLineProductInput({ id, ...values })),
});

export default connect(mSTP, mDTP)(LineOrderProduct);
