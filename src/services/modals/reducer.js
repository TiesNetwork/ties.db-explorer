import { omit } from 'lodash';

import {
  CLOSE_MODAL,
  CLOSE_MODALS,
  OPEN_MODAL,
} from './types';

export default (state = {}, action: Object) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return omit(state, action.id);
    case CLOSE_MODALS:
      return {};
    case OPEN_MODAL:
      return {
        ...state,
        [action.id]: action.payload || true,
      };
    default:
      return state;
  }
}
