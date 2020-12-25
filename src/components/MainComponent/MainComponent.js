import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';

import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import routes from '../../routes';

export default function MainComponent() {
  return (
    <main className="main-content">
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.secondRoutes.map(route =>
            route.private ? (
              <PrivateRoute key={route.label} {...route} />
            ) : (
              <PublicRoute key={route.label} {...route} />
            ),
          )}
        </Switch>
      </Suspense>
    </main>
  );
}
