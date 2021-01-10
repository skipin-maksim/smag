import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../Modal/Modal';
import AddBtn from '../../buttons/AddBtn/AddBtn';
import EditBtn from '../../buttons/EditBtn/EditBtn';
import RemoveBtn from '../../buttons/RemoveBtn/RemoveBtn';

import s from './SettingsBlockBtn.module.scss';

export default function SettingsBlockBtn() {
  const [isModalClient, setisModalClient] = useState(false);

  // const dispatch = useDispatch();

  // const onCloseModal = () => {
  // };

  const toggleModal = () => {
    setisModalClient(!isModalClient);
  };

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
      {isModalClient && (
        <Modal
          children={
            <>
              <div>Hello World!!!!</div>
            </>
          }
          onCloseModal={toggleModal}
        />
      )}
    </>
  );
}
