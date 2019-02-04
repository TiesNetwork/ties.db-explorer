import { get, omit, uniq } from 'lodash';

// Entities
import {
  CREATE_TABLE_SUCCESS,
  DELETE_TABLE_SUCCESS,
} from 'entities/tables/types';

// Types
import {
  CREATE_TABLESPACE,
  CREATE_TABLESPACE_SUCCESS,

  DELETE_TABLESPACE,
  DELETE_TABLESPACE_SUCCESS,

  UPDATE_TABLESPACE,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const tablespaceHash = get(action, 'tablespaceHash');

  const tablespace = hash && get(state, tablespaceHash || hash);

  switch (action.type) {
    case CREATE_TABLE_SUCCESS:
      return {
        ...state,
        [tablespaceHash]: {
          ...tablespace,
          tables: uniq([...get(tablespace, 'tables', []), hash]),
        },
      };
    case DELETE_TABLE_SUCCESS:
      return {
        ...state,
        [tablespaceHash]: {
          ...tablespace,
          tables: get(tablespace, 'tables', [])
            .filter((tableHash: string) => tableHash !== hash)
        },
      };
    case CREATE_TABLESPACE:
    case CREATE_TABLESPACE_SUCCESS:
      return {
        ...state,
        [hash]: action.payload,
      };
    case DELETE_TABLESPACE:
    case DELETE_TABLESPACE_SUCCESS:
      return omit(state, action.hash);
    case UPDATE_TABLESPACE:
      return {
        ...state,
        [hash]: {
          ...tablespace,
          ...action.payload,
          tables: uniq([...get(tablespace, 'tables', []), ...get(action, 'payload.tables', [])]),
        }
      };
    default:
      return state;
  }
}
