import { get } from 'lodash';

// Entities
import {
  // Create
  CREATE_CONNECTION_REQUEST,
  CREATE_CONNECTION_SUCCESS,
  CREATE_CONNECTION_FAILURE,
  // Delete
  DELETE_CONNECTION_REQUEST,
  DELETE_CONNECTION_SUCCESS,
  DELETE_CONNECTION_FAILURE,
  // Fetch
  FETCH_CONNECTIONS_REQUEST,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_CONNECTIONS_FAILURE,
  // Set Tablespaces
  SET_TABLESPACES_REQUEST,
  SET_TABLESPACES_SUCCESS,
  SET_TABLESPACES_FAILURE,
} from 'entities/connections';

// Types
import {
  FETCH_TABLESPACES_REQUEST,
  FETCH_TABLESPACES_SUCCESS,
  FETCH_TABLESPACES_FAILURE,
} from './types';

const initialState = {
  isFetching: false,
  tablespaces: [],
};

export default (state = initialState, action: Object): Object => {
  switch (action.type) {
    case CREATE_CONNECTION_REQUEST:
    case DELETE_CONNECTION_REQUEST:
    case FETCH_CONNECTIONS_REQUEST:
    case FETCH_TABLESPACES_REQUEST:
    case SET_TABLESPACES_REQUEST:
      return { ...state, isFetching: true };
    case CREATE_CONNECTION_SUCCESS:
    case CREATE_CONNECTION_FAILURE:
    case DELETE_CONNECTION_SUCCESS:
    case DELETE_CONNECTION_FAILURE:
    case FETCH_CONNECTIONS_SUCCESS:
    case FETCH_CONNECTIONS_FAILURE:
    case FETCH_TABLESPACES_FAILURE:
    case SET_TABLESPACES_SUCCESS:
    case SET_TABLESPACES_FAILURE:
      return { ...state, isFetching: false };
    case FETCH_TABLESPACES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tablespaces: action.payload
      };
    default:
      return state;
  }
}
