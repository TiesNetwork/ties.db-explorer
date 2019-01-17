import { get } from 'lodash';

// Types
import {
  CREATE_FIELD,
  UPDATE_FIELD,
} from './types';

export const saveField = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.fields.${hash}`)
    ? dispatch({ type: CREATE_FIELD, hash, payload })
    : dispatch({ type: UPDATE_FIELD, hash, payload });
