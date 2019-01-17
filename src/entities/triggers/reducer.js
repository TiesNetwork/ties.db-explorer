import { get } from 'lodash';

// Types
import {
  CREATE_TRIGGER,
  UPDATE_TRIGGER,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const trigger = hash && get(state, hash);

  switch (action.type) {
    case CREATE_TRIGGER:
      return {
        ...state,
        [hash]: action.payload,
      };
    case UPDATE_TRIGGER:
      return {
        ...state,
        [hash]: {
          ...trigger,
          ...action.payload,
        }
      };
    default:
      return state;
  }
}
