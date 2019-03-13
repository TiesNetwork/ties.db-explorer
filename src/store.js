/* eslint-disable */
import { get, set, values } from 'lodash';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createTransform, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Api
import api from 'api';
import * as schema from 'api/schema';

// Entities
import { TRANSACTION_CONFIRM_TYPE } from 'entities/transactions';
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TABLES_ENTITY_ID } from 'entities/tables';
import { TABLESPACES_ENTITY_ID } from 'entities/tablespaces';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

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

const filterAccounts = createTransform(({ accounts, ...entities }): Object => entities);

const filterSync = createTransform((entities) => entities, (entities: Object) => {
  const ENTITIES = [
    FIELDS_ENTITY_ID,
    INDEXES_ENTITY_ID,
    TABLES_ENTITY_ID,
    TABLESPACES_ENTITY_ID,
    TRIGGERS_ENTITY_ID,
  ];
  const newEntities = {};

  ENTITIES.forEach((entityId) => {
    values(get(entities, entityId, {})).forEach((entity) => {
      const hash = get(entity, 'hash');

      if (hash) {
        set(newEntities, `${entityId}.${hash}`, { ...entity, isSynchronized: false });
      }
    })
  });

  return newEntities;
});

const filterTransactions = createTransform((entities: Object, key: string): Object => {
  const transactions = values(get(entities, 'transactions', {}));
  const newTransactions = {};

  transactions
    .filter(({ type }): bool => type !== TRANSACTION_CONFIRM_TYPE)
    .forEach(({ hash, ...payload }): void => {
      newTransactions[hash] = { hash, ...payload };
    });

  return { ...entities, transactions: newTransactions };
});

const persistedReducer = persistReducer({
  storage,
  key: 'root',
  transforms: [
    filterAccounts,
    filterTransactions,
    filterSync,
  ],
  whitelist: ['entities'],
}, reducer);

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export default (history: Object) => createStore(persistedReducer, composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware.withExtraArgument({ api, history, schema }),
  ),
));
