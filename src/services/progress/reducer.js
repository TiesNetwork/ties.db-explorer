import { get, omit } from 'lodash';

// Types
import {
  CREATE_PROGRESS,
  DELETE_PROGRESS,
  UPDATE_PROGRESS,
} from './types';

export default (state = {}, action: Object) => {
  const id = get(action, 'id');
  const progress = id && get(state, id);

  switch (action.type) {
    case CREATE_PROGRESS:
      return {
        ...state,
        [id]: action.payload,
        result: [...get(state, 'result', []), id],
      };
    case DELETE_PROGRESS:
      return {
        ...omit(state, id),
        result: get(state, 'result', []).filter((itemId) => itemId !== id),
      };
    case UPDATE_PROGRESS:
      return {
        ...state,
        [id]: {
          ...progress,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
