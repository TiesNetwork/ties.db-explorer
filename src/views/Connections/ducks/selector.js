import { get } from 'lodash';

export const getConnectionsView = (state: Object): Object =>
  get(state, 'views.connections');
