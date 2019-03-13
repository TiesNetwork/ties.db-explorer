import { get } from 'lodash';

// Types
import {
  FETCH_CONNECTIONS_REQUEST,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_CONNECTIONS_FAILURE,
} from 'entities/connections';

const initialState = {
  isFetching: false,
};

export default (state = initialState, action: Object): Object => {
  switch (action.type) {
    case FETCH_CONNECTIONS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_CONNECTIONS_SUCCESS:
    case FETCH_CONNECTIONS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
