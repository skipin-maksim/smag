import React from 'react';
import { FC } from 'react';

import AddBtn from '../../buttons/AddBtn/AddBtn';
import RemoveBtn from '../../buttons/RemoveBtn/RemoveBtn';

import s from './SettingsBlockBtn.module.scss';

type PropsType = {
  toggleModal: () => void;
};

const SettingsBlockBtn: FC<PropsType> = ({ toggleModal }) => {
  return (
    <>
      <div className={s.settingButtons}>
        <AddBtn
          data={false}
          onCreate={() => {
            toggleModal();
            console.log('Открыть модалку добавления клиента');
          }}
        />

        <RemoveBtn
          disabled={false}
          onRemove={() => console.log('Удалить клиента')}
        />
      </div>
    </>
  );
};

export default SettingsBlockBtn;
