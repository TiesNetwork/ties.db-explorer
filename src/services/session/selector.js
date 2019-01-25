import { get } from 'lodash';

export const getCurrentAccount = (state: Object): Object =>
  get(state, `entities.accounts.${get(state, 'services.session.currentAccount')}`, {});
