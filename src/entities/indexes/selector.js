import { get } from 'lodash';

export const getIndexByHash = (state: Object, hash: string): Object =>
  get(state, `entities.indexes.${hash}`, {});
