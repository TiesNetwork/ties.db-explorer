import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// Components
import { Item, Select } from 'components/Form';

// Ducks
import { EDIT_FORM_ID } from '../ducks';

// Entities
import { getTableListByTablespaceHash } from 'entities/tables/selector';

const EditTable = ({
  name,
  tables,
}) => (
  <Select
    format={(hash: string) => hash &&
      tables
        .filter(({ hash: tableHash }) => tableHash === hash)
        .map(({ hash, name }) => ({
          label: name,
          value: hash,
        }))[0]}
    label="Table"
    name={name}
    parse={(table: Object) => get(table, 'value')}
    placeholder="Set Table"
  >
    {({ inputValue, onClick, value = [] }) =>
      tables
        .filter(({ name }) =>
          name.toLowerCase().indexOf(inputValue) > -1)
        .map(({ hash, name }) => (
          <Item
            key={hash}
            label={name}
            onClick={onClick}
            value={hash}
          />
        ))
    }
  </Select>
);

const selector = formValueSelector(EDIT_FORM_ID);
const mapStateToProps = (state: Object, { value }): Object => {
  const tablespaceHash = selector(state, 'tablespaceHash');

  return {
    tables: getTableListByTablespaceHash(state, tablespaceHash),
  };
};

export default connect(mapStateToProps)(EditTable);
