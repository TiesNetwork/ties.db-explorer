import url from 'url';

// Config
import CONFIG from 'api/config';

export default {
  create: {
    method: CONFIG.METHOD.POST,
    url: url.resolve(CONFIG.URL, '/tables'),
  },
  delete: {
    method: CONFIG.METHOD.DELETE,
    url: url.resolve(CONFIG.URL, '/tables/'),
  },
};
