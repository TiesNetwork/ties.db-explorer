import { get } from 'lodash';

export const getFisrtProgress = (state: Object): Object =>
  get(state, `services.progress.${get(state, 'services.progress.result.0')}`, {});

export const hasProgress = (state, id: Object): bool =>
  get(state, 'services.progress.result', []).indexOf(id) > -1
