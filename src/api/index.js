import axios from 'axios';
import { get } from 'lodash';
import url from 'url';

import models from './models';

const API = (path: string, params: Object) => {
  const model = get(models, path);

  const method = get(model, 'method', 'get');
  const uri = url.resolve(
    get(model, 'url', '/'),
    get(params, 'hash', ''),
  );

  return model
    ? axios[method](uri, { ...params, data: params })
    : new Promise((resolve: func, reject: func) => reject(new Error('Undefined method!')));
};

export default API;
