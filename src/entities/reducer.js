import { merge } from 'lodash';
import { combineReducers } from 'redux';

// Models
import connections from './connections';

import accounts from './accounts';
import fields from './fields';
import indexes from './indexes';
import tables from './tables';
import tablespaces from './tablespaces';
import triggers from './triggers';

// Types
import { UPDATE_ENTITIES } from './types';

const modelsReducer = combineReducers({
  connections,

  accounts,
  fields,
  indexes,
  tables,
  tablespaces,
  triggers,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    case UPDATE_ENTITIES:
      return merge({}, state, action.data.entities);
    default:
      return modelsReducer(state, action);
  }
};
