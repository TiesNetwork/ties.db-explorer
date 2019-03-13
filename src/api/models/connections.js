import url from 'url';

// Config
import CONFIG from 'api/config';

export default {
  create: {
    method: CONFIG.METHOD.POST,
    url: url.resolve(CONFIG.URL, '/connections'),
  },
  delete: {
    method: CONFIG.METHOD.DELETE,
    url: ({ id }): string =>
      url.resolve(CONFIG.URL, `/connections/${id}`),
  },
  get: {
    method: CONFIG.METHOD.GET,
    url: url.resolve(CONFIG.URL, '/connections'),
  },
  setTablespaces: {
    method: CONFIG.METHOD.PUT,
    url: ({ id }): string =>
      url.resolve(CONFIG.URL, `/connections/${id}`),
  },
};
