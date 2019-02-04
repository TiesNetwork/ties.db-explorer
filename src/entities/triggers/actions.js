import { get } from 'lodash';

// Entities
import { EDIT_MODAL_ID } from 'containers/Edit';
import { getTriggerByHash } from './selector';

// Services
import { closeModal } from 'services/modals';
import { getCurrentAccountHash } from 'services/session';

// Types
import {
  CREATE_TRIGGER,
  CREATE_TRIGGER_REQUEST,
  CREATE_TRIGGER_SUCCESS,
  CREATE_TRIGGER_FAILURE,

  DELETE_TRIGGER_REQUEST,
  DELETE_TRIGGER_SUCCESS,
  DELETE_TRIGGER_FAILURE,
  UPDATE_TRIGGER,
} from './types';

export const createTrigger = ({ tableHash, tablespaceHash, ...value }): func =>
  (dispatch: func, getState: func, { api, schema }): Object<Promise> => {
    const state = getState();

    dispatch(closeModal(EDIT_MODAL_ID));
    dispatch({ type: CREATE_TRIGGER_REQUEST });

    return api('triggers.create', {
      ...value,
      account: getCurrentAccountHash(state),
      table: { hash: tableHash },
      tablespace: { hash: tablespaceHash },
    })
      .then(({ data = {}}) => {
        const { hash, ...payload } = data;

        if (hash) {
          dispatch({
            type: CREATE_TRIGGER_SUCCESS,
            hash, tableHash, payload: {
              ...payload, hash,
            },
          });

          dispatch(saveTrigger(hash, {
            ...payload, hash,
            isSynchronized: false
          }));
        }
      })
      .catch((error: Object): void =>
        dispatch({
          type: CREATE_TRIGGER_FAILURE,
          error: get(error, 'message')
        }));
  };

export const deleteTrigger = ({ hash, tableHash, tablespaceHash }): func =>
  (dispatch: func, getState: func, { api }): Object<Promise> => {
    const state = getState();
    const trigger = getTriggerByHash(state, hash);

    dispatch(closeModal(EDIT_MODAL_ID));
    dispatch({ type: DELETE_TRIGGER_REQUEST });

    return api('triggers.delete', {
      account: getCurrentAccountHash(state),
      hash: get(trigger, 'triggerHash'),
      name: get(trigger, 'name'),
      table: { hash: tableHash },
      tablespace: { hash: tablespaceHash },
    })
      .then(() =>
        dispatch({
          type: DELETE_TRIGGER_SUCCESS,
          hash, tableHash,
        }))
      .catch((error: Object): void =>
        dispatch({
          type: DELETE_TRIGGER_FAILURE,
          error: get(error, 'message'),
        }));
  };

export const saveTrigger = (hash: string, payload: Object): func => (dispatch: func, getState: func): Object =>
  get(getState(), `entities.trigger.${hash}`)
    ? dispatch({ type: CREATE_TRIGGER, hash, payload })
    : dispatch({ type: UPDATE_TRIGGER, hash, payload });
