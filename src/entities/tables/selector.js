import { get } from 'lodash';

export const getTableByHash = (state: Object, hash: string): Object =>
  get(state, `entities.tables.${hash}`, {});
