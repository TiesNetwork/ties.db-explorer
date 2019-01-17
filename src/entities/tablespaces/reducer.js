import { get, uniq } from 'lodash';

// Types
import {
  CREATE_TABLESPACE,
  CREATE_TABLESPACE_SUCCESS,

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
