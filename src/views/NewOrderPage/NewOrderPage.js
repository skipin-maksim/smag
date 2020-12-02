import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { tabsActions } from '../../redux/tabs/';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders/';
import { numOrderOperations, numOrderSelectors } from '../../redux/numOrder/';
import { modalActions, modalSelectors } from '../../redux/modal/';
import { contactsOperations } from '../../redux/contacts';

import Modal from '../../components/Modal/Modal';
import { CheckBoxMain } from '../../components/CheckBox/';
import LineProduct from '../../components/LineProduct/LineProduct';
import ContractorsInModal from '../../components/ContractorsInModal/ContractorsInModal';

import s from './NewOrderPage.module.scss';

const createNewOrderNum = prevNum => {
  const editCustomNumber = value => ('00000' + (value + 1)).substr(-5);

  return {
    valueNum: prevNum.valueNum + 1,
    valueStr: editCustomNumber(prevNum.valueNum),
  };
};

class NewOrderPage extends React.Component {
  state = { isCheckAll: false };

  componentDidMount() {
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

  handleChoiseContractors = () => {
    this.props.onChoiseContractor();
    this.props.allContacts();
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

  handleSaveBtn = async () => {
    if (this.props.currentContractorInfo.firstName) {
      await this.props.getCurrentNumOrder(); // забираем последний номер заказа с сервера

      const currentNumOrderObj = createNewOrderNum(this.props.currentNumOrder); // прибавляем 1 к полученному номеру заказа

      // запускаем сохранение, где мы соберем все в один объект и запишем новый номер заказа на сервер
      this.props.onSaveOrder(
        this.props.allProducts,
        this.props.currentContractorInfo,
        currentNumOrderObj,
      );

      this.props.history.replace(`/orders/${currentNumOrderObj.valueStr}`);
    } else {
      alert('Вы не выбрали контрагента');
    }
  };

  handleDelete = () => {
    this.props.onDeleteLineSelectedProduct();

    this.props.onCalculateTotalQuantity();
    this.props.onCalculateTotalSum();
    this.props.onCalculateAveragePrice();
    this.props.onCalculateTotalPositions();
    this.props.onCalculateRemainderPaid();
  };

  render() {
    const {
      allProducts,
      allProductsItems,
      currentContractorInfo,
      onCreateLineProduct,
      onChangeInputNoteForOrder,
      onChangePrepaymentInput,
      calculatedTotals,
      onCalculateTotalPositions,
      onCalculateRemainderPaid,
      onSaveToTemporaryStorageLocation,
    } = this.props;

    const {
      secondName,
      firstName,
      thirdName,
      city,
      post,
      tel,
      debt,
    } = currentContractorInfo;

    return (
      <>
        {this.props.isModal && <Modal children={<ContractorsInModal />} />}

        <div className={s.orderPage}>
          <div className={s.ordersSettings}>
            <div className={s.contractorInfo}>
              <div className={s.contractorsBlock}>
                <Tooltip title={'Выбрать контрагента'} arrow>
                  <button
                    type="button"
                    className={`${s.settingButton} ${s.dotsBtn}`}
                    onClick={this.handleChoiseContractors}
                  >
                    Выбрать контрагента
                  </button>
                </Tooltip>
                <span className={s.contractorName}>
                  {secondName} {firstName} {thirdName}
                </span>
              </div>
              <div className={s.contractorInfoInner}>
                <span>{city}</span>
                <span>{post}</span>
                <span>{tel}</span>
              </div>
              <div className={s.contractorInfoInnerDept}>
                Долг контрагента: <span>{debt}</span>
              </div>
            </div>

            <div className={s.settingControls}>
              <div className={s.settingButtons}>
                <Tooltip title={'Добавить товар'} arrow>
                  <button
                    onClick={() => {
                      onCreateLineProduct();
                      onCalculateTotalPositions();
                    }}
                    className={`${s.settingButton} ${s.addBtn}`}
                  >
                    <AddIcon style={{ color: '#98C379', fontSize: 21 }} />
                    <div className="visually-hidden">Добавить заказ</div>
                  </button>
                </Tooltip>

                <Tooltip title={'Удалить товар'} arrow>
                  <button
                    type="button"
                    onClick={this.handleDelete}
                    className={`${s.settingButton} ${s.removeBtn}`}
                  >
                    <DeleteForeverIcon
                      style={{ color: '#DE6A73', fontSize: 21 }}
                    />
                    <div className="visually-hidden">Удалить заказ</div>
                  </button>
                </Tooltip>

                <label
                  className={
                    !allProducts.isSaved
                      ? s.labelSaveBtnNotSaved
                      : s.labelSaveBtnIstSaved
                  }
                >
                  {!allProducts.isSaved ? 'Не сохранен' : 'Сохранен'}

                  <input
                    type="checkbox"
                    checked={allProducts.isSaved}
                    className={s.saveBtn}
                    onChange={this.handleSaveBtn}
                  />
                </label>
              </div>
              <div className={s.moneyBlock}>
                <label className={s.prepaymentLabel}>
                  Предоплата:
                  <input
                    name="prepayment"
                    type="number"
                    className={s.prepaymentInput}
                    value={allProducts.prepayment}
                    onChange={({ target }) =>
                      onChangePrepaymentInput(target.value)
                    }
                    onBlur={({ target }) => {
                      onSaveToTemporaryStorageLocation(allProducts);
                      onCalculateRemainderPaid(target.value);
                    }}
                  />
                </label>
                <div className={s.remainderPaid}>
                  Остаток к оплате:{' '}
                  <span>
                    {calculatedTotals.remainderPaid < 0
                      ? 0
                      : calculatedTotals.remainderPaid.toLocaleString('ru')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={s.tableTitletLine}>
            <CheckBoxMain
              name="checkProduct"
              isChecked={this.state.isCheckAll}
              onChange={this.handleCheckAll}
            />
            <span>№</span>
            <span>Артикул</span>
            <span>Цвет</span>
            <span>Кол-во</span>
            <span>Цена</span>
            <span>Скидка </span>
            <span>Сумма</span>
            <span>Примечание</span>
          </div>
          <div className={s.windowOrders}>
            <form>
              <Scrollbar
                style={{
                  width: 1567,
                  height: 549,
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.233)',
                }}
              >
                <ul className={s.customerOrderList}>
                  {allProductsItems.map((item, idx) => {
                    return <LineProduct key={item.id} id={item.id} idx={idx} />;
                  })}
                </ul>
              </Scrollbar>
            </form>

            <div className={s.orderInfo}>
              <div>
                <span>Поз</span>
                <span className={s.numbers}>
                  {calculatedTotals.positions ? calculatedTotals.positions : 0}
                </span>
              </div>
              <div>
                <span></span>
              </div>
              <div>
                <span></span>
              </div>
              <div>
                <span></span>
              </div>
              <div>
                <span>Общее кол-во</span>
                <span className={s.numbers}>
                  {calculatedTotals.quantity ? calculatedTotals.quantity : 0}
                </span>
              </div>
              <div>
                <span>Средняя цена</span>
                <span className={s.numbers}>
                  {calculatedTotals.averagePrice
                    ? calculatedTotals.averagePrice
                    : 0}
                </span>
              </div>
              <div>
                <span></span>
              </div>
              <div>
                <span>Общая сумма</span>
                <span className={s.numbers}>
                  {' '}
                  {calculatedTotals.sum ? calculatedTotals.sum : 0}
                </span>
              </div>
              <div>
                <span></span>
              </div>
            </div>
          </div>
          <label className={s.noteForOrderLabel}>
            <span>Заметка</span>
            <input
              className={s.noteForOrder}
              type="text"
              value={allProducts.noteForOrder.value}
              onChange={({ target }) => onChangeInputNoteForOrder(target.value)}
            />
          </label>
        </div>
      </>
    );
  }
}

const mSTP = state => ({
  isModal: modalSelectors.getCurrentModalState(state),
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
