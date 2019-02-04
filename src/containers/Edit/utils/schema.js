// Entities
import {
  // Actions
  deleteAccount,
  updateAccount,

  // Types
  ACCOUNTS_ENTITY_ID,
} from 'entities/accounts';

// Fields
import {
  createField,
  deleteField,
  FIELDS_ENTITY_ID,
} from 'entities/fields';

// Indexes
import {
  createIndex,
  INDEXES_ENTITY_ID,
} from 'entities/indexes';

// Tables
import {
  createTable,
  deleteTable,
  TABLES_ENTITY_ID
} from 'entities/tables';

// Tablespaces
import {
  // Actions
  createTablespace,
  deleteTablespace,

  // Types
  TABLESPACES_ENTITY_ID,
} from 'entities/tablespaces';

// Triggers
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
    create: createField,
    delete: deleteField,
    entity: 'fields',
    name: 'field',
    title: 'Field',
  },
  [INDEXES_ENTITY_ID]: {
    create: createIndex,
    entity: 'indexes',
    name: 'index',
    title: 'Index',
  },
  [TABLES_ENTITY_ID]: {
    create: createTable,
    delete: deleteTable,
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
