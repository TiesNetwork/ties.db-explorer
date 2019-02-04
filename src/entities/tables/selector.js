import { get } from 'lodash';

export const getTableByHash = (state: Object, hash: string): Object =>
  get(state, `entities.tables.${hash}`, {});

export const getTableListByTablespaceHash = (state: Object, tablespaceHash: string): Object => {
  const { tables = [] } = get(state, `entities.tablespaces.${tablespaceHash}`, {});

  return tables.map((tableHash: string): Object =>
    get(state, `entities.tables.${tableHash}`, {}));
};
