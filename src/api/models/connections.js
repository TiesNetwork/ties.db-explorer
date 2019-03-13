import url from 'url';

// Config
import CONFIG from 'api/config';

export default {
  create: {
    method: CONFIG.METHOD.POST,
    url: url.resolve(CONFIG.URL, '/connections'),
  },
  get: {
    method: CONFIG.METHOD.GET,
    url: url.resolve(CONFIG.URL, '/connections'),
  },
};
