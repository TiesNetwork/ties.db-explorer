import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Api
import api from 'api';
import * as schema from 'api/schema';

// Middleware
import { routerMiddleware, routerReducer as router } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import { reducer as form } from 'redux-form';

import entities from './entities/reducer';
import services from './services/reducer';
import views from './views/reducer';

const reducer = combineReducers({
  entities,
  form,
  router,
  services,
  views,
});

const persistedReducer = persistReducer({
  storage,
  key: 'root',
  whitelist: ['entities'],
}, reducer);

export default (history: Object) => createStore(persistedReducer, compose(
  applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware.withExtraArgument({ api, schema }),
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
));
