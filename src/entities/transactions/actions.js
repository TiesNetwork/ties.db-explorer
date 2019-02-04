import { get } from 'lodash';

// Constants
import { TRANSACTION_PROGRESS_TYPE } from './constants';

// Containers
import { CONFIRM_MODAL_ID } from 'containers/Confirm';

// Entities
// import { EDIT_MODAL_ID } from 'containers/Edit';

// Services
import { closeModal, openModal } from 'services/modals';
import { getCurrentAccountHash } from 'services/session';

// Types
import {
  CONFIRM_TRANSACTIONS_REQUEST,
  CONFIRM_TRANSACTIONS_SUCCESS,
  CONFIRM_TRANSACTIONS_FAILURE,

  GET_PRIVATE_KEY_REQUEST,
  GET_PRIVATE_KEY_SUCCESS,
  GET_PRIVATE_KEY_FAILURE,

  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,

  SET_CHECKED,
} from './types';

import { setPrivateKey } from 'services/session/actions';

export const confirmTransaction = (hash: string): func => (dispatch: func): void =>
  dispatch(confirmTransactions([hash]));

export const confirmTransactions = (transactions: Array<string>) => (dispatch: func, getState: func, { api }): Promise => {
  const state = getState();
  const privateKey = sessionStorage.getItem('privateKey');

  const confirm = (privateKey: string): Object<Promise> =>
    api('transactions.confirm', {
      account: getCurrentAccountHash(state),
      privateKey,
      transactions
    })
      .then(({ data }) => {
        dispatch({ type: CONFIRM_TRANSACTIONS_SUCCESS });

        transactions.forEach((transactionHash: string): void => {
          dispatch(saveTransaction(transactionHash, { type: TRANSACTION_PROGRESS_TYPE }));
        });
      })
      .catch((error: Object) =>
        dispatch({ type: CONFIRM_TRANSACTIONS_FAILURE, error: get(error, 'message') })
      );

  dispatch({ type: CONFIRM_TRANSACTIONS_REQUEST });

  if (privateKey) {
    confirm(privateKey);
  } else {
    dispatch(openModal(CONFIRM_MODAL_ID, {
      handleSubmit: ({ password }) => dispatch(getPrivateKey(password, confirm)),
    }));
  }
};

export const getPrivateKey = (password: string, callback: func): func => (dispatch: func, getState, { api }): void => {
  const state = getState();

  dispatch({ type: GET_PRIVATE_KEY_REQUEST });

  return api('transactions.getPrivateKey', { account: getCurrentAccountHash(state), password })
    .then(({ data }) => {
      const privateKey = get(data, 'privateKey');

      if (privateKey) {
        dispatch(closeModal(CONFIRM_MODAL_ID));
        dispatch(setPrivateKey(privateKey));
        dispatch({ type: GET_PRIVATE_KEY_SUCCESS });
        callback && callback(privateKey);
      }
    })
    .catch((error: Object) => dispatch({ type: GET_PRIVATE_KEY_FAILURE, error: get(error, 'message') }))
};

export const setChecked = (hash: string): Object =>
  ({ type: SET_CHECKED, hash });

export const saveTransaction = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.transactions.${hash}`)
    ? dispatch({ type: UPDATE_TRANSACTION, hash, payload })
    : dispatch({ type: CREATE_TRANSACTION, hash, payload });
