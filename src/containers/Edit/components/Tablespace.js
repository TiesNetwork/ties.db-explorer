import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// Components
import { Item, Select } from 'components/Form';

// Entities
import { getTablespaceList } from 'entities/tablespaces/selector';

const EditTablespace = ({
  currentTablespace,
  name,
  tablespaces,
  value,
}) => (
  <Select
    format={(hash: string) => hash &&
      tablespaces
        .filter(({ hash: tablespaceHash }) => tablespaceHash === hash)
        .map(({ hash, name }) => ({
          label: name,
          value: hash,
        }))[0]}
    label="Tablespace"
    name={name}
    parse={(tablespace: Object) => get(tablespace, 'value')}
    placeholder="Set Tablespace"
  >
    {({ inputValue, onClick, value = [] }) =>
      tablespaces
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

const mapStateToProps = (state: Object, { value }): Object => ({
  tablespaces: getTablespaceList(state),
});

export default connect(mapStateToProps)(EditTablespace);
