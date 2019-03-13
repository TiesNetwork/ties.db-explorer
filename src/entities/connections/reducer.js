import { omit } from 'lodash';

// Types
import {
  CREATE_CONNECTION_SUCCESS,
  DELETE_CONNECTION_SUCCESS,
} from './types';

export default (state = {}, action: Object) => {
  switch (action.type) {
    case CREATE_CONNECTION_SUCCESS:
      return {
        ...state,
        [action.id]: action.payload,
      };
    case DELETE_CONNECTION_SUCCESS:
      return omit(state, action.id);
    default:
      return state;
  }
};
