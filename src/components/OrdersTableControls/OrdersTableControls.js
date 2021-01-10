import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import notification from 'toastr';

import { ordersActions, ordersSelectors } from '../../redux/orders';
import { tabsActions, tabsSelectors } from '../../redux/tabs';
import { numOrderOperations } from '../../redux/numOrder';

import AddBtn from '../buttons/AddBtn/AddBtn';
import RemoveBtn from '../buttons/RemoveBtn/RemoveBtn';

import s from './OrdersTableControls.module.scss';

export default function OrdersTableControls({ handleOpenModal, disabled }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const filterOrdersValue = useSelector(ordersSelectors.getFilterOrdersValue);
  const tabsList = useSelector(tabsSelectors.getTabsList);
  const widthLineTabs = useSelector(tabsSelectors.getLeftPositionLineTabs);

  const onFilterOrders = useCallback(
    value => dispatch(ordersActions.filterOrders(value)),
    [dispatch],
  );
  const onAddTab = useCallback(
    tabData => dispatch(tabsActions.addTab(tabData)),
    [dispatch],
  );
  const onMoveSlideLeft = useCallback(
    () => dispatch(tabsActions.moveSlideLeft()),
    [dispatch],
  );
  const onGetCurrentNumOrder = useCallback(
    () => dispatch(numOrderOperations.getCurrentNumOrder()),
    [dispatch],
  );
  const onClearTemporaryStorageLocation = useCallback(
    () => dispatch(ordersActions.clearTemporaryStorageLocation()),
    [dispatch],
  );

  const handleAddNewOrder = () => {
    const isTab = tabsList.find(item => item.name === 'Заказ № ***?');

    if (isTab) {
      notification.warning(
        'Перед созданием нового заказа, сохраните предыдущий заказ',
        'Предупреждение',
      );
      return;
    } else {
      onAddTab({
        name: 'Заказ № ***?',
        path: `/orders/new-order`,
        label: 'new-order',
      });

      if (widthLineTabs > 1300) {
        const futurePositionLeft = widthLineTabs - 1212;
        onMoveSlideLeft(-futurePositionLeft);
      }

      onClearTemporaryStorageLocation();

      onGetCurrentNumOrder();

      history.replace('/orders/new-order');
    }
  };

  return (
    <div className={s.ordersControls}>
      <input
        type="text"
        value={filterOrdersValue}
        onChange={({ target }) => onFilterOrders(target.value)}
      />

      <div className={s.controlsButtons}>
        <AddBtn data={{ isSaved: false }} onCreate={handleAddNewOrder} />

        <RemoveBtn onRemove={handleOpenModal} disabled={disabled} />
      </div>
    </div>
  );
}
