import { get } from 'lodash';

// Types
import {
  FETCH_CONNECTIONS_REQUEST,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_CONNECTIONS_FAILURE,
} from 'entities/connections';

const initialState = {
  connections: [],
  isLoading: false,
};

export default (state = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_CONNECTIONS_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_CONNECTIONS_SUCCESS:
      return { ...state,
        connections: get(action, 'connections', []),
        isLoading: false,
      };

    case FETCH_CONNECTIONS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
