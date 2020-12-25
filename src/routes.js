import { lazy } from 'react';

const routes = {
  firstRoutes: [
    {
      path: '/login',
      label: 'Home',
      exact: true,
      component: lazy(() => import('./views/LoginPage/LoginPage.js')),
      private: false,
      restricted: false,
    },
    {
      path: '/',
      label: 'Test',
      exact: false,
      component: lazy(() => import('./views/Test')),
      private: true,
      restricted: false,
    },
  ],

  secondRoutes: [
    {
      path: '/home',
      label: 'Home',
      exact: true,
      component: lazy(() => import('./views/HomePage.js')),
      private: true,
      restricted: false,
    },
    {
      path: '/orders',
      label: 'Orders',
      exact: true,
      component: lazy(() => import('./views/OrdersPage/OrdersPage.js')),
      private: true,
      restricted: false,
    },
    {
      path: '/orders/:orderId',
      label: 'Order',
      exact: true,
      component: lazy(() => import('./views/CurrentOrder/CurrentOrder.js')),
      private: true,
      restricted: false,
    },
    {
      path: '/exhibitions',
      label: 'Exhibitions',
      exact: true,
      component: lazy(() => import('./views/ExhibitionsPage.js')),
      private: true,
      restricted: false,
    },
    {
      path: '/sales',
      label: 'Sales',
      exact: true,
      component: lazy(() => import('./views/SalesPage.js')),
      private: true,
      restricted: false,
    },
    {
      path: '/clients',
      label: 'Clients',
      exact: true,
      component: lazy(() => import('./views/ClientsPage.js')),
      private: true,
      restricted: false,
    },
  ],
};

export default routes;

// export default {
//   RootPage: '/',
//   AppPage: '/app',
//   HomePage: '/app/home',
//   ExhibitionsPage: '/app/exhibitions',
//   SalesPage: '/app/sales',
//   ClientsPage: '/app/clients',
//   OrdersPage: '/app/orders',
//   CurrentOrder: '/app/orders/:orderId',
// };
