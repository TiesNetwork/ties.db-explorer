import { get } from 'lodash';

// Types
import {
  CREATE_INDEX,
  UPDATE_INDEX,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const index = hash && get(state, hash);

  switch (action.type) {
    case CREATE_INDEX:
      return {
        ...state,
        [hash]: action.payload,
      };
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
