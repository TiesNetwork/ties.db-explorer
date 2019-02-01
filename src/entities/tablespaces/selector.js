import { get } from 'lodash';

export const getTablespaceByHash = (state: Object, hash: string): Object =>
  get(state, `entities.tablespaces.${hash}`, {});
