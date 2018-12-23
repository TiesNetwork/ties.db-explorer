import url from 'url';

// Config
import CONFIG from 'api/config';

export default {
  get: {
    method: CONFIG.GET,
    url: url.resolve(CONFIG.URL, '/connections'),
  },
};
