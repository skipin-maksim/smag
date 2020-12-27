import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import notification from 'toastr';

import { ordersActions } from '../../../redux/orders';
import { tabsActions } from '../../../redux/tabs';
import { numOrderOperations } from '../../../redux/numOrder';

import AddBtn from '../../Buttons/AddBtn/AddBtn';
import RemoveBtn from '../../Buttons/RemoveBtn/RemoveBtn';
import EditBtn from '../../Buttons/EditBtn/EditBtn';

import s from './OrdersTableControls.module.scss';

export default function OrdersTableControls() {
  const dispatch = useDispatch();
  const history = useHistory();

  const filterOrderValue = useSelector(state => state.orders.filterOrders);
  const tabsList = useSelector(state => state.tabs.items);
  const widthLineTabs = useSelector(state => state.tabs.positionData.left);

  const onFilterOrders = useCallback(
    () => dispatch(ordersActions.filterOrders()),
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
    console.log(isTab);

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
        value={filterOrderValue}
        onChange={({ target }) => onFilterOrders(target.value)}
      />

      <div className={s.controlsButtons}>
        <AddBtn data={{ isSaved: false }} onCreate={handleAddNewOrder} />

        <EditBtn />

        <RemoveBtn data={{ isSaved: false }} />
      </div>
    </div>
  );
}
