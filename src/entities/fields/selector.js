import { get } from 'lodash';

export const getFieldByHash = (state: Object, hash: string): Object =>
  get(state, `entities.fields.${hash}`, {});
