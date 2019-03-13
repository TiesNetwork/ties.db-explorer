import { get } from 'lodash';

// Types
import {
  FETCH_TABLESPACES_REQUEST,
  FETCH_TABLESPACES_SUCCESS,
  FETCH_TABLESPACES_FAILURE,
} from './types';

export const fetchTablespaces = (): Function =>
  (dispatch: Function, getState: Function, { api }): Object<Promise> => {
    dispatch({ type: FETCH_TABLESPACES_REQUEST });

    return api('tablespaces.get')
      .then(({ data }): void =>
        dispatch({ type: FETCH_TABLESPACES_SUCCESS, payload: data }))
      .catch((error: Object): void =>
        dispatch({ type: FETCH_TABLESPACES_FAILURE, error: get(error, 'message')}))
  }
