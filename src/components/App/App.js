import React, { Suspense, useEffect, useCallback } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
// import { Beforeunload } from 'react-beforeunload';

import { ordersOperations } from '../../redux/orders/';
import { contactsOperations } from '../../redux/contacts';
import { numOrderOperations } from '../../redux/numOrder';

import Spinner from '../Spinner/Spinner';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

import routes from '../../routes';

const App = () => {
  const dispatch = useDispatch();

  const getAllOrders = useCallback(
    () => dispatch(ordersOperations.getAllOrders()),
    [dispatch],
  );
  const getAllContacts = useCallback(
    () => dispatch(contactsOperations.getContacts()),
    [dispatch],
  );
  const getCurrentNumOrder = useCallback(
    () => dispatch(numOrderOperations.getCurrentNumOrder()),
    [dispatch],
  );

  useEffect(() => {
    getAllOrders();
    getAllContacts();
    getCurrentNumOrder();
  }, [getAllContacts, getAllOrders, getCurrentNumOrder]);

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
};

export default connect()(App);
