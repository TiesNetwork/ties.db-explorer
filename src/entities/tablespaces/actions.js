import { get } from 'lodash';

// Entities
import { EDIT_MODAL_ID } from 'containers/Edit';

// Services
import { closeModal } from 'services/modals';
import { getCurrentAccountHash } from 'services/session';

// Types
import {
  CREATE_TABLESPACE,
  CREATE_TABLESPACE_REQUEST,
  CREATE_TABLESPACE_SUCCESS,
  CREATE_TABLESPACE_FAILURE,

  UPDATE_TABLESPACE,
} from './types';

export const createTablespace = (params: Object): func => (dispatch: func, getState: func, { api, schema }): Promise => {
  const state = getState();

  dispatch(closeModal(EDIT_MODAL_ID));
  dispatch({ type: CREATE_TABLESPACE_REQUEST });

  return api('tablespaces.create', { account: getCurrentAccountHash(state), ...params})
    .then(({ data }) => {
      dispatch({ type: CREATE_TABLESPACE_SUCCESS, data: 213 });
    })
    .catch((error: Object) =>
      dispatch({ type: CREATE_TABLESPACE_FAILURE, error: get(error, 'message') })
    );
};

export const saveTablespace = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.tablespaces.${hash}`)
    ? dispatch({ type: UPDATE_TABLESPACE, hash, payload })
    : dispatch({ type: CREATE_TABLESPACE, hash, payload });
