import React, { Component } from 'react';
// import s from './LineOrderProduct.module.scss';
import s from '../../views/OrderItemPage/OrderItemPage.module.scss';

export default class LineOrderProduct extends Component {
  render() {
    return (
      <div className={s.lineProduct}>
        <input type="checkbox" className={s.checkboxItem} />

        <span className={s.numSpan}>1</span>
        <input type="text" placeholder="art" className={s.artSpan} />
        <input type="text" placeholder="color" className={s.colorSpan} />
        <input
          type="number"
          placeholder="quantity"
          className={s.quantitySpan}
        />
        {/* //TODO }
        {/* <input type="text" placeholder="price" className={s.priceSpan} /> */}
        <input type="text" placeholder="discount" className={s.discountSpan} />
        <input type="text" placeholder="total sum" className={s.sumSpan} />
        <input type="text" placeholder="note" className={s.noteSpan} />
      </div>
    );
  }
}
