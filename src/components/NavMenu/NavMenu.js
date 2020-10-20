import React from 'react';
import StoreIcon from '@material-ui/icons/Store';
import ListAlt from '@material-ui/icons/ListAlt';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const menuList = ['Главная', 'Продажи', 'Заказы', 'Выставка', 'Контрагенты'];

const chooseAnIconForMenu = menuItem => {
  switch (menuItem) {
    case 'Главная':
      return <StoreIcon className="iconItem" style={{ fontSize: 22 }} />;
    case 'Продажи':
      return (
        <MonetizationOnIcon className="iconItem" style={{ fontSize: 22 }} />
      );
    case 'Заказы':
      return <ListAlt className="iconItem" style={{ fontSize: 22 }} />;
    case 'Выставка':
      return <FolderOpenIcon className="iconItem" style={{ fontSize: 22 }} />;
    case 'Контрагенты':
      return (
        <PeopleOutlineIcon className="iconItem" style={{ fontSize: 22 }} />
      );

    default:
      break;
  }
};

export default function NavMenu() {
  return (
    <nav className="asideNav">
      <ul className="navMenuList">
        {menuList.map(menuItem => {
          return (
            <li className="navMenuItem" key={menuItem}>
              <div className="navItemLink link">
                {chooseAnIconForMenu(menuItem)}
                {menuItem}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
