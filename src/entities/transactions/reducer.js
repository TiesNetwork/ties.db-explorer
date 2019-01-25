import { get } from 'lodash';

// Types
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,

  SET_CHECKED,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const transaction = hash && get(state, hash);

  switch (action.type) {
    case CREATE_TRANSACTION:
      return {
        ...state,
        [hash]: { hash, ...action.payload, isChecked: false },
      };
    case SET_CHECKED:
      return {
        ...state,
        [hash]: {
          ...transaction,
          isChecked: true,
        },
      }
    case UPDATE_TRANSACTION:
      return {
        ...state,
        [hash]: {
          ...transaction,
          ...action.payload,
        }
      };
    default:
      return state;
  }
}
