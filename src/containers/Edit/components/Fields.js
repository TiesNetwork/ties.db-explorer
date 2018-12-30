import { get } from 'lodash';
import React from 'react';
import { matchPath, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// Components
import { Item, Select } from 'components/Form';

// Ducks
import { EDIT_FORM_ID } from '../ducks';

const IndexFields = ({
  fields,
  selectedFields,
  ...props,
}) => (
  <Select
    format={(fields: Array<string>) => fields ? fields.map((hash: string, index: number) => selectedFields[index]) : []}
    label="Fields"
    isMultiple
    name="fields"
    parse={(items: Array<Object>) => items ? items.map(({ value }) => value) : []}
    placeholder="Set Fields"
  >
    {({ inputValue, onClick, value = [] }) =>
      fields
        .filter(({ name }) => name.toLowerCase().indexOf(inputValue) > -1)
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
const mapStateToProps = ({ entities, ...state }, { hash, location }) => {
  const match = matchPath(get(location, 'pathname'), { path: '/:tablespaceHash/table/:tableHash'})
  const table = get(entities, `tables.${get(match, 'params.tableHash')}`, {});
  const value = selector(state, 'fields');

  return {
    fields: get(table, 'fields', [])
      .filter((hash: string) => (value || [])
        .filter(({ value }) => value === hash).length === 0)
      .map((hash: string) => get(entities, `fields.${hash}`)),
    selectedFields: (value || [])
      .map((hash: string) => ({
        label: get(entities, `fields.${hash}.name`),
        value: hash,
      })),
  };
};

export default withRouter(connect(mapStateToProps)(IndexFields));
