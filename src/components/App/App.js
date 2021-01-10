import React, { Suspense, useEffect, useCallback } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { Beforeunload } from 'react-beforeunload';

import { ordersOperations } from '../../redux/orders/';
import { clientsOperations } from '../../redux/clients';
import { numOrderOperations } from '../../redux/numOrder';

import Spinner from '../Spinner/Spinner';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

import routes from '../../routes';

export default function App() {
  const dispatch = useDispatch();

  const getAllOrders = useCallback(
    () => dispatch(ordersOperations.getAllOrders()),
    [dispatch],
  );
  const getAllClients = useCallback(
    () => dispatch(clientsOperations.getClients()),
    [dispatch],
  );
  const getCurrentNumOrder = useCallback(
    () => dispatch(numOrderOperations.getCurrentNumOrder()),
    [dispatch],
  );

  useEffect(() => {
    getAllOrders();
    // getAllClients();
    getCurrentNumOrder();
  }, [getAllClients, getAllOrders, getCurrentNumOrder]);

  return (
    // <Beforeunload onBeforeunload={() => "You'll lose your data!"}>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.firstRoutes.map(route =>
            route.private ? (
              <PrivateRoute key={route.label} {...route} />
            ) : (
              <PublicRoute key={route.label} {...route} />
            ),
          )}
        </Switch>
      </Suspense>
    </BrowserRouter>
    // </Beforeunload>
  );
}
