import { get } from 'lodash';

// Types
import {
  CREATE_FIELD,
  UPDATE_FIELD,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const field = hash && get(state, hash);

  switch (action.type) {
    case CREATE_FIELD:
      return {
        ...state,
        [hash]: action.payload,
      };
    case UPDATE_FIELD:
      return {
        ...state,
        [hash]: {
          ...field,
          ...action.payload,
        }
      };
    default:
      return state;
  }
}
