import React from 'react';
import StoreIcon from '@material-ui/icons/Store';
import ListAlt from '@material-ui/icons/ListAlt';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default [
  {
    name: 'Главная',
    icon: <StoreIcon className="iconItem" style={{ fontSize: 22 }} />,
    path: '/',
  },
  {
    name: 'Продажи',
    icon: <MonetizationOnIcon className="iconItem" style={{ fontSize: 22 }} />,
    path: '/sales',
  },
  {
    name: 'Заказы',
    icon: <ListAlt className="iconItem" style={{ fontSize: 22 }} />,
    path: '/orders',
  },
  {
    name: 'Выставка',
    icon: <FolderOpenIcon className="iconItem" style={{ fontSize: 22 }} />,
    path: '/exhibitions',
  },
  {
    name: 'Клиенты',
    icon: <PeopleOutlineIcon className="iconItem" style={{ fontSize: 22 }} />,
    path: '/clients',
  },
];
