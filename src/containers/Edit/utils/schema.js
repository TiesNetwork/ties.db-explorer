// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TABLES_ENTITY_ID } from 'entities/tables';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

const SCHEMA = {
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
  [TRIGGERS_ENTITY_ID]: {
    entity: 'triggers',
    name: 'trigger',
    title: 'Trigger',
  },
};

export default (state: Object, type: string) => SCHEMA[type];
