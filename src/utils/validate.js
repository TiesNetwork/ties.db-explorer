import { isEmpty } from 'lodash';

export const isUrl = (message: string = 'Incorrect URL!') =>
  (value: string): Object => ({
    message,
    isValid: value && /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/.test(value),
  });

/**
 * @param  {Object.<RegExp>} regex
 * @param  {string} message
 */
export const matches = (regex: Object<RegExp>, message: string = 'Incorrect value!') => (value: string): Object => ({
  message,
  isValid: value && regex.test(value),
});

export const min = (min: number, message: string = 'Min value: %d!') => (value: any): Object => ({
  message: message.replace('%d', min),
  isValid: parseInt(value, 10) >= min,
});

/**
 * @param {string} message
 */
export const required = (message: string = 'Field is required!') => (value: any): Object => ({
  message,
  isValid: !isEmpty(value),
});

export default (fields: Object) => (values: Object, props :Object): Object => {
  const errors = {};

  Object.keys(fields).forEach((key: string): void => {
    ([]).concat(fields[key]).forEach((validator: func): void => {
      const res = validator(values[key], props);

      if (res && !errors[key] && !res.isValid) {
        errors[key] = res.message || true;
      }
    })
  });

  return errors;
}
