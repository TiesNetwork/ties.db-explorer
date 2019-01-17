import { get, uniq } from 'lodash';

// Types
import {
  CREATE_TABLE,
  UPDATE_TABLE,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const table = hash && get(state, hash);

  switch (action.type) {
    case CREATE_TABLE:
      return {
        ...state,
        [hash]: action.payload,
      };
    case UPDATE_TABLE:
      return {
        ...state,
        [hash]: {
          ...table,
          ...action.payload,
          fields: uniq([...get(table, 'fields', []), ...get(action, 'payload.fields', [])]),
          indexes: uniq([...get(table, 'indexes', []), ...get(action, 'payload.indexes', [])]),
          triggers: uniq([...get(table, 'triggers', []), ...get(action, 'payload.triggers', [])]),
        }
      };
    default:
      return state;
  }
}
