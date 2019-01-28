import { get, values } from 'lodash';

// Constants
import { TRANSACTION_CONFIRM_TYPE } from './constants';

export const getConfirms = (state: Object): Array<Object> =>
  values(get(state, 'entities.transactions', {}))
    .filter(({ type }) => type === TRANSACTION_CONFIRM_TYPE)
    .map(({ hash }) => hash);

export const getLastTransactions = (state: Object, count: number = 3): Array<Object> =>
  values(get(state, 'entities.transactions', {}))
    .sort((transactionA, transactionB) => {
      const a = parseInt(get(transactionA, 'transaction.nonce'), 16);
      const b = parseInt(get(transactionB, 'transaction.nonce'), 16);

      return a > b ? 1 : a < b ? -1 : 0;
    })
    .slice(0, 3)
    .map(({ hash }) => hash);

export const getTransactionByHash = (state: Object, hash: string): Object =>
  get(state, `entities.transactions.${hash}`, {});

export const hasNewTransactions = (state: Object): boolean =>
  values(get(state, 'entities.transactions', {}))
    .filter(({ isChecked }) => !isChecked)
    .length > 0

export const needOpen = (state: Object): boolean =>
  values(get(state, 'entities.transactions', {}))
    .filter(({ isChecked, type }) => !isChecked && type === TRANSACTION_CONFIRM_TYPE)
    .length > 0
