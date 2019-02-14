import { get } from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

// Components
import Actions from '../components/Actions';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';

export default (schema: Object, isDistributed: bool, isAuthorized: bool): Array<Object> => {
  const columns = get(schema, 'columns', []);
  const isFields = get(schema, 'id') === FIELDS_ENTITY_ID;

  return isAuthorized && (!isFields || (isFields && !isDistributed))
    ? [...columns, {
        accessor: 'actions',
        Cell: ({ original, value }) => !!get(original, 'name') && (
          <Actions {...value}
            color={get(schema, 'actionsColor')}
            entity={get(schema, 'id')}
          />
        ),
        Header: () => (
          <FormattedMessage
            id="component_table_actions"
            defaultMessage="Actions"
          />
        ),
        sortable: false,
        width: 200,
      }]
    : columns;
};
