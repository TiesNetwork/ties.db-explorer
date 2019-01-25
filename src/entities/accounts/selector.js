import { get } from 'lodash';

export const getAccountByHash = (state, hash: string): Object =>
  get(state, `entities.accounts.${hash}`, {});
