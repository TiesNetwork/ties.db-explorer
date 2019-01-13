import { get } from 'lodash';
import React from 'react';

// Components
import Actions from '../components/Actions';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';

export default (schema: Object, isDistributed: bool): Array<Object> => {
  const columns = get(schema, 'columns', []);
  const isFields = get(schema, 'id') === FIELDS_ENTITY_ID;

  return !isFields || (isFields && !isDistributed)
    ? [...columns, {
        accessor: 'actions',
        Cell: ({ value }) => <Actions {...value} color={get(schema, 'actionsColor')} />,
        Header: 'Actions',
        sortable: false,
        width: 120,
      }]
    : columns;
};
