import React from 'react';
import { connect } from 'react-redux';
import { ordersActions, ordersSelectors } from '../../redux/orders';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LineOrderProduct from '../../components/LineOrderProduct/LineOrderProduct';
import CheckBox from '../../components/CheckBox/CheckBox';

import s from './OrderItemPage.module.scss';

class OrderItemPage extends React.Component {
  state = { isCheckAll: false };

  componentDidMount() {
    this.props.onCalculateTotalPositions();
  }

  handleCheckAll = (target, currentId, choiceOption) => {
    if (choiceOption === 'checkAllProducts') {
      console.log('выбрали всё', target, currentId, choiceOption);

      this.setState(prevState => ({
        isCheckAll: !prevState.isCheckAll,
      }));
    }

    if (choiceOption === 'product' && this.state.isCheckAll) {
      this.setState({ isCheckAll: false });
    }

    this.props.onChangeInput({
      id: currentId,
      value: target.checked,
      name: target.name,
      choiceOption: choiceOption,
    });
  };

  handleSaveBtn = checked => {
    console.log('save', checked);
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
      onCreateLineProduct,
      // onDeleteLineSelectedProduct,
      onChangeInput,
      calculatedTotals,
      onCalculateTotalPositions,
    } = this.props;

    console.log(calculatedTotals.positions);

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
            <div className={s.contractorInfoInner}>
              Долг контрагента <span>500</span>
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
          <CheckBox
            choiceOption="checkAllProducts"
            currentId={0}
            onChangeInput={onChangeInput}
            currentCheckValue={false}
            handleCheckAll={this.handleCheckAll}
            isCheckAll={this.state.isCheckAll}
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
            <ul className={s.customerOrderList}>
              {allProducts.map((item, idx) => {
                return (
                  <LineOrderProduct
                    key={item.id}
                    id={item.id}
                    idx={idx}
                    handleCheckAll={this.handleCheckAll}
                    isCheckAll={this.state.isCheckAll}
                  />
                );
              })}
            </ul>
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
            {/* <div>
              <span>Предоплата</span>
              <span className={s.numbers}>1</span>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mSTP = state => ({
  allProducts: ordersSelectors.getAllProducts(state),
  calculatedTotals: ordersSelectors.getCalculatedTotals(state),
});
const mDTP = {
  onCreateLineProduct: ordersActions.createLineProduct,
  onDeleteLineSelectedProduct: ordersActions.deleteLineSelectedProduct,
  onSaveOrder: ordersActions.saveOrder,
  onChangeInput: ordersActions.changeLineProductInput,

  onCalculateTotalQuantity: ordersActions.calculateTotalQuantity,
  onCalculateTotalSum: ordersActions.calculateTotalSum,
  onCalculateAveragePrice: ordersActions.calculateAveragePrice,
  onCalculateTotalPositions: ordersActions.calculateTotalPositions,
};

export default connect(mSTP, mDTP)(OrderItemPage);
