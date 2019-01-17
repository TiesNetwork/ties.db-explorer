import { get } from 'lodash';

// Types
import {
  CREATE_TRIGGER,
  UPDATE_TRIGGER,
} from './types';

export const saveTrigger = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.trigger.${hash}`)
    ? dispatch({ type: CREATE_TRIGGER, hash, payload })
    : dispatch({ type: UPDATE_TRIGGER, hash, payload });
