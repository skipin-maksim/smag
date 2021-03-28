import React from 'react';

import s from './SupportPage.module.scss';

export default function SupportPage() {
  return (
    <>
      <h2 className="testViews">Info Page</h2>
      <div className={s.container}>
        <h3 className={s.title}>Реализовано:</h3>
        <ul>
          <li>
            Создание, удаление, редактирование заказов. В заказе можно
            использовать артикулы: 00082, 01042, 0101, 0101-1 (на самом деле их
            около 750)
          </li>
          <li>Создание, удаление, клиентов</li>
          <li>Вся информация записывается в базу данных MongoDB</li>
        </ul>

        <h3 className={s.title}>Использовано:</h3>
        <ul>
          <li>React</li>
          <li>Redux (toolkit)</li>
          <li>Пару компонентов из Material Design</li>
          <li>Самописный сервер NodeJs, Express, Mongoose </li>
        </ul>
        <h3 className={s.title}>Приложение в разработке {`=)`}</h3>
      </div>
    </>
  );
}
