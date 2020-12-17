import React from 'react';
import StoreIcon from '@material-ui/icons/Store';
import ListAlt from '@material-ui/icons/ListAlt';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import routes from '../routes';

export default [
  {
    name: 'Главная',
    icon: <StoreIcon className="iconItem" style={{ fontSize: 22 }} />,
    path: routes.HomePage,
  },
  {
    name: 'Продажи',
    icon: <MonetizationOnIcon className="iconItem" style={{ fontSize: 22 }} />,
    path: routes.SalesPage,
  },
  {
    name: 'Заказы',
    icon: <ListAlt className="iconItem" style={{ fontSize: 22 }} />,
    path: routes.OrdersPage,
  },
  {
    name: 'Выставка',
    icon: <FolderOpenIcon className="iconItem" style={{ fontSize: 22 }} />,
    path: routes.ExhibitionsPage,
  },
  {
    name: 'Клиенты',
    icon: <PeopleOutlineIcon className="iconItem" style={{ fontSize: 22 }} />,
    path: routes.ClientsPage,
  },
];
