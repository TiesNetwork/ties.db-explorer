import url from 'url';

// Config
import CONFIG from 'api/config';

export default {
  create: {
    method: CONFIG.METHOD.POST,
    url: url.resolve(CONFIG.URL, '/accounts'),
  },
  delete: {
    method: CONFIG.METHOD.DELETE,
    url: ({ hash }): string =>
      url.resolve(CONFIG.URL, `/accounts/${hash}`),
  },
  get: {
    method: CONFIG.METHOD.GET,
    url: url.resolve(CONFIG.URL, '/accounts'),
  },
  update: {
    method: CONFIG.METHOD.PUT,
    url: ({ hash }): string =>
      url.resolve(CONFIG.URL, `/accounts/${hash}`),
  },
};
