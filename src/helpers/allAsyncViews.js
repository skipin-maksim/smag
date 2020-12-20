import { lazy } from 'react';

const AsyncRootPage = lazy(() =>
  import('../views/RootPage/RootPage' /* webpackChunkName: "root-page" */),
);
const AsyncAppPage = lazy(() =>
  import('../components/App/App' /* webpackChunkName: "app-page" */),
);

const AsyncHomePage = lazy(() =>
  import('../views/HomePage' /* webpackChunkName: "home-page" */),
);
const AsyncSalesPage = lazy(() =>
  import('../views/SalesPage' /* webpackChunkName: "sales-page" */),
);
const AsyncExhibitionsPage = lazy(() =>
  import('../views/ExhibitionsPage' /* webpackChunkName: "exhibitions-page" */),
);
const AsyncClientsPage = lazy(() =>
  import('../views/ClientsPage' /* webpackChunkName: "clients-page" */),
);
const AsyncOrdersPage = lazy(() =>
  import(
    '../views/OrdersPage/OrdersPage' /* webpackChunkName: "orders-page" */
  ),
);
const AsyncNewOrderPage = lazy(() =>
  import(
    '../views/NewOrderPage/NewOrderPage' /* webpackChunkName: "order-item-page" */
  ),
);

export default {
  AsyncRootPage,
  AsyncAppPage,
  AsyncHomePage,
  AsyncSalesPage,
  AsyncExhibitionsPage,
  AsyncClientsPage,
  AsyncOrdersPage,
  AsyncNewOrderPage,
};
