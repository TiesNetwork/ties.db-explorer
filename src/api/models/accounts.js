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
    url: url.resolve(CONFIG.URL, '/accounts/'),
  },
  get: {
    method: CONFIG.METHOD.GET,
    url: url.resolve(CONFIG.URL, '/accounts'),
  },
  update: {
    method: CONFIG.METHOD.PUT,
    url: url.resolve(CONFIG.URL, '/accounts/'),
  },
};
