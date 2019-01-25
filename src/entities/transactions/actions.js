import { get } from 'lodash';

// Types
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,

  SET_CHECKED,
} from './types';

export const setChecked = (hash: string): Object =>
  ({ type: SET_CHECKED, hash });

export const saveTransaction = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.transactions.${hash}`)
    ? dispatch({ type: UPDATE_TRANSACTION, hash, payload })
    : dispatch({ type: CREATE_TRANSACTION, hash, payload });
