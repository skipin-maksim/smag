import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { tabsActions } from '../../redux/tabs';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders';
import { numOrderOperations, numOrderSelectors } from '../../redux/numOrder';
import { contactsOperations } from '../../redux/contacts';

import WindowTable from '../../components/WindowTable/WindowTable';
import LineProduct from '../../components/LineProduct/LineProduct';
import CalculatedBlock from '../../components/BlocksForCurrentOrder/CalculatedBlock/CalculatedBlock';
import Spinner from '../../components/Spinner/Spinner';
import SettingsBlockBtn from '../../components/BlocksForCurrentOrder/SettingsBlockBtn/SettingsBlockBtn';
import Modal from '../../components/Modal/Modal';
import ClientsInModal from '../../components/Modal/ClientsInModal/ClientsInModal';
import ClientsInfoBlock from '../../components/BlocksForCurrentOrder/ClientsInfoBlock/ClientsInfoBlock';
import TableTitletLineBlock from '../../components/BlocksForCurrentOrder/TableTitletLineBlock/TableTitletLineBlock';
import MoneyBlock from '../../components/BlocksForCurrentOrder/MoneyBlock/MoneyBlock';

import s from './CurrentOrder.module.scss';

// const match = useRouteMatch('/orders/:orderId');
class CurrentOrder extends React.Component {
  state = { isCheckAll: false, isModal: false };

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressKeyNewLine);

    this.props.onCalculateTotalPositions();

    if (this.props.match.params.orderId === 'new-order') {
      this.props.onGetDataOfTemporaryStorageLocation(
        this.props.dataOfTemporaryStorageLocation,
      );
    } else if (Number(this.props.match.params.orderId)) {
      this.props.onGetOrderById(this.props.match.params.orderId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isSomeUncheked && !prevState.isCheckAll) {
      this.setState({
        isCheckAll: true,
      });

      return;
    }

    if (this.props.isSomeUncheked && prevState.isCheckAll) {
      this.setState({
        isCheckAll: false,
      });

      return;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressKeyNewLine);
  }

  handlePressKeyNewLine = e => {
    if (e.code === 'Enter' && e.ctrlKey && !e.shiftKey) {
      this.props.onCreateLineProduct();
      this.props.onCalculateTotalPositions();
    }

    if (e.code === 'Enter' && e.ctrlKey && e.shiftKey) {
      const prevItem = this.props.currentOrderItems.find(
        (item, idx) => idx === this.props.currentOrderItems.length - 1,
      );

      this.props.onCreateLineProductCopy(prevItem);
      this.props.onCalculateTotalPositions();
    }
  };

  handleCheckAll = name => {
    this.setState(
      prevState => ({
        isCheckAll: !prevState.isCheckAll,
      }),
      () =>
        this.props.onChangeMainCheckbox({
          ...name,
          value: this.state.isCheckAll,
        }),
    );
  };

  handleNoteForOrder = () => {
    if (!this.props.currentOrder.isSaved)
      this.props.onSaveToTemporaryStorageLocation(this.props.currentOrder);
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModal: !prevState.isModal,
    }));
  };

  render() {
    const {
      isLoading,
      currentOrder,
      allContacts,
      currentOrderItems,
      currentClientInfo,
      onChangeInputNoteForOrder,
      onChangePrepaymentInput,
      calculatedTotals,
      onCalculateRemainderPaid,
      onSaveToTemporaryStorageLocation,
      onChoiseClient,
    } = this.props;

    return (
      <>
        {this.state.isModal && (
          <Modal
            onCloseModal={this.toggleModal}
            children={<ClientsInModal onCloseModal={this.toggleModal} />}
          />
        )}

        <div className={s.orderPage}>
          {isLoading && <Spinner />}

          <div className={s.ordersSettings}>
            <ClientsInfoBlock
              currentClientInfo={currentClientInfo}
              currentOrder={currentOrder}
              onChoiseClient={onChoiseClient}
              allContacts={allContacts}
              onOpenModal={this.toggleModal}
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

          <TableTitletLineBlock
            currentOrder={currentOrder}
            handleCheckAll={this.handleCheckAll}
            isCheckAll={this.state.isCheckAll}
          />

          <WindowTable
            otherBlock={<CalculatedBlock totals={calculatedTotals} />}
          >
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
              onBlur={this.handleNoteForOrder}
              disabled={currentOrder.isSaved}
            />
          </label>
        </div>
      </>
    );
  }
}

const mSTP = state => ({
  isLoading: ordersSelectors.getIsLoader(state),
  currentNumOrder: numOrderSelectors.getCurrentNum(state),

  currentOrderItems: ordersSelectors.getCurrentOrderItems(state),
  currentOrder: ordersSelectors.getCurrentOrder(state),
  allOrders: ordersSelectors.getOrdersList(state),
  calculatedTotals: ordersSelectors.getCalculatedTotals(state),
  isSomeUncheked: ordersSelectors.getIsSomeUnchecked(state),
  currentClientInfo: ordersSelectors.getCurrentClientInfo(state),
  dataOfTemporaryStorageLocation: ordersSelectors.getDataOfTemporaryStorageLocation(
    state,
  ),
});
const mDTP = {
  allContacts: contactsOperations.getContacts,
  getCurrentNumOrder: numOrderOperations.getCurrentNumOrder,

  onCreateLineProduct: ordersActions.createLineProduct,
  onCreateLineProductCopy: ordersActions.createLineProductCopy,
  onDeleteLineSelectedProduct: ordersActions.deleteLineSelectedProduct,
  onChangeInput: ordersActions.changeLineProductInput,
  onChangeMainCheckbox: ordersActions.changeMainCheckbox,
  onChangeInputNoteForOrder: ordersActions.changeInputNoteForOrder,

  onCalculateTotalQuantity: ordersActions.calculateTotalQuantity,
  onCalculateTotalSum: ordersActions.calculateTotalSum,
  onCalculateAveragePrice: ordersActions.calculateAveragePrice,
  onCalculateTotalPositions: ordersActions.calculateTotalPositions,
  onCalculateRemainderPaid: ordersActions.calculateRemainderPaid,
  onSaveOrder: ordersOperations.createOrder,

  onChangePrepaymentInput: ordersActions.changePrepaymentInput,

  onGetOrderById: ordersOperations.getOrderById,

  onSaveToTemporaryStorageLocation: tabsActions.saveToTemporaryStorageLocation,
  onGetDataOfTemporaryStorageLocation:
    tabsActions.getDataOfTemporaryStorageLocation,
};

export default withRouter(connect(mSTP, mDTP)(CurrentOrder));
