import React from 'react';

import AddBtn from '../../buttons/AddBtn/AddBtn';
import RemoveBtn from '../../buttons/RemoveBtn/RemoveBtn';

import s from './SettingsBlockBtn.module.scss';

export default function SettingsBlockBtn({ createClient, removeClient }) {
  return (
    <>
      <div className={s.settingButtons}>
        <AddBtn data={false} onCreate={createClient} />

        <RemoveBtn disabled={false} onRemove={removeClient} />
      </div>
    </>
  );
}
