import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import { tabsActions } from '../../redux/tabs/';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders/';
import { numOrderOperations, numOrderSelectors } from '../../redux/numOrder/';
import { modalActions, modalSelectors } from '../../redux/modal/';
import { contactsOperations } from '../../redux/contacts';

import Spinner from '../../components/Spinner/Spinner';
import SettingsBlockBtn from '../../components/SettingsBlockBtn/SettingsBlockBtn';
import Modal from '../../components/Modal/Modal';
import ContractorsInModal from '../../components/Modal/ContractorsInModal/ContractorsInModal';
import ContractorsInfoBlock from '../../components/BlocksForNewOrderPage/ContractorsInfoBlock/ContractorsInfoBlock';
import TableTitletLineBlock from '../../components/TableTitletLineBlock/TableTitletLineBlock';
import MoneyBlock from '../../components/BlocksForNewOrderPage/MoneyBlock/MoneyBlock';
import WindowOrdersBlock from '../../components/WindowOrdersBlock/WindowOrdersBlock';

import s from './NewOrderPage.module.scss';

class NewOrderPage extends React.Component {
  state = { isCheckAll: false };

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressKeyNewLine);

    this.props.onCalculateTotalPositions();

    if (this.props.history.location.pathname.slice(8) === 'new-order') {
      this.props.onGetDataOfTemporaryStorageLocation(
        this.props.dataOfTemporaryStorageLocation,
      );
    } else if (Number(this.props.history.location.pathname.slice(8))) {
      this.props.onGetOrderById(this.props.history.location.pathname.slice(8));
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
    console.log('componentWillUnmount');
    window.removeEventListener('keydown', this.handlePressKeyNewLine);
  }

  handlePressKeyNewLine = e => {
    if (e.code === 'Enter' && e.ctrlKey && !e.shiftKey) {
      this.props.onCreateLineProduct();
      this.props.onCalculateTotalPositions();
    }

    if (e.code === 'Enter' && e.ctrlKey && e.shiftKey) {
      const lastItem = this.props.allProductsItems.find(
        (item, idx) => idx === this.props.allProductsItems.length - 1,
      );

      this.props.onCreateLineProductCopy(lastItem);
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
    if (!this.props.allProducts.isSaved)
      this.props.onSaveToTemporaryStorageLocation(this.props.allProducts);
  };

  render() {
    const {
      isLoading,
      allProducts,
      allContacts,
      allProductsItems,
      currentContractorInfo,
      onChangeInputNoteForOrder,
      onChangePrepaymentInput,
      calculatedTotals,
      onCalculateRemainderPaid,
      onSaveToTemporaryStorageLocation,
      onChoiseContractor,
    } = this.props;

    return (
      <>
        {this.props.isModal && <Modal children={<ContractorsInModal />} />}

        <div className={s.orderPage}>
          {isLoading && <Spinner />}

          <div className={s.ordersSettings}>
            <ContractorsInfoBlock
              currentContractorInfo={currentContractorInfo}
              allProducts={allProducts}
              onChoiseContractor={onChoiseContractor}
              allContacts={allContacts}
            />

            <div className={s.settingControls}>
              <SettingsBlockBtn />

              <MoneyBlock
                allProducts={allProducts}
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
            allProducts={allProducts}
            handleCheckAll={this.handleCheckAll}
            isCheckAll={this.state.isCheckAll}
          />

          <WindowOrdersBlock
            allProductsItems={allProductsItems}
            calculatedTotals={calculatedTotals}
          />

          <label className={s.noteForOrderLabel}>
            <span>Заметка</span>
            <input
              className={s.noteForOrder}
              type="text"
              value={allProducts.noteForOrder}
              onChange={({ target }) => onChangeInputNoteForOrder(target.value)}
              onBlur={this.handleNoteForOrder}
              disabled={allProducts.isSaved}
            />
          </label>
        </div>
      </>
    );
  }
}

const mSTP = state => ({
  isModal: modalSelectors.getCurrentModalState(state),
  isLoading: ordersSelectors.getIsLoader(state),
  currentNumOrder: numOrderSelectors.getCurrentNum(state),

  allProductsItems: ordersSelectors.getAllProductsItems(state),
  allProducts: ordersSelectors.getOrdersAllProducts(state),
  allOrders: ordersSelectors.getOrdersList(state),
  calculatedTotals: ordersSelectors.getCalculatedTotals(state),
  isSomeUncheked: ordersSelectors.getIsSomeUnchecked(state),
  currentContractorInfo: ordersSelectors.getCurrentContractorInfo(state),
  dataOfTemporaryStorageLocation: ordersSelectors.getDataOfTemporaryStorageLocation(
    state,
  ),
});
const mDTP = {
  onChoiseContractor: modalActions.openModal,
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
  onSaveOrder: ordersOperations.postOrder,

  onChangePrepaymentInput: ordersActions.changePrepaymentInput,

  onGetOrderById: ordersOperations.getOrderById,

  onSaveToTemporaryStorageLocation: tabsActions.saveToTemporaryStorageLocation,
  onGetDataOfTemporaryStorageLocation:
    tabsActions.getDataOfTemporaryStorageLocation,
};

export default withRouter(connect(mSTP, mDTP)(NewOrderPage));
