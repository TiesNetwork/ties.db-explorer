// Constants
import {
  CURRENT_ACCOUNT_STORAGE_ID,
  PRIVATE_KEY_STORAGE_ID,
} from './constants';

// Types
import {
  SET_CURRENT_ACCOUNT,
  SET_PRIVATE_KEY,
} from './types';

export const setCurrentAccount = (hash: string): func => (dispatch: func): Object => {
  console.log(123);
  localStorage.setItem(CURRENT_ACCOUNT_STORAGE_ID, hash);
  sessionStorage.removeItem(PRIVATE_KEY_STORAGE_ID);
  dispatch({ type: SET_CURRENT_ACCOUNT, hash });
};

export const setPrivateKey = (privateKey: string): func => (dispatch: func): Object => {
  sessionStorage.setItem(PRIVATE_KEY_STORAGE_ID, privateKey);
  dispatch({ type: SET_PRIVATE_KEY, privateKey });
};
