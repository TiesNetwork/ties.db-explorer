// Types
import {
  // Create
  CREATE_CONNECTIONS_REQUEST,
  CREATE_CONNECTIONS_SUCCESS,
  CREATE_CONNECTIONS_FAILURE,
} from './types';

export default (state = {}, action: Object) => {
  switch (action.type) {
    case CREATE_CONNECTIONS_SUCCESS:
      return { ...state, 'test': action.payload };
    default:
      return state;
  }
};
