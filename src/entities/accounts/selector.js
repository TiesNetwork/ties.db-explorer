import { get, isEmpty, values } from 'lodash';

export const getAccountByHash = (state: Object, hash: string): Object =>
  get(state, `entities.accounts.${hash}`, {});

export const getFirstAccount = (state: Object): Object =>
  values(get(state, 'entities.accounts', {}))[0];

export const hasAccounts = (state: Object): bool =>
  !isEmpty(get(state, 'entities.accounts'));
