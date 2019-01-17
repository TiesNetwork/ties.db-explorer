// Selector
import { hasProgress } from './selector';

// Types
import {
  CREATE_PROGRESS,
  DELETE_PROGRESS,
  UPDATE_PROGRESS,
} from './types';

export const deleteProgress = (id: string): Object =>
  ({ type: DELETE_PROGRESS, id });

export const updateProgress = (id: string, payload: Object): Object => (dispatch: func, getState: func) => {
  dispatch({ type: hasProgress(getState(), id) ? UPDATE_PROGRESS : CREATE_PROGRESS, id, payload });
};
