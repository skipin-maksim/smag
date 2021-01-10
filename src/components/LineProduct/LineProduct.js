import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders';
import { tabsActions } from '../../redux/tabs';
import colorsList from '../../data/colorsList';

import Line from '../Line/Line';
import { CheckBox } from '../CheckBox';

import s from './LineProduct.module.scss';
import sw from '../WindowTable/TitleTableCurrentOrder/TitleTableCurrentOrder.module.scss';

export default function LineOrderProduct({ id, idx }) {
  const dispatch = useDispatch();

  const getProductLineById = useSelector(state => {
    return ordersSelectors.getProductLineById(state, id);
  });
  const currentOrder = useSelector(ordersSelectors.getCurrentOrder);

  const onChangeInputQuantity = useCallback(
    values => {
      dispatch(ordersActions.changeLineProductInputQuantity({ id, ...values }));
    },
    [dispatch, id],
  );

  const onChangeInput = useCallback(
    values => {
      dispatch(ordersActions.changeLineProductInput({ id, ...values }));
    },
    [dispatch, id],
  );

  const onGetVendorCodePrice = useCallback(
    vendorCode => {
      dispatch(ordersOperations.getPriceByVendorCode(vendorCode, id));
    },
    [dispatch, id],
  );

  const onCalculateSum = useCallback(() => {
    dispatch(ordersActions.calculateSum({ id }));
  }, [dispatch, id]);

  const onSaveToTemporaryStorageLocation = useCallback(
    data => {
      dispatch(tabsActions.saveToTemporaryStorageLocation(data));
    },
    [dispatch],
  );

  const onCalculateTotalSum = useCallback(() => {
    dispatch(ordersActions.calculateTotalSum());
  }, [dispatch]);

  const onCalculateTotalQuantity = useCallback(() => {
    dispatch(ordersActions.calculateTotalQuantity());
  }, [dispatch]);

  const onCalculateRemainderPaid = useCallback(() => {
    dispatch(ordersActions.calculateRemainderPaid());
  }, [dispatch]);

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
    <Line gridClass={sw.grid} idx={idx}>
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
    </Line>
  );
}
