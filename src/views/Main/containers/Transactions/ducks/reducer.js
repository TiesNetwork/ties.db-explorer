// Entities
import {
  CONFIRM_TRANSACTIONS_REQUEST,
  CONFIRM_TRANSACTIONS_SUCCESS,
  CONFIRM_TRANSACTIONS_FAILURE,
} from 'entities/transactions';

const initialState = {
  isFetching: false,
};

export default (state = initialState, action: Object): Object => {
  switch (action.type) {
    case CONFIRM_TRANSACTIONS_REQUEST:
      return { ...state, isFetching: true };
    case CONFIRM_TRANSACTIONS_SUCCESS:
    case CONFIRM_TRANSACTIONS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
