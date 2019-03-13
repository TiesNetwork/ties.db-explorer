import { get } from 'lodash';
import { normalize } from 'normalizr';
import { SubmissionError } from 'redux-form';

// Types
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
  // Other
  SET_CONNECTION_ID,
} from './types';

import { UPDATE_ENTITIES } from 'entities/types';

export const createConnection = (values: Object): Function =>
  (dispatch: Function, getState: Function, { api, history }): void => {
    dispatch({ type: CREATE_CONNECTION_REQUEST });

    return api('connections.create', values)
      .then(({ data }) => {
        const id = get(data, 'id');
        history.push('/connections');

        if (id) {
          dispatch({ type: CREATE_CONNECTION_SUCCESS, id, payload: values });
        }
      })
      .catch((error: Object): void => {
        const data = get(error, 'response.data');
        dispatch({ type: CREATE_CONNECTION_FAILURE, error: get(error, 'message')});
        if (data) { throw new SubmissionError(data); }
      });
  }

export const deleteConnection = (id: string): Function =>
  (dispatch: Function, getState: Function, { api }): void => {
    dispatch({ type: DELETE_CONNECTION_REQUEST });

    return api('connections.delete', { id })
      .then((): void =>
        dispatch({ type: DELETE_CONNECTION_SUCCESS, id }))
      .catch((error: Object): void =>
        dispatch({ type: DELETE_CONNECTION_FAILURE, error: get(error, 'message')}));
  }

export const fetchConnections = () => (dispatch: func, getState: func, { api, schema }) => {
  dispatch({ type: FETCH_CONNECTIONS_REQUEST });

  api('connections.get')
    .then(({ data }) => {
      const normalizedData = normalize(data, [schema.connection]);

      dispatch({ type: UPDATE_ENTITIES, data: normalizedData });
      dispatch({ type: FETCH_CONNECTIONS_SUCCESS, connections: normalizedData.result });
    })
    .catch((error: Object) =>
      dispatch({ type: FETCH_CONNECTIONS_FAILURE, error: get(error, 'message') })
    );
};

export const setConnectionId = (id: string): Function =>
  (dispatch: Function, getState: Function, { history }): void => {
    localStorage.setItem('connectionId', id);
    dispatch({ type: SET_CONNECTION_ID, id });
    history.push(`/connections/${id}`);
  }

export const setTablespaces = (id: string, tablespaces: Array<string>): Function =>
  (dispatch: Function, getState: Function, { api, history }): Object<Promise> => {
    dispatch({ type: SET_TABLESPACES_REQUEST });

    return api('connections.setTablespaces', { id, tablespaces })
      .then(() => {
        dispatch({ type: SET_TABLESPACES_SUCCESS });
        history.push('/');
      })
      .catch((error: Object): void =>
        dispatch({ type: SET_TABLESPACES_FAILURE, error: get(error, 'message') }))
  }
