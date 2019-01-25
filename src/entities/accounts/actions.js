import { get } from 'lodash';
import { SubmissionError } from 'redux-form';

// Containers
import { EDIT_MODAL_ID } from 'containers/Edit';
import { IMPORT_MODAL_ID } from 'containers/Import';

// Services
import { closeModal } from 'services/modals';
import {
  setCurrentAccount,
  setPrivateKey,
} from 'services/session';

// Types
import {
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_SUCCESS,

  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
} from './types';

export const createAccount = (value: Object) => (dispatch: func, getState: func, { api }): Object => {
  dispatch({ type: CREATE_ACCOUNT_REQUEST });

  return api('accounts.create', value)
    .then(({ data = {} }) => {
      const { hash, privateKey, ...payload } = data;

      dispatch({ type: CREATE_ACCOUNT_SUCCESS, hash, payload });

      // Modals
      dispatch(closeModal(IMPORT_MODAL_ID));
      // Session
      dispatch(setCurrentAccount(hash));
      dispatch(setPrivateKey(hash));
    })
    .catch((error: Object) => {
      const message = get(error, 'response.data.message', get(error, 'message'));
      dispatch({ type: CREATE_ACCOUNT_FAILURE, error: message });
      throw new SubmissionError({ _error: message });
    });
};

export const deleteAccount = (hash: string): func => (dispatch: func): Object => {
  dispatch({ type: DELETE_ACCOUNT, hash });
  dispatch(closeModal(EDIT_MODAL_ID));
};

export const updateAccount = (hash: string, payload: Object): func => (dispatch: func): Object => {
  dispatch({ type: UPDATE_ACCOUNT, hash, payload });
  dispatch(closeModal(EDIT_MODAL_ID));
};
