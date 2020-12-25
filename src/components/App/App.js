import React, { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Beforeunload } from 'react-beforeunload';

import { ordersOperations } from '../../redux/orders/';
import { contactsOperations } from '../../redux/contacts';
import { numOrderOperations } from '../../redux/numOrder';

import Spinner from '../Spinner/Spinner';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

import routes from '../../routes';

class App extends React.Component {
  componentDidMount() {
    this.props.allOrders();
    this.props.allContacts();
    this.props.getCurrentNumOrder();
  }

  render() {
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
}

const mDTP = {
  allContacts: contactsOperations.getContacts,
  allOrders: ordersOperations.getAllOrders,
  getCurrentNumOrder: numOrderOperations.getCurrentNumOrder,
};

export default connect(null, mDTP)(App);
