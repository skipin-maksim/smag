import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Spinner from './components/Spinner/Spinner';

import { store, persistor } from './redux/store';
import routes from './routes';
import path from './helpers/allAsyncViews';

import 'modern-normalize/modern-normalize.css';
import './main.scss';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              exact
              path={routes.RootPage}
              component={path.AsyncRootPage}
            />

            <Route path={routes.AppPage} component={path.AsyncAppPage} />
          </Switch>
        </Suspense>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
