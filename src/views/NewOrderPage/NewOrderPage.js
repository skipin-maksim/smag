import React from 'react';
import { connect } from 'react-redux';
import { ordersActions, ordersSelectors } from '../../redux/orders';
import { Scrollbar } from 'react-scrollbars-custom';

// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CheckBoxMain } from '../../components/CheckBox/';
import LineProduct from '../../components/LineProduct/LineProduct';
import s from './NewOrderPage.module.scss';

class NewOrderPage extends React.Component {
  state = { isCheckAll: false };

  componentDidMount() {
    this.props.onCalculateTotalPositions();
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

  handleSaveBtn = checked => {
    this.props.onSaveOrder(checked);
  };

  handleDelete = () => {
    this.props.onDeleteLineSelectedProduct();

    this.props.onCalculateTotalQuantity();
    this.props.onCalculateTotalSum();
    this.props.onCalculateAveragePrice();
    this.props.onCalculateTotalPositions();
  };

  render() {
    const {
      allProducts,
      allProductsItems,
      onCreateLineProduct,
      onChangeInputNoteForOrder,
      calculatedTotals,
      onCalculateTotalPositions,
    } = this.props;

    return (
      <div className={s.orderPage}>
        <div className={s.ordersSettings}>
          <div className={s.contractorInfo}>
            <div className={s.contractorsBlock}>
              <Tooltip title={'Выбрать контрагента'} arrow>
                <button
                  type="button"
                  className={`${s.settingButton} ${s.dotsBtn}`}
                >
                  Выбрать контрагента
                  {/* <MoreHorizIcon style={{ color: '#fff' }} /> */}
                </button>
              </Tooltip>
              <span className={s.contractorName}>Иван Васильевич</span>
            </div>
            <div className={s.contractorInfoInner}>
              <span>Город</span>
              <span>Новая почта №1</span>
              <span>0509596984</span>
            </div>
            <div className={s.contractorInfoInnerDept}>
              Долг контрагента: <span>500</span>
            </div>
          </div>

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
                <DeleteForeverIcon style={{ color: '#DE6A73', fontSize: 21 }} />
                <div className="visually-hidden">Удалить заказ</div>
              </button>
            </Tooltip>
            <input
              type="checkbox"
              className={s.saveBtn}
              onChange={({ target }) => this.handleSaveBtn(target.checked)}
            />
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
            <Scrollbar style={{ width: 1567, height: 549 }}>
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
    );
  }
}

const mSTP = state => ({
  allProductsItems: ordersSelectors.getAllProductsItems(state),
  allProducts: ordersSelectors.getOrdersAllProducts(state),
  calculatedTotals: ordersSelectors.getCalculatedTotals(state),
  isSomeUncheked: ordersSelectors.getIsSomeUnchecked(state),
});
const mDTP = {
  onCreateLineProduct: ordersActions.createLineProduct,
  onDeleteLineSelectedProduct: ordersActions.deleteLineSelectedProduct,
  onSaveOrder: ordersActions.saveOrder,
  onChangeInput: ordersActions.changeLineProductInput,
  onChangeMainCheckbox: ordersActions.changeMainCheckbox,
  onChangeInputNoteForOrder: ordersActions.changeInputNoteForOrder,

  onCalculateTotalQuantity: ordersActions.calculateTotalQuantity,
  onCalculateTotalSum: ordersActions.calculateTotalSum,
  onCalculateAveragePrice: ordersActions.calculateAveragePrice,
  onCalculateTotalPositions: ordersActions.calculateTotalPositions,
};

export default connect(mSTP, mDTP)(NewOrderPage);
