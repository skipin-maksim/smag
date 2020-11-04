import { lazy } from 'react';

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

export default {
  AsyncHomePage,
  AsyncSalesPage,
  AsyncExhibitionsPage,
  AsyncContractorsPage,
  AsyncOrdersPage,
};
