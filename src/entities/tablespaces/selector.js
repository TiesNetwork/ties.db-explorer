import { get, values } from 'lodash';

export const getTablespaceByHash = (state: Object, hash: string): Object =>
  get(state, `entities.tablespaces.${hash}`, {});

export const getTablespaceList = (state: Object): Array<Object> =>
  values(get(state, 'entities.tablespaces', {}));
