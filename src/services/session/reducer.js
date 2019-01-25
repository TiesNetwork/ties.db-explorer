// Types
import {
  SET_CURRENT_ACCOUNT,
  SET_PRIVATE_KEY,
} from './types';

const initialValues = {
  currentAccount: localStorage.getItem('currentAccount'),
  privateKey: sessionStorage.getItem('privateKey'),
};

export default (state = initialValues, action: Object) => {
  switch (action.type) {
    case SET_CURRENT_ACCOUNT:
      return {
        ...state,
        currentAccount: action.hash,
        privateKey: null,
      };
    case SET_PRIVATE_KEY:
      return {
        ...state,
        privateKey: action.privateKey,
      };
    default:
      return state;
  }
};
