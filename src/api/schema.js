import { schema } from 'normalizr';

export const account = new schema.Entity('accounts', {}, { idAttribute: 'hash' });
export const connection = new schema.Entity('connections');

export const field = new schema.Entity('fields', {}, { idAttribute: 'hash' });
export const index = new schema.Entity('indexes', {}, { idAttribute: 'hash' });
export const trigger = new schema.Entity('triggers', {}, { idAttribute: 'hash' });

export const table = new schema.Entity('tables', {
  fields: [field],
  indexes: [index],
  triggers: [trigger],
}, { idAttribute: 'hash' });

export const tablespace = new schema.Entity('tablespaces', {
  tables: [table],
}, { idAttribute: 'hash' });
