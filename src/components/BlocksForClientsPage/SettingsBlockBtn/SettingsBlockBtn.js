import React from 'react';

import AddBtn from '../../buttons/AddBtn/AddBtn';
import RemoveBtn from '../../buttons/RemoveBtn/RemoveBtn';

import s from './SettingsBlockBtn.module.scss';

export default function SettingsBlockBtn({ toggleModal }) {
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
}
