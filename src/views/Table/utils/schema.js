import React from 'react';

// Components
import Fields from '../components/Fields';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Styles
import { COLOR } from 'styles';

const SCHEMA = {
  [FIELDS_ENTITY_ID]: {
    columns: [
      {
        accessor: 'index',
        Header: '#',
        width: 64,
      },
      {
        accessor: 'name',
        Header: 'Name',
        width: 260,
      },
      {
        accessor: 'type',
        Header: 'Type',
        width: 120,
      },
      {
        accessor: 'defaultValue',
        Header: 'Default',
        width: 240,
      },
    ],
    color: COLOR.PRIMARY,
    entity: 'fields',
    id: FIELDS_ENTITY_ID,
    name: 'field',
    title: 'Fields',
  },
  [INDEXES_ENTITY_ID]: {
    columns: [
      {
        accessor: 'index',
        Header: '#',
        width: 64,
      },
      {
        accessor: 'name',
        Header: 'Name',
        width: 160,
      },
      {
        accessor: 'type',
        Header: 'Type',
        width: 80,
      },
      {
        accessor: 'fields',
        Cell: ({ original }) => <Fields {...original} />,
        Header: 'Fields',
        width: 240,
      },
    ],
    actionsColor: COLOR.WHITE,
    color: COLOR.SECONDARY,
    entity: 'indexes',
    id: INDEXES_ENTITY_ID,
    name: 'index',
    title: 'Indexes',
  },
  [TRIGGERS_ENTITY_ID]: {
    columns: [
      {
        accessor: 'index',
        Header: '#',
        width: 64,
      },
      {
        accessor: 'name',
        Header: 'Name',
        width: 200,
      },
      {
        accessor: 'payload',
        Header: 'Payload',
        width: 120,
      },
    ],
    actionsColor: COLOR.WHITE,
    color: COLOR.SECONDARY,
    id: TRIGGERS_ENTITY_ID,
    entity: 'triggers',
    name: 'trigger',
    title: 'Triggers',
  },
};

export default (state: Object, id: string) => SCHEMA[id];
