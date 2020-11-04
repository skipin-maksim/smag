import React, { Component } from 'react';
import s from './LineOrderProduct.module.scss';

export default class LineOrderProduct extends Component {
  render() {
    return (
      <div className={s.lineProduct}>
        <span>1</span>
        <input type="text" placeholder="art" />
        <input type="text" placeholder="color" />
        <input type="number" placeholder="quantity" />
        <input type="text" placeholder="discount" />
        <input type="text" placeholder="total sum" />
      </div>
    );
  }
}
