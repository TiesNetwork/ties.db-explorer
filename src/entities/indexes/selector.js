import { get } from 'lodash';

// Constants
import {
  PRIMARY_TYPE_ID,
  INTERNAL_TYPE_ID,
  EXTERNAL_TYPE_ID,

  PRIMARY_TYPE_TITLE,
  INTERNAL_TYPE_TITLE,
  EXTERNAL_TYPE_TITLE,
} from './constants';

export const getIndexByHash = (state: Object, hash: string): Object =>
  get(state, `entities.indexes.${hash}`, {});

export const getIndexTypeTitle = (typeId: number): string => {
  switch (typeId) {
    case PRIMARY_TYPE_ID:
      return PRIMARY_TYPE_TITLE;
    case INTERNAL_TYPE_ID:
      return INTERNAL_TYPE_TITLE;
    case EXTERNAL_TYPE_ID:
      return EXTERNAL_TYPE_TITLE;
    default:
      return PRIMARY_TYPE_TITLE;
  }
};
