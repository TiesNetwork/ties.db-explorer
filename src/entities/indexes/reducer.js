import { get, omit } from 'lodash';

// Types
import {
  CREATE_INDEX,
  CREATE_INDEX_SUCCESS,

  DELETE_INDEX,
  DELETE_INDEX_SUCCESS,

  UPDATE_INDEX,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const index = hash && get(state, hash);

  switch (action.type) {
    case CREATE_INDEX:
    case CREATE_INDEX_SUCCESS:
      return {
        ...state,
        [hash]: action.payload,
      };
    case DELETE_INDEX:
    case DELETE_INDEX_SUCCESS:
      return omit(state, hash);
    case UPDATE_INDEX:
      return {
        ...state,
        [hash]: {
          ...index,
          ...action.payload,
        }
      };
    default:
      return state;
  }
}
