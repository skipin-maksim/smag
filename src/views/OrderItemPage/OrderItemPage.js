import React from 'react';
import { connect } from 'react-redux';
import { ordersActions, ordersSelectors } from '../../redux/orders';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LineOrderProduct from '../../components/LineOrderProduct/LineOrderProduct';
import CheckBox from '../../components/CheckBox/CheckBox';

import s from './OrderItemPage.module.scss';

class OrderItemPage extends React.Component {
  state = { isCheckAll: false };

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

  render() {
    const {
      allProducts,
      onCreateLineProduct,
      deleteLineSelectedProduct,
      onChangeInput,
    } = this.props;

    return (
      <div className={s.orderPage}>
        <div className={s.ordersSettings}>
          <div className={s.contractorInfo}>
            <div className={s.contractorsBlock}>
              <input type="text" className={s.ordersSearch} />
              <Tooltip title={'Выбрать контрагента'} arrow>
                <button
                  type="button"
                  className={`${s.settingButton} ${s.dotsBtn}`}
                >
                  <MoreHorizIcon style={{ color: '#fff' }} />
                </button>
              </Tooltip>
            </div>
            <div className={s.contractorInfoInner}>
              <span>Город</span>
              <span>Новая почта №1</span>
              <span>0509596984</span>
            </div>
          </div>

          <div className={s.settingButtons}>
            <Tooltip title={'Добавить товар'} arrow>
              <button
                onClick={() => onCreateLineProduct()}
                className={`${s.settingButton} ${s.addBtn}`}
              >
                <AddIcon style={{ color: '#98C379', fontSize: 21 }} />
                <div className="visually-hidden">Добавить заказ</div>
              </button>
            </Tooltip>

            <Tooltip title={'Удалить товар'} arrow>
              <button
                type="button"
                onClick={() => deleteLineSelectedProduct()}
                className={`${s.settingButton} ${s.removeBtn}`}
              >
                <DeleteForeverIcon style={{ color: '#DE6A73', fontSize: 21 }} />
                <div className="visually-hidden">Удалить заказ</div>
              </button>
            </Tooltip>
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
        </div>

        <div className={s.orderWrapper}></div>
      </div>
    );
  }
}

const mSTP = state => ({
  allProducts: ordersSelectors.getAllProducts(state),
});
const mDTP = {
  onCreateLineProduct: ordersActions.createLineProduct,
  deleteLineSelectedProduct: ordersActions.deleteLineSelectedProduct,
  onChangeInput: ordersActions.changeLineProductInput,
};

export default connect(mSTP, mDTP)(OrderItemPage);
