import url from 'url';

// Config
import CONFIG from 'api/config';

export default {
  confirm: {
    method: CONFIG.METHOD.POST,
    url: url.resolve(CONFIG.URL, '/transactions/confirm'),
  },
  getPrivateKey: {
    method: CONFIG.METHOD.POST,
    url: url.resolve(CONFIG.URL, '/transactions/private'),
  },
};
