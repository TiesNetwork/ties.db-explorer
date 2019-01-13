import { get } from 'lodash';
import { normalize } from 'normalizr';

// Ducks
import {
  FETCH_ENTITIES_REQUEST,
  FETCH_ENTITIES_SUCCESS,
  FETCH_ENTITIES_FAILURE,
} from './types';

import { UPDATE_ENTITIES } from 'entities/types';

export const fetchEntities = (callback: func) => (dispatch: func, getState: func, { api, schema }) => {
  dispatch({ type: FETCH_ENTITIES_REQUEST });

  api('schema.get')
    .then(({ data }) => {
      const normalizedData = normalize(data, [schema.tablespace]);

      dispatch({ type: UPDATE_ENTITIES, data: normalizedData });
      dispatch({ type: FETCH_ENTITIES_SUCCESS, connections: normalizedData.result });

      callback && callback();
    })
    .catch((error: Object) =>
      dispatch({ type: FETCH_ENTITIES_FAILURE, error: get(error, 'message') })
    );
};
