import { get } from 'lodash';
import React from 'react';

// Components
import Actions from '../components/Actions';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';

export default (schema, isDistributed) => {
  const isFields = get(schema, 'id') === FIELDS_ENTITY_ID;

  return [
    ...get(schema, 'columns', []),
    (!isFields || (isFields && !isDistributed)) && {
      accessor: 'actions',
      Cell: ({ value }) => <Actions {...value} color={get(schema, 'actionsColor')} />,
      Header: 'Actions',
      sortable: false,
      width: 120,
    },
  ];
};
