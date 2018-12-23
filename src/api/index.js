import axios from 'axios';
import { get } from 'lodash';

import models from './models';

const API = (method: string, params: Object) => {
  const model = get(models, method);

  return model
    ? axios[get(model, 'method', 'get')](get(model, 'url', '/'), params)
    : new Promise((resolve: func, reject: func) => reject(new Error('Undefined method!')));
};

export default API;
