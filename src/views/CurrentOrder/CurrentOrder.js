import React, { useCallback, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { tabsActions } from '../../redux/tabs';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders';
import { clientsOperations } from '../../redux/clients';

import WindowTable from '../../components/WindowTable/WindowTable';
import LineProduct from '../../components/LineProduct/LineProduct';
import CalculatedBlock from '../../components/BlocksForCurrentOrder/CalculatedBlock/CalculatedBlock';
import Spinner from '../../components/Spinner/Spinner';
import SettingsBlockBtn from '../../components/BlocksForCurrentOrder/SettingsBlockBtn/SettingsBlockBtn';
import Modal from '../../components/Modal/Modal';
import ClientsInModal from '../../components/Modal/ClientsInModal/ClientsInModal';
import ClientsInfoBlock from '../../components/BlocksForCurrentOrder/ClientsInfoBlock/ClientsInfoBlock';
import TitleTableCurrentOrder from '../../components/WindowTable/TitleTableCurrentOrder/TitleTableCurrentOrder';
import MoneyBlock from '../../components/BlocksForCurrentOrder/MoneyBlock/MoneyBlock';

import s from './CurrentOrder.module.scss';

export default function CurrentOrder({ match }) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector(ordersSelectors.getIsLoader);
  const currentOrderItems = useSelector(ordersSelectors.getCurrentOrderItems);
  const currentOrder = useSelector(ordersSelectors.getCurrentOrder);
  const calculatedTotals = useSelector(ordersSelectors.getCalculatedTotals);
  const isSomeUncheked = useSelector(ordersSelectors.getIsSomeUnchecked);
  const currentClientInfo = useSelector(ordersSelectors.getCurrentClientInfo);
  const dataOfTemporaryStorageLocation = useSelector(
    ordersSelectors.getDataOfTemporaryStorageLocation,
  );

  const onChoiseClient = useCallback(
    () => dispatch(ordersActions.choiseClient()),
    [dispatch],
  );
  const allClients = useCallback(
    () => dispatch(clientsOperations.getClients()),
    [dispatch],
  );
  const onCreateLineProduct = useCallback(
    () => dispatch(ordersActions.createLineProduct()),
    [dispatch],
  );
  const onCreateLineProductCopy = useCallback(
    prevLine => dispatch(ordersActions.createLineProductCopy(prevLine)),
    [dispatch],
  );
  const onChangeMainCheckbox = useCallback(
    data => dispatch(ordersActions.changeMainCheckbox(data)),
    [dispatch],
  );
  const onChangeInputNoteForOrder = useCallback(
    value => dispatch(ordersActions.changeInputNoteForOrder(value)),
    [dispatch],
  );
  const onCalculateAveragePrice = useCallback(
    () => dispatch(onCalculateAveragePrice()),
    [dispatch],
  );
  const onCalculateTotalPositions = useCallback(
    () => dispatch(ordersActions.calculateTotalPositions()),
    [dispatch],
  );
  const onCalculateRemainderPaid = useCallback(
    () => dispatch(ordersActions.calculateRemainderPaid()),
    [dispatch],
  );
  const onChangePrepaymentInput = useCallback(
    prepaymentValue =>
      dispatch(ordersActions.changePrepaymentInput(prepaymentValue)),
    [dispatch],
  );
  const onGetOrderById = useCallback(
    id => dispatch(ordersOperations.getOrderById(id)),
    [dispatch],
  );
  const onSaveToTemporaryStorageLocation = useCallback(
    currentOrder =>
      dispatch(tabsActions.saveToTemporaryStorageLocation(currentOrder)),
    [dispatch],
  );
  const onGetDataOfTemporaryStorageLocation = useCallback(
    dataInStorage =>
      dispatch(tabsActions.getDataOfTemporaryStorageLocation(dataInStorage)),
    [dispatch],
  );

  const handlePressKeyNewLine = useCallback(
    e => {
      if (e.code === 'Enter' && e.ctrlKey && !e.shiftKey) {
        onCreateLineProduct();
        onCalculateTotalPositions();
      }

      if (e.code === 'Enter' && e.ctrlKey && e.shiftKey) {
        const prevItem = currentOrderItems.find(
          (_item, idx) => idx === currentOrderItems.length - 1,
        );

        onCreateLineProductCopy(prevItem);
        onCalculateTotalPositions();
      }
    },
    [
      currentOrderItems,
      onCalculateTotalPositions,
      onCreateLineProduct,
      onCreateLineProductCopy,
    ],
  );

  const handleCheckAll = name => {
    setIsCheckAll(!isCheckAll);

    onChangeMainCheckbox({
      ...name,
      value: !isCheckAll,
      // было isCheckAll поставил !isCheckAll ((((()))))
    });
  };

  const handleNoteForOrder = () => {
    if (!currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    if (!currentOrder.isSaved)
      window.addEventListener('keydown', handlePressKeyNewLine);

    // onCalculateTotalPositions();

    return () => {
      window.removeEventListener('keydown', handlePressKeyNewLine);
    };
  }, [currentOrder.isSaved, handlePressKeyNewLine]);

  useEffect(() => {
    if (match.params.orderId === 'new-order') {
      console.log(
        'log из эффекта --> забрать данные из dataOfTemporaryStorageLocation',
      );
      onGetDataOfTemporaryStorageLocation(dataOfTemporaryStorageLocation);
    }

    if (Number(match.params.orderId)) {
      onGetOrderById(match.params.orderId);
    }
    //была зависимость от match, но она давала ошибку, когда сохраняешь заказ, при переходе от "new-order" к "Зааз №000015"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isSomeUncheked && !isCheckAll) {
      setIsCheckAll(true);
      return;
    }

    if (isSomeUncheked && isCheckAll) {
      setIsCheckAll(false);
      return;
    }
  }, [isCheckAll, isSomeUncheked]);

  return (
    <>
      {isModal && (
        <Modal
          onCloseModal={toggleModal}
          children={<ClientsInModal onCloseModal={toggleModal} />}
        />
      )}

      <div className={s.orderPage}>
        {isLoading && <Spinner />}

        <div className={s.ordersSettings}>
          <ClientsInfoBlock
            currentClientInfo={currentClientInfo}
            currentOrder={currentOrder}
            onChoiseClient={onChoiseClient}
            allClients={allClients}
            onOpenModal={toggleModal}
          />

          <div className={s.settingControls}>
            <SettingsBlockBtn />

            <MoneyBlock
              currentOrder={currentOrder}
              onChangePrepaymentInput={onChangePrepaymentInput}
              calculatedTotals={calculatedTotals}
              onCalculateRemainderPaid={onCalculateRemainderPaid}
              onSaveToTemporaryStorageLocation={
                onSaveToTemporaryStorageLocation
              }
            />
          </div>
        </div>

        <TitleTableCurrentOrder
          currentOrder={currentOrder}
          handleCheckAll={handleCheckAll}
          isCheckAll={isCheckAll}
        />

        <WindowTable otherBlock={<CalculatedBlock totals={calculatedTotals} />}>
          <ul className={s.customerOrderList}>
            {currentOrderItems.map((item, idx) => {
              return <LineProduct key={item.id} id={item.id} idx={idx} />;
            })}
          </ul>
        </WindowTable>

        <label className={s.noteForOrderLabel}>
          <span>Заметка</span>
          <input
            className={s.noteForOrder}
            type="text"
            value={currentOrder.noteForOrder}
            onChange={({ target }) => onChangeInputNoteForOrder(target.value)}
            onBlur={handleNoteForOrder}
            disabled={currentOrder.isSaved}
          />
        </label>
      </div>
    </>
  );
}
