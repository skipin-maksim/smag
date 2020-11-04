import React from 'react';
import LineOrderProduct from '../../components/LineOrderProduct/LineOrderProduct';
import s from './OrdersPage.module.scss';

export default class OrdersPage extends React.Component {
  state = { products: [{ in1: '', in2: '', in3: '', in5: '' }] };

  handleAddLineProduct = () => {
    console.log('hi');
  };

  render() {
    return (
      <div className={s.orderPage}>
        <div className={s.ordersSettings}>
          <input type="text" className={s.ordersSearch} />
          <div className={s.settingButtons}>
            <button
              type="button"
              onClick={this.handleAddLineProduct}
              className={`${s.settingButton} ${s.addBtn}`}
            >
              Добавить
            </button>

            <button
              type="button"
              className={`${s.settingButton} ${s.changeBtn}`}
            >
              Изменить
            </button>

            <button
              type="button"
              className={`${s.settingButton} ${s.removeBtn}`}
            >
              Удалить
            </button>
          </div>
        </div>

        <div className={s.orderWrapper}>
          <LineOrderProduct />
        </div>
      </div>
    );
  }
}
