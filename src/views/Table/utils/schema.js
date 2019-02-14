import React from 'react';
import { FormattedMessage } from 'react-intl';

// Components
import Fields from '../components/Fields';
import Text from '../components/Text';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { getIndexTypeTitle, INDEXES_ENTITY_ID } from 'entities/indexes';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Styles
import { COLOR } from 'styles';

const SCHEMA = {
  [FIELDS_ENTITY_ID]: {
    columns: [
      {
        accessor: 'index',
        Header: () => (
          <FormattedMessage
            id="component_table_index"
            defaultMessage="#"
          />
        ),
        width: 64,
      },
      {
        accessor: 'name',
        Cell: ({ value }) => <Text title={value} />,
        Header: () => (
          <FormattedMessage
            id="component_table_name"
            defaultMessage="Name"
          />
        ),
        width: 260,
      },
      {
        accessor: 'type',
        Cell: ({ value }) => <Text title={value} />,
        Header: () => (
          <FormattedMessage
            id="component_table_type"
            defaultMessage="Type"
          />
        ),
        width: 120,
      },
      {
        accessor: 'defaultValue',
        Cell: ({ value }) => <Text title={value} />,
        Header: () => (
          <FormattedMessage
            id="component_table_default"
            defaultMessage="Default"
          />
        ),
        width: 240,
      },
    ],
    color: COLOR.PRIMARY,
    entity: 'fields',
    id: FIELDS_ENTITY_ID,
    name: 'field',
  },
  [INDEXES_ENTITY_ID]: {
    columns: [
      {
        accessor: 'index',
        Header: () => (
          <FormattedMessage
            id="component_table_index"
            defaultMessage="#"
          />
        ),
        width: 64,
      },
      {
        accessor: 'name',
        Cell: ({ value }) => <Text title={value} variant={Text.VARIANT.LIGHT} />,
        Header: () => (
          <FormattedMessage
            id="component_table_name"
            defaultMessage="Name"
          />
        ),
        width: 160,
      },
      {
        accessor: 'type',
        Cell: ({ value }) => <Text title={getIndexTypeTitle(value)} variant={Text.VARIANT.LIGHT} />,
        Header: () => (
          <FormattedMessage
            id="component_table_type"
            defaultMessage="Type"
          />
        ),
        width: 80,
      },
      {
        accessor: 'fields',
        Cell: ({ original }) => <Fields {...original} variant={Text.VARIANT.LIGHT} />,
        Header: () => (
          <FormattedMessage
            id="component_table_fields"
            defaultMessage="Fields"
          />
        ),
        width: 240,
      },
    ],
    actionsColor: COLOR.WHITE,
    color: COLOR.SECONDARY,
    entity: 'indexes',
    id: INDEXES_ENTITY_ID,
    name: 'index',
  },
  [TRIGGERS_ENTITY_ID]: {
    columns: [
      {
        accessor: 'index',
        Header: () => (
          <FormattedMessage
            id="component_table_index"
            defaultMessage="#"
          />
        ),
        width: 64,
      },
      {
        accessor: 'name',
        Cell: ({ value }) => <Text title={value} variant={Text.VARIANT.LIGHT} />,
        Header: () => (
          <FormattedMessage
            id="component_table_name"
            defaultMessage="Name"
          />
        ),
        width: 200,
      },
      {
        accessor: 'payload',
        Cell: ({ value }) => <Text title={value} variant={Text.VARIANT.LIGHT} />,
        Header: () => (
          <FormattedMessage
            id="component_table_payload"
            defaultMessage="Payload"
          />
        ),
        width: 120,
      },
    ],
    actionsColor: COLOR.WHITE,
    color: COLOR.SECONDARY,
    id: TRIGGERS_ENTITY_ID,
    entity: 'triggers',
    name: 'trigger',
  },
};

export default (state: Object, id: string) => SCHEMA[id];
