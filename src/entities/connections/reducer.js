// Types
import {
  CREATE_CONNECTIONS_SUCCESS,
} from './types';

export default (state = {}, action: Object) => {
  switch (action.type) {
    case CREATE_CONNECTIONS_SUCCESS:
      return {
        ...state,
        [action.id]: action.payload,
      };
    default:
      return state;
  }
};
