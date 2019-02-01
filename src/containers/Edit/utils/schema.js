// Entities
import {
  // Actions
  deleteAccount,
  updateAccount,

  // Types
  ACCOUNTS_ENTITY_ID,
} from 'entities/accounts';
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TABLES_ENTITY_ID } from 'entities/tables';
import {
  // Actions
  createTablespace,
  deleteTablespace,

  // Types
  TABLESPACES_ENTITY_ID,
} from 'entities/tablespaces';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

const SCHEMA = {
  [ACCOUNTS_ENTITY_ID]: {
    delete: deleteAccount,
    entity: 'accounts',
    name: 'account',
    title: 'Account',
    update: updateAccount,
  },
  [FIELDS_ENTITY_ID]: {
    entity: 'fields',
    name: 'field',
    title: 'Field',
  },
  [INDEXES_ENTITY_ID]: {
    entity: 'indexes',
    name: 'index',
    title: 'Index',
  },
  [TABLES_ENTITY_ID]: {
    entity: 'tables',
    name: 'table',
    title: 'Table',
  },
  [TABLESPACES_ENTITY_ID]: {
    create: createTablespace,
    delete: deleteTablespace,
    entity: 'tablespaces',
    name: 'tablespace',
    title: 'Tablespace',
  },
  [TRIGGERS_ENTITY_ID]: {
    entity: 'triggers',
    name: 'trigger',
    title: 'Trigger',
  },
};

export default (state: Object, type: string) => SCHEMA[type];
