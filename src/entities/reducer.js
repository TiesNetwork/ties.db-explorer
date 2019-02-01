import { merge } from 'lodash';
import { combineReducers } from 'redux';

// Models
import accounts from './accounts';
import connections from './connections';
import fields from './fields';
import indexes from './indexes';
import tables from './tables';
import tablespaces from './tablespaces';
import transactions from './transactions';
import triggers from './triggers';

// Types
import { UPDATE_ENTITIES } from './types';

const modelsReducer = combineReducers({
  accounts,
  connections,
  fields,
  indexes,
  tables,
  tablespaces,
  transactions,
  triggers,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    case UPDATE_ENTITIES:
      return action.force
        ? { ...state, ...action.data.entities }
        : merge({}, state, action.data.entities);
    default:
      return modelsReducer(state, action);
  }
};
