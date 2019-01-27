import { get, omit } from 'lodash';

// Types
import {
  CREATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
} from './types';

export default (state = {}, action: Object) => {
  const hash = get(action, 'hash');
  const account = get(state, hash);

  switch (action.type) {
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        [hash]: { ...action.payload, hash },
      };
    case DELETE_ACCOUNT_SUCCESS:
      return omit(state, hash);
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        [hash]: {
          ...account,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
