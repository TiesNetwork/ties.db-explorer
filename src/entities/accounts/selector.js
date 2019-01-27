import { get, isEmpty } from 'lodash';

export const getAccountByHash = (state: Object, hash: string): Object =>
  get(state, `entities.accounts.${hash}`, {});

export const hasAccounts = (state: Object): bool =>
  !isEmpty(get(state, 'entities.accounts'));
