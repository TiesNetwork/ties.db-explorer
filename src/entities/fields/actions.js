import { get } from 'lodash';

// Entities
import { EDIT_MODAL_ID } from 'containers/Edit';
import { getFieldByHash } from './selector';

// Services
import { closeModal } from 'services/modals';
import { getCurrentAccountHash } from 'services/session';

// Types
import {
  CREATE_FIELD,
  CREATE_FIELD_REQUEST,
  CREATE_FIELD_SUCCESS,
  CREATE_FIELD_FAILURE,

  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_FAILURE,

  UPDATE_FIELD,
} from './types';

export const createField = ({ tableHash, tablespaceHash, ...value }): func =>
  (dispatch: func, getState: func, { api, schema }): Object<Promise> => {
    const state = getState();

    dispatch(closeModal(EDIT_MODAL_ID));
    dispatch({ type: CREATE_FIELD_REQUEST });

    return api('fields.create', {
      ...value,
      account: getCurrentAccountHash(state),
      table: { hash: tableHash },
      tablespace: { hash: tablespaceHash },
    })
      .then(({ data = {}}) => {
        const { hash, ...payload } = data;

        if (hash) {
          dispatch({
            type: CREATE_FIELD_SUCCESS,
            hash, tableHash, payload: {
              ...payload, hash,
            },
          });

          dispatch(saveField(hash, {
            ...payload, hash,
            isSynchronized: false
          }));
        }
      })
      .catch((error: Object): void =>
        dispatch({
          type: CREATE_FIELD_FAILURE,
          error: get(error, 'message')
        }));
  };

export const deleteField = ({ hash, tableHash, tablespaceHash }): func =>
  (dispatch: func, getState: func, { api }): Object<Promise> => {
    const state = getState();
    const field = getFieldByHash(state, hash);

    dispatch(closeModal(EDIT_MODAL_ID));
    dispatch({ type: DELETE_FIELD_REQUEST });

    return api('fields.delete', {
      account: getCurrentAccountHash(state),
      hash: get(field, 'fieldHash'),
      name: get(field, 'name'),
      table: { hash: tableHash },
      tablespace: { hash: tablespaceHash },
    })
      .then(() =>
        dispatch({
          type: DELETE_FIELD_SUCCESS,
          hash, tableHash,
        }))
      .catch((error: Object): void =>
        dispatch({
          type: DELETE_FIELD_FAILURE,
          error: get(error, 'message'),
        }));
  };

export const saveField = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.fields.${hash}`)
    ? dispatch({ type: CREATE_FIELD, hash, payload })
    : dispatch({ type: UPDATE_FIELD, hash, payload });
