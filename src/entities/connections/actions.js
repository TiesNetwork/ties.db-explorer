import { get } from 'lodash';
import { normalize } from 'normalizr';

// Types
import {
  FETCH_CONNECTIONS_REQUEST,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_CONNECTIONS_FAILURE,
} from './types';

import { UPDATE_ENTITIES } from 'entities/types';

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

