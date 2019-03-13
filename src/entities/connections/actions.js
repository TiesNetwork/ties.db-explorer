import { get } from 'lodash';
import { normalize } from 'normalizr';
import { SubmissionError } from 'redux-form';

// Types
import {
  // Create
  CREATE_CONNECTIONS_REQUEST,
  CREATE_CONNECTIONS_SUCCESS,
  CREATE_CONNECTIONS_FAILURE,
  // Fetch
  FETCH_CONNECTIONS_REQUEST,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_CONNECTIONS_FAILURE,
} from './types';

import { UPDATE_ENTITIES } from 'entities/types';

export const createConnection = (values: Object) =>
  (dispatch: Function, getState: Function, { api, history }): void => {
    dispatch({ type: CREATE_CONNECTIONS_REQUEST });

    return api('connections.create', values)
      .then(({ data }) => {
        const id = get(data, 'id');
        history.push('/connections');

        if (id) {
          dispatch({ type: CREATE_CONNECTIONS_SUCCESS, id, payload: data });
        }
      })
      .catch((error: Object): void => {
        const data = get(error, 'response.data');
        dispatch({ type: CREATE_CONNECTIONS_FAILURE, error: get(error, 'message')});
        if (data) { throw new SubmissionError(data); }
      });
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

