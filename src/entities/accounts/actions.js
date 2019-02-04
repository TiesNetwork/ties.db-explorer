import { get } from 'lodash';
import { normalize } from 'normalizr';
import { SubmissionError } from 'redux-form';

// Containers
import { EDIT_MODAL_ID } from 'containers/Edit';
import { IMPORT_MODAL_ID } from 'containers/Import';

// Entities
import { UPDATE_ENTITIES } from 'entities/types';

// Selector
import { getFirstAccount } from './selector';

// Services
import { closeModal } from 'services/modals';
import {
  getCurrentAccount,
  setCurrentAccount,
  setPrivateKey,
} from 'services/session';

// Types
import {
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_SUCCESS,

  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,

  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,

  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
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
      dispatch(setPrivateKey(privateKey));
    })
    .catch((error: Object) => {
      const message = get(error, 'response.data.message', get(error, 'message'));
      dispatch({ type: CREATE_ACCOUNT_FAILURE, error: message });
      throw new SubmissionError({ _error: message });
    });
};

export const fetchAccounts = (): func => (dispatch: func, getState: func, { api, schema }): Object => {
  dispatch({ type: FETCH_ACCOUNTS_REQUEST });

  return api('accounts.get')
    .then(({ data = {}}) => {
      const normalizedData = normalize(data, [schema.account]);

      dispatch({ type: UPDATE_ENTITIES, data: normalizedData });
      dispatch({ type: FETCH_ACCOUNTS_SUCCESS, accounts: normalizedData.result });
    })
    .catch((error: Object) => dispatch({ type: FETCH_ACCOUNTS_FAILURE, error: error.message }));
};

export const deleteAccount = (hash: string): func => (dispatch: func, getState: func, { api }): Object => {
  const state = getState();

  dispatch({ type: DELETE_ACCOUNT_REQUEST });

  return api('accounts.delete', { hash })
    .then(({ data = {}}) => {
      const { hash: currentAccountHash } = getCurrentAccount(state);

      if (hash === currentAccountHash) {
        const firstAccount = getFirstAccount(state);

        firstAccount &&
        dispatch(setCurrentAccount(get(firstAccount, 'hash')));
      }

      dispatch(closeModal(EDIT_MODAL_ID));
      dispatch({ type: DELETE_ACCOUNT_SUCCESS, hash });
    })
    .catch((error: Object) => {
      dispatch({ type: DELETE_ACCOUNT_FAILURE, error: error.message });
    });
};

export const updateAccount = (hash: string, payload: Object): func => (dispatch: func, getState: func, { api }): Object<Promise> => {
  dispatch({ type: UPDATE_ACCOUNT_REQUEST });

  return api('accounts.update', { hash, payload })
    .then(({ data = {}}) => {
      dispatch(closeModal(EDIT_MODAL_ID));
      dispatch({ type: UPDATE_ACCOUNT_SUCCESS, hash, payload });
    })
    .catch((error: Object) => dispatch({ type: UPDATE_ACCOUNT_FAILURE, error: error.message }));
};

// export const updateAccount = (hash: string, payload: Object): func => (dispatch: func): Object => {
//   dispatch({ type: UPDATE_ACCOUNT, hash, payload });
//   dispatch(closeModal(EDIT_MODAL_ID));
// };
