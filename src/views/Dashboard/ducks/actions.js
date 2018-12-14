import {
  SET_CURRENT_TABLESPACE_ID,
} from './types';

export const setCurrentTablespaceId = (id: number) => ({
  type: SET_CURRENT_TABLESPACE_ID, id,
});
