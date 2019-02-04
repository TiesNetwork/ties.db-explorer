import { get } from 'lodash';

export const getTriggerByHash = (state: Object, hash: string): Object =>
  get(state, `entities.triggers.${hash}`, {});
