import { get } from 'lodash';

// Types
import {
  CREATE_INDEX,
  UPDATE_INDEX,
} from './types';

export const saveIndex = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.indexes.${hash}`)
    ? dispatch({ type: CREATE_INDEX, hash, payload })
    : dispatch({ type: UPDATE_INDEX, hash, payload });
