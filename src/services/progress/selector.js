import { get, values } from 'lodash';

export const getFisrtProgress = (state: Object): Object =>
  get(state, `services.progress.${get(state, 'services.progress.result.0')}`, {});

export const getProgressByLink = (state: Object, link: string): Object =>
  values(get(state, 'services.progress', {})).filter(({ link: itemLink }) => itemLink === link)[0];

export const hasProgress = (state, id: Object): bool =>
  get(state, 'services.progress.result', []).indexOf(id) > -1
