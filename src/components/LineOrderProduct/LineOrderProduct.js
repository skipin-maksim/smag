import React, { useState } from 'react';
import s from '../../views/OrderItemPage/OrderItemPage.module.scss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import colorsList from '../../data/colorsList';

export default function LineOrderProduct() {
  const [checkbox, setCheckbox] = useState(false);
  const handleCheckBox = () => {
    setCheckbox(!checkbox);
  };

  const [artValue, setArtValue] = useState('');
  const handleArtValue = evt => {
    setArtValue(evt.target.value);
  };

  const [colorValue, setColorValue] = useState('');
  const handleColorValue = evt => {
    setColorValue(evt.target.value);

    if (colorValue) return; /* colorValue = unused const! */
  };

  const [numberValue, setNumberValue] = useState('');
  const handleNumberValue = evt => {
    setNumberValue(evt.target.value);
  };

  const [priceValue, setPriceValue] = useState('');
  const handlePriceValue = evt => {
    setPriceValue(evt.target.value);
  };

  const [discountValue, setDiscountValue] = useState('');
  const handleDiscountValue = evt => {
    setDiscountValue(evt.target.value);
  };

  const [sumValue, setSumValue] = useState('');
  const handleSumValue = evt => {
    setSumValue(evt.target.value);
  };

  const [noteValue, setNoteValue] = useState('');
  const handleNoteValue = evt => {
    setNoteValue(evt.target.value);
  };

  return (
    <div className={s.lineProduct}>
      <span className={s.numSpan}>1</span>
      <input
        type="checkbox"
        onChange={handleCheckBox}
        className={s.checkboxItem}
      />
      <input
        type="text"
        placeholder="артикул"
        onChange={handleArtValue}
        value={artValue}
        className={s.nameSpan}
      />
      <Autocomplete
        className={s.colorSpan}
        style={{ textAlign: 'center' }}
        // id="free-solo-demo"
        // freeSolo
        options={colorsList.map(option => option.title)}
        renderInput={params => (
          <div ref={params.InputProps.ref}>
            <input
              type="text"
              {...params.inputProps}
              onBlur={handleColorValue}
            />
          </div>
        )}
      />
      <input
        type="number"
        placeholder="количество"
        onChange={handleNumberValue}
        value={numberValue}
        className={s.quantitySpan}
      />
      <input
        type="number"
        placeholder="цена"
        onChange={handlePriceValue}
        value={priceValue}
        className={s.priceSpan}
      />
      <input
        type="number"
        placeholder="скидка"
        onChange={handleDiscountValue}
        value={discountValue}
        className={s.discountSpan}
      />
      <input
        type="number"
        placeholder="number"
        onChange={handleSumValue}
        value={sumValue}
        className={s.sumSpan}
      />
      <input
        type="text"
        placeholder="заметка"
        onChange={handleNoteValue}
        value={noteValue}
        className={s.noteSpan}
      />
    </div>
  );
}
