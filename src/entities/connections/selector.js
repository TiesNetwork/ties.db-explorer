import { get, values } from 'lodash';

export const getConnectionList = (state: Object): Array<Object> =>
  values(get(state, 'entities.connections', {}));
