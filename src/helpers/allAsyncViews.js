import { lazy } from 'react';

const AsyncRootPage = lazy(() =>
  import('../views/RootViews' /* webpackChunkName: "root-page" */),
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
const AsyncContractorsPage = lazy(() =>
  import('../views/ContractorsPage' /* webpackChunkName: "contractors-page" */),
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
  AsyncHomePage,
  AsyncSalesPage,
  AsyncExhibitionsPage,
  AsyncContractorsPage,
  AsyncOrdersPage,
  AsyncNewOrderPage,
};
