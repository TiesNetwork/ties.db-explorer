import createHistory from 'history/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import  { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

// i18n
import en from './i18n/ru';

// Views
import App from './App';

// Utils
import * as serviceWorker from 'utils/serviceWorker';
import createStore from './store';

const history = createHistory({
  basename: window.location.pathname,
});
const store = createStore(history);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider locale="en" messages={en}>
        <ConnectedRouter history={history}>
          <Route path="/" component={App} />
        </ConnectedRouter>
      </IntlProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
