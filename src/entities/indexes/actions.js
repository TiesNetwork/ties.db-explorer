import { get } from 'lodash';

// Entities
import { EDIT_MODAL_ID } from 'containers/Edit';
import { getIndexByHash } from './selector';

// Services
import { closeModal } from 'services/modals';
import { getCurrentAccountHash } from 'services/session';

// Types
import {
  CREATE_INDEX,
  CREATE_INDEX_REQUEST,
  CREATE_INDEX_SUCCESS,
  CREATE_INDEX_FAILURE,

  DELETE_INDEX_REQUEST,
  DELETE_INDEX_SUCCESS,
  DELETE_INDEX_FAILURE,

  UPDATE_INDEX,
} from './types';

export const createIndex = ({ tableHash, tablespaceHash, ...value }): func =>
  (dispatch: func, getState: func, { api, schema }): Object<Promise> => {
    const state = getState();

    dispatch(closeModal(EDIT_MODAL_ID));
    dispatch({ type: CREATE_INDEX_REQUEST });

    return api('indexes.create', {
      ...value,
      account: getCurrentAccountHash(state),
      table: { hash: tableHash },
      tablespace: { hash: tablespaceHash },
    })
      .then(({ data = {}}) => {
        const { hash, ...payload } = data;

        if (hash) {
          dispatch({
            type: CREATE_INDEX_SUCCESS,
            hash, tableHash, payload: {
              ...payload, hash,
            },
          });

          dispatch(saveIndex(hash, {
            ...payload, hash,
            isSynchronized: false
          }));
        }
      })
      .catch((error: Object): void =>
        dispatch({
          type: CREATE_INDEX_FAILURE,
          error: get(error, 'message')
        }));
  };

export const deleteIndex = ({ hash, tableHash, tablespaceHash }): func =>
  (dispatch: func, getState: func, { api }): Object<Promise> => {
    const state = getState();
    const index = getIndexByHash(state, hash);

    dispatch(closeModal(EDIT_MODAL_ID));
    dispatch({ type: DELETE_INDEX_REQUEST });

    return api('indexes.delete', {
      account: getCurrentAccountHash(state),
      hash: get(index, 'indexHash'),
      name: get(index, 'name'),
      table: { hash: tableHash },
      tablespace: { hash: tablespaceHash },
    })
      .then(() =>
        dispatch({
          type: DELETE_INDEX_SUCCESS,
          hash, tableHash,
        }))
      .catch((error: Object): void =>
        dispatch({
          type: DELETE_INDEX_FAILURE,
          error: get(error, 'message'),
        }));
  };

export const saveIndex = (hash: string, payload: Object): func =>
  (dispatch: func, getState: func): Object =>
    get(getState(), `entities.indexes.${hash}`)
      ? dispatch({ type: CREATE_INDEX, hash, payload })
      : dispatch({ type: UPDATE_INDEX, hash, payload });
