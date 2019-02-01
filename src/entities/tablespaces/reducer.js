import { get, omit, uniq } from 'lodash';

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
  const tablespace = hash && get(state, hash);

  switch (action.type) {
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
