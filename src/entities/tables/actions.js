import { get } from 'lodash';

// Types
import {
  CREATE_TABLE,
  UPDATE_TABLE,
} from './types';

export const saveTable = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.tables.${hash}`)
    ? dispatch({ type: CREATE_TABLE, hash, payload })
    : dispatch({ type: UPDATE_TABLE, hash, payload });
