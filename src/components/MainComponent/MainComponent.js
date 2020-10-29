import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';

import path from '../../helpers/allAsyncViews';
import routes from '../../routes';

export default function MainComponent() {
  return (
    <main className="main-content">
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={routes.HomePage} component={path.AsyncHomePage} />
          <Route path={routes.SalesPage} component={path.AsyncSalesPage} />
          <Route path={routes.OrdersPage} component={path.AsyncOrdersPage} />
          <Route
            path={routes.ExhibitionsPage}
            component={path.AsyncExhibitionsPage}
          />
          <Route
            path={routes.ContractorsPage}
            component={path.AsyncContractorsPage}
          />
        </Switch>
      </Suspense>
    </main>
  );
}
