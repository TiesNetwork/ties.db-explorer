import { get, omit } from 'lodash';

// Types
import {
  CREATE_TRIGGER,
  CREATE_TRIGGER_SUCCESS,

  DELETE_TRIGGER,
  DELETE_TRIGGER_SUCCESS,

  UPDATE_TRIGGER,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const trigger = hash && get(state, hash);

  switch (action.type) {
    case CREATE_TRIGGER:
    case CREATE_TRIGGER_SUCCESS:
      return {
        ...state,
        [hash]: action.payload,
      };
    case DELETE_TRIGGER:
    case DELETE_TRIGGER_SUCCESS:
      return omit(state, hash);
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
