import { get, omit, uniq } from 'lodash';

// Entities
import {
  CREATE_FIELD_SUCCESS,
  DELETE_FIELD_SUCCESS,
} from 'entities/fields/types';

import {
  CREATE_INDEX_SUCCESS,
  DELETE_INDEX_SUCCESS,
} from 'entities/indexes/types';

// Types
import {
  CREATE_TABLE,
  CREATE_TABLE_SUCCESS,

  DELETE_TABLE,
  DELETE_TABLE_SUCCESS,

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

    case CREATE_INDEX_SUCCESS:
      return {
        ...state,
        [tableHash]: {
          ...table,
          indexes: uniq([...get(table, 'indexes', []), hash]),
        },
      };
    case DELETE_INDEX_SUCCESS:
      return {
        ...state,
        [tableHash]: {
          ...table,
          indexes: get(table, 'indexes', [])
            .filter((fieldHash: string) => fieldHash !== hash)
        },
      };

    case CREATE_TABLE:
    case CREATE_TABLE_SUCCESS:
      return {
        ...state,
        [hash]: action.payload,
      };

    case DELETE_TABLE:
    case DELETE_TABLE_SUCCESS:
      return omit(state, hash);

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
