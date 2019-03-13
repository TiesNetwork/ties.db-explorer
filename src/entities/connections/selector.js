import { get, values } from 'lodash';

export const getTablespacesByConnectionId = (state: Object, id: string): Array<string> =>
  get(state, `entities.connections.${id}.tablespaces`, []);

export const getConnectionList = (state: Object): Array<Object> =>
  values(get(state, 'entities.connections', {}));
