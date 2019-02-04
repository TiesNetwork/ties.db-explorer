import { get, uniq } from 'lodash';

// Entities
import {
  CREATE_FIELD_SUCCESS,
  DELETE_FIELD_SUCCESS,
} from 'entities/fields/types';

// Types
import {
  CREATE_TABLE,
  UPDATE_TABLE,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const tableHash = get(action, 'tableHash');

  const table = hash && get(state, tableHash || hash);

  switch (action.type) {
    case CREATE_FIELD_SUCCESS:
      return {
        ...state,
        [tableHash]: {
          ...table,
          fields: uniq([...get(table, 'fields', []), hash]),
        },
      };
    case DELETE_FIELD_SUCCESS:
      return {
        ...state,
        [tableHash]: {
          ...table,
          fields: get(table, 'fields', [])
            .filter((fieldHash: string) => fieldHash !== hash)
        },
      };

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
