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
      label: 'RootPage',
      exact: false,
      component: lazy(() => import('./views/RootPage/RootPage.js')),
      private: true,
      restricted: false,
    },
  ],

  secondRoutes: [
    {
      path: '/',
      label: 'RootSecondPage',
      exact: true,
      component: lazy(() => import('./views/SupportPage/SupportPage.js')),
      private: true,
      restricted: false,
    },
    {
      path: '/home',
      label: 'Home',
      exact: true,
      component: lazy(() => import('./views/HomePage/HomePage.js')),
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
      component: lazy(() =>
        import('./views/ExhibitionsPage/ExhibitionsPage.js'),
      ),
      private: true,
      restricted: false,
    },
    {
      path: '/sales',
      label: 'Sales',
      exact: true,
      component: lazy(() => import('./views/SalesPage/SalesPage.js')),
      private: true,
      restricted: false,
    },
    {
      path: '/clients',
      label: 'Clients',
      exact: true,
      component: lazy(() => import('./views/ClientsPage/ClientsPage.js')),
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
