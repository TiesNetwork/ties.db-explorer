import { get } from 'lodash';

// Entities
import { EDIT_MODAL_ID } from 'containers/Edit';
import { getTableByHash } from 'entities/tables/selector';
import { getTablespaceByHash } from 'entities/tablespaces/selector';

// Services
import { closeModal } from 'services/modals';
import { getCurrentAccountHash } from 'services/session';

// Types
import {
  CREATE_TABLE,
  CREATE_TABLE_REQUEST,
  CREATE_TABLE_SUCCESS,
  CREATE_TABLE_FAILURE,

  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_FAILURE,

  UPDATE_TABLE,
} from './types';

export const createTable = ({ name, tablespaceHash }): func =>
  (dispatch: func, getState: func, { api, schema }): Object<Promise> => {
    const state = getState();
    const tablespace = getTablespaceByHash(state, tablespaceHash);

    dispatch(closeModal(EDIT_MODAL_ID));
    dispatch({ type: CREATE_TABLE_REQUEST });

    return api('tables.create', {
      name,
      account: getCurrentAccountHash(state),
      tablespace: {
        hash: get(tablespace, 'hash'),
        name: get(tablespace, 'name'),
      },
    })
      .then(({ data = {}}) => {
        const { hash, ...payload } = data;

        if (hash) {
          dispatch({ type: CREATE_TABLE_SUCCESS, hash, tablespaceHash });
          dispatch(saveTable(hash, {
            ...payload, hash,
            isSynchronized: false
          }));
        }
      })
      .catch((error: Object): void =>
        dispatch({
          type: CREATE_TABLE_FAILURE,
          error: get(error, 'message')
        }));
  };

export const deleteTable = ({ hash, tablespaceHash }): func =>
  (dispatch: func, getState: func, { api }): Object<Promise> => {
    const state = getState();

    const table = getTableByHash(state, hash);
    const tablespace = getTablespaceByHash(state, tablespaceHash);

    dispatch(closeModal(EDIT_MODAL_ID));
    dispatch({ type: DELETE_TABLE_REQUEST });

    return api('tables.delete', {
      account: getCurrentAccountHash(state),
      hash,
      name: get(table, 'name'),
      tablespace: {
        hash: get(tablespace, 'hash'),
      },
    })
      .then(() =>
        dispatch({
          type: DELETE_TABLE_SUCCESS,
          hash, tablespaceHash,
        }))
      .catch((error: Object): void =>
        dispatch({
          type: DELETE_TABLE_FAILURE,
          error: get(error, 'message'),
        }));
  };

export const saveTable = (hash: string, payload: Object): func =>
  (dispatch: func, getState: func): Object =>
    get(getState(), `entities.tables.${hash}`)
      ? dispatch({ type: CREATE_TABLE, hash, payload })
      : dispatch({ type: UPDATE_TABLE, hash, payload });
