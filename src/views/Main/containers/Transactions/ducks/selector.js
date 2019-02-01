import { get } from 'lodash';

export const transactionsIsFetching = (state: Object): bool =>
  get(state, 'views.main.containers.transactions.isFetching');
