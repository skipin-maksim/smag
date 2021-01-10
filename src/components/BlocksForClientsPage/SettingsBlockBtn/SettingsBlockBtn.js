import React from 'react';

import AddBtn from '../../buttons/AddBtn/AddBtn';
import EditBtn from '../../buttons/EditBtn/EditBtn';
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

        <EditBtn
          data={false}
          onEdit={() => {
            toggleModal();
            console.log('Открыть модалку для изменения клиента');
          }}
          isEdit={true}
        />
      </div>
    </>
  );
}
